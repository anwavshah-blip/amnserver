// Optimized PDF Viewer for Instant Multi-Page Opening

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let canvas = null;
let ctx = null;
let currentScale = 1.0;
let pageCache = new Map(); // Cache for rendered pages

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

async function openPDF(pdfId, pdfPath = null) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const title = document.getElementById('pdfTitle');
    
    try {
        // Show modal IMMEDIATELY for instant feedback
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        let pdfData;
        if (pdfPath) {
            pdfData = {
                id: pdfId,
                title: pdfId,
                fileName: pdfPath,
                pages: 1,
                uploadDate: new Date().toISOString().split('T')[0],
                type: 'PDF Document'
            };
        } else {
            pdfData = getPDFData(pdfId);
            if (!pdfData) throw new Error('PDF not found');
        }
        
        title.textContent = pdfData.title || 'PDF Document';
        
        // Create viewer interface immediately
        viewer.innerHTML = createPDFCanvas();
        
        // Initialize canvas
        canvas = document.getElementById('pdf-canvas');
        ctx = canvas.getContext('2d');
        
        // Show loading indicator immediately
        document.getElementById('pdf-loading').style.display = 'flex';
        
        // Start PDF loading in background
        loadPDFDocument(pdfData.fileName);
        
        // Add controls and navigation
        addPDFKeyboardNavigation();
        preventPDFActions(modal);
        addZoomControls();
        
    } catch (error) {
        console.error('PDF loading error:', error);
        showPDFError('Failed to load PDF file. Please ensure the file exists and try again.');
    }
}

async function loadPDFDocument(pdfUrl) {
    try {
        // Configure for faster loading
        const loadingTask = pdfjsLib.getDocument({
            url: pdfUrl,
            // Optimize for faster first page display
            disableAutoFetch: false,
            disableStream: false,
            // Use range requests for faster loading
            rangeChunkSize: 65536,
            // Enable worker for better performance
            useSystemFonts: true
        });
        
        // Show progress
        loadingTask.onProgress = function(progress) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateLoadingProgress(percent);
        };
        
        // Load PDF in background
        pdfDoc = await loadingTask.promise;
        
        // Get total pages
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        // Update UI immediately
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Render first page as fast as possible
        await renderPageInstant(currentPage);
        
        // Pre-cache next few pages in background
        preCachePages();
        
    } catch (error) {
        console.error('PDF document loading error:', error);
        showPDFError('Failed to load PDF document. Please ensure the file exists and try again.');
    }
}

function createPDFCanvas() {
    return `
        <div class="pdf-viewer-container">
            <div class="pdf-canvas-wrapper">
                <canvas id="pdf-canvas"></canvas>
            </div>
            <div class="pdf-loading" id="pdf-loading">
                <div class="pdf-spinner"></div>
                <p>Loading PDF... 0%</p>
            </div>
            <div class="pdf-zoom-controls">
                <button class="zoom-btn" onclick="zoomOut()" title="Zoom Out">
                    <i class="fas fa-search-minus"></i>
                </button>
                <span class="zoom-level" id="zoomLevel">100%</span>
                <button class="zoom-btn" onclick="zoomIn()" title="Zoom In">
                    <i class="fas fa-search-plus"></i>
                </button>
                <button class="zoom-btn" onclick="fitToWidth()" title="Fit to Width">
                    <i class="fas fa-arrows-alt-h"></i>
                </button>
                <button class="zoom-btn" onclick="resetZoom()" title="Fit to Page">
                    <i class="fas fa-compress"></i>
                </button>
            </div>
            <div class="pdf-page-navigation">
                <button class="pdf-btn" onclick="changePage(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span class="page-info">Page <span id="currentPage">1</span> of <span id="totalPages">1</span></span>
                <button class="pdf-btn" onclick="changePage(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
}

async function renderPageInstant(num, targetScale = null) {
    pageRendering = true;
    
    try {
        // Get page from document
        const page = await pdfDoc.getPage(num);
        const container = document.querySelector('.pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        // Calculate optimal scale
        let scale;
        if (targetScale) {
            scale = targetScale;
        } else {
            scale = calculateOptimalScale(viewport, container);
        }
        
        const scaledViewport = page.getViewport({ scale: scale });
        currentScale = scale;
        
        // Update zoom display
        document.getElementById('zoomLevel').textContent = Math.round(scale * 100) + '%';
        
        // Set canvas dimensions
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        // Setup canvas wrapper for scrolling
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = scaledViewport.width + 'px';
            canvasWrapper.style.height = scaledViewport.height + 'px';
            
            // Enable scrolling when content is larger
            if (scaledViewport.width > container.clientWidth || scaledViewport.height > container.clientHeight) {
                container.style.overflow = 'auto';
            } else {
                container.style.overflow = 'hidden';
            }
        }
        
        // Render page
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport
        };
        
        await page.render(renderContext).promise;
        
        // Update page info
        document.getElementById('currentPage').textContent = num;
        
        // Hide loading after first page is rendered
        if (num === 1) {
            document.getElementById('pdf-loading').style.display = 'none';
        }
        
        currentPage = num;
        
        // Cache this page
        pageCache.set(num, { canvas: canvas, scale: scale });
        
    } catch (error) {
        console.error('Page rendering error:', error);
        if (num === 1) {
            showPDFError('Failed to render PDF page');
        }
    } finally {
        pageRendering = false;
        
        // Render pending page if any
        if (pageNumPending !== null) {
            const pending = pageNumPending;
            pageNumPending = null;
            renderPageInstant(pending);
        }
    }
}

function calculateOptimalScale(pageViewport, container) {
    const containerWidth = container.clientWidth - 40;
    const containerHeight = container.clientHeight - 40;
    
    const widthScale = containerWidth / pageViewport.width;
    const heightScale = containerHeight / pageViewport.height;
    
    return Math.max(0.5, Math.min(3.0, Math.min(widthScale, heightScale)));
}

// Pre-cache next few pages for instant navigation
async function preCachePages() {
    const cachePromises = [];
    const pagesToCache = Math.min(totalPages, 5); // Cache next 5 pages
    
    for (let i = 2; i <= pagesToCache; i++) {
        cachePromises.push(cachePage(i));
    }
    
    // Cache in background without blocking
    Promise.all(cachePromises).catch(error => {
        console.log('Background caching completed');
    });
}

async function cachePage(pageNum) {
    if (pageCache.has(pageNum)) return;
    
    try {
        const page = await pdfDoc.getPage(pageNum);
        const container = document.querySelector('.pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        const scale = calculateOptimalScale(viewport, container);
        const scaledViewport = page.getViewport({ scale: scale });
        
        // Create offscreen canvas for caching
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.height = scaledViewport.height;
        offscreenCanvas.width = scaledViewport.width;
        const offscreenCtx = offscreenCanvas.getContext('2d');
        
        const renderContext = {
            canvasContext: offscreenCtx,
            viewport: scaledViewport
        };
        
        await page.render(renderContext).promise;
        
        // Cache the rendered page
        pageCache.set(pageNum, { 
            canvas: offscreenCanvas, 
            scale: scale,
            width: scaledViewport.width,
            height: scaledViewport.height
        });
        
    } catch (error) {
        console.log(`Failed to cache page ${pageNum}:`, error);
    }
}

// Optimized page changing with cache
async function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        
        // Check if page is cached
        if (pageCache.has(newPage)) {
            // INSTANT display from cache
            displayCachedPage(newPage);
        } else {
            // Render if not cached
            renderPageInstant(newPage);
        }
        
        // Pre-cache adjacent pages
        preCacheAdjacentPages(newPage);
    }
}

function displayCachedPage(pageNum) {
    const cachedPage = pageCache.get(pageNum);
    if (!cachedPage) return;
    
    // Copy cached canvas to main canvas
    canvas.width = cachedPage.width;
    canvas.height = cachedPage.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(cachedPage.canvas, 0, 0);
    
    // Update UI
    currentPage = pageNum;
    document.getElementById('currentPage').textContent = pageNum;
    document.getElementById('zoomLevel').textContent = Math.round(cachedPage.scale * 100) + '%';
    currentScale = cachedPage.scale;
}

function preCacheAdjacentPages(currentPageNum) {
    // Cache previous and next pages
    const pagesToCache = [
        currentPageNum - 1,
        currentPageNum + 1,
        currentPageNum + 2
    ].filter(page => page >= 1 && page <= totalPages && !pageCache.has(page));
    
    pagesToCache.forEach(pageNum => {
        cachePage(pageNum);
    });
}

// Zoom functions (optimized)
function zoomIn() {
    if (!pdfDoc) return;
    const newScale = Math.min(3.0, currentScale + 0.2);
    renderPageInstant(currentPage, newScale);
}

function zoomOut() {
    if (!pdfDoc) return;
    const newScale = Math.max(0.5, currentScale - 0.2);
    renderPageInstant(currentPage, newScale);
}

function fitToWidth() {
    if (!pdfDoc) return;
    const container = document.querySelector('.pdf-viewer-container');
    const containerWidth = container.clientWidth - 40;
    
    pdfDoc.getPage(currentPage).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const widthScale = containerWidth / viewport.width;
        renderPageInstant(currentPage, widthScale);
    });
}

function resetZoom() {
    if (!pdfDoc) return;
    renderPageInstant(currentPage);
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (pdfDoc) {
        pdfDoc.destroy();
        pdfDoc = null;
    }
    currentPDF = null;
    currentPage = 1;
    totalPages = 1;
    canvas = null;
    ctx = null;
    currentScale = 1.0;
    pageCache.clear(); // Clear cache
}

function getPDFData(pdfId) {
    const pdfDatabase = {
        article1: {
            id: 'article1',
            title: 'Habitat Preferences of Spiny Babbler',
            fileName: 'assets/documents/habitat-preferences-spiny-babbler.pdf',
            pages: 3,
            uploadDate: '2024-01-15',
            type: 'Research Article'
        },
        article2: {
            id: 'article2',
            title: 'Breeding Behavior Observations',
            fileName: 'assets/documents/breeding-behavior-observations.pdf',
            pages: 2,
            uploadDate: '2024-02-20',
            type: 'Behavioral Study'
        },
        article3: {
            id: 'article3',
            title: 'Conservation Status Assessment',
            fileName: 'assets/documents/conservation-status-assessment.pdf',
            pages: 4,
            uploadDate: '2024-03-10',
            type: 'Conservation Report'
        }
    };
    
    return pdfDatabase[pdfId] || null;
}

// Add CSS for instant loading
const pdfViewerStyles = document.createElement('style');
pdfViewerStyles.textContent = `
    .pdf-viewer-container {
        position: relative;
        width: 100%;
        height: 100%;
        background: #f8f9fa;
        border-radius: 10px;
        overflow: auto !important;
        padding: 20px;
        box-sizing: border-box;
    }
    
    .pdf-canvas-wrapper {
        display: block;
        width: auto;
        height: auto;
        min-width: 100%;
        min-height: 100%;
        margin: 0 auto;
    }
    
    #pdf-canvas {
        display: block;
        width: auto;
        height: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin: 0 auto;
    }
    
    .pdf-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(248, 249, 250, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    
    .pdf-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e2e8f0;
        border-top: 3px solid #4299e1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    .pdf-page-navigation {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px 20px;
        border-radius: 25px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 100;
    }
    
    .pdf-zoom-controls {
        position: fixed;
        bottom: 100px;
        right: 40px;
        display: flex;
        gap: 10px;
        background: rgba(255, 255, 255, 0.95);
        padding: 12px;
        border-radius: 25px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
    }
    
    .zoom-btn {
        background: #4299e1;
        color: white;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
    }
    
    .zoom-level {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 50px;
        font-size: 12px;
        font-weight: 500;
        color: #333;
    }
    
    /* SCROLLBAR STYLING */
    .pdf-viewer-container::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }
    
    .pdf-viewer-container::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 6px;
    }
    
    .pdf-viewer-container::-webkit-scrollbar-thumb {
        background: rgba(66, 153, 225, 0.8);
        border-radius: 6px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(pdfViewerStyles);
