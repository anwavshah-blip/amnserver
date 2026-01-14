// Working PDF Viewer - Clean & Simple

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let canvas = null;
let ctx = null;
let currentScale = 1.0;

// Initialize PDF.js
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

async function openPDF(pdfId, pdfPath = null) {
    console.log('Opening PDF:', pdfId, pdfPath);
    
    try {
        const modal = document.getElementById('pdfModal');
        const viewer = document.getElementById('pdfViewer');
        const title = document.getElementById('pdfTitle');
        
        if (!modal || !viewer || !title) {
            console.error('Modal elements not found');
            return;
        }
        
        // Get PDF data
        const pdfData = getPDFData(pdfId, pdfPath);
        if (!pdfData) {
            console.error('PDF data not found');
            return;
        }
        
        console.log('PDF Data:', pdfData);
        
        // Show modal immediately
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set title
        title.textContent = pdfData.title || 'PDF Document';
        
        // Create viewer
        viewer.innerHTML = createViewerHTML();
        
        // Initialize canvas
        canvas = document.getElementById('pdf-canvas');
        if (!canvas) {
            console.error('Canvas not found');
            return;
        }
        ctx = canvas.getContext('2d');
        
        // Load PDF
        await loadPDF(pdfData.fileName);
        
    } catch (error) {
        console.error('Error opening PDF:', error);
        showError('Failed to open PDF: ' + error.message);
    }
}

function getPDFData(pdfId, pdfPath) {
    // If pdfPath is provided, use it directly
    if (pdfPath) {
        return {
            id: pdfId,
            title: pdfId,
            fileName: pdfPath,
            pages: 1,
            uploadDate: new Date().toISOString().split('T')[0],
            type: 'PDF Document'
        };
    }
    
    // Otherwise use database
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

function createViewerHTML() {
    return `
        <div class="pdf-viewer-container">
            <div class="pdf-canvas-wrapper">
                <canvas id="pdf-canvas"></canvas>
            </div>
            <div class="pdf-loading" id="pdf-loading">
                <div class="pdf-spinner"></div>
                <p>Loading PDF... <span id="loadProgress">0</span>%</p>
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

async function loadPDF(pdfUrl) {
    try {
        console.log('Loading PDF from:', pdfUrl);
        
        // Show loading
        document.getElementById('pdf-loading').style.display = 'flex';
        
        // Configure PDF.js for optimal loading
        const loadingTask = pdfjsLib.getDocument({
            url: pdfUrl,
            disableAutoFetch: false,
            disableStream: false,
            rangeChunkSize: 65536,
            useSystemFonts: true
        });
        
        // Progress tracking
        loadingTask.onProgress = function(progress) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            document.getElementById('loadProgress').textContent = percent;
        };
        
        // Load PDF
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        console.log('PDF loaded successfully. Total pages:', totalPages);
        
        // Update UI
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Render first page
        await renderPage(currentPage);
        
        // Hide loading
        document.getElementById('pdf-loading').style.display = 'none';
        
    } catch (error) {
        console.error('Error loading PDF:', error);
        showError('Failed to load PDF file: ' + error.message);
    }
}

async function renderPage(pageNum, scale = null) {
    try {
        console.log('Rendering page:', pageNum);
        
        const page = await pdfDoc.getPage(pageNum);
        const container = document.querySelector('.pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        // Calculate scale
        const calculatedScale = scale || calculateOptimalScale(viewport, container);
        const scaledViewport = page.getViewport({ scale: calculatedScale });
        
        currentScale = calculatedScale;
        
        // Update zoom display
        document.getElementById('zoomLevel').textContent = Math.round(calculatedScale * 100) + '%';
        
        // Set canvas dimensions
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        // Setup wrapper for scrolling
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = scaledViewport.width + 'px';
            canvasWrapper.style.height = scaledViewport.height + 'px';
            
            // Enable scrolling when content is larger
            container.style.overflow = (scaledViewport.width > container.clientWidth || scaledViewport.height > container.clientHeight) ? 'auto' : 'hidden';
        }
        
        // Render page
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport
        };
        
        await page.render(renderContext).promise;
        
        currentPage = pageNum;
        document.getElementById('currentPage').textContent = pageNum;
        
        console.log('Page rendered successfully:', pageNum);
        
    } catch (error) {
        console.error('Error rendering page:', error);
        showError('Failed to render page: ' + error.message);
    }
}

function calculateOptimalScale(pageViewport, container) {
    const containerWidth = container.clientWidth - 40;
    const containerHeight = container.clientHeight - 40;
    
    const widthScale = containerWidth / pageViewport.width;
    const heightScale = containerHeight / pageViewport.height;
    
    return Math.max(0.5, Math.min(3.0, Math.min(widthScale, heightScale)));
}

// Navigation functions
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        renderPage(newPage);
    }
}

// Zoom functions
function zoomIn() {
    if (!pdfDoc) return;
    const newScale = Math.min(3.0, currentScale + 0.2);
    renderPage(currentPage, newScale);
}

function zoomOut() {
    if (!pdfDoc) return;
    const newScale = Math.max(0.5, currentScale - 0.2);
    renderPage(currentPage, newScale);
}

function fitToWidth() {
    if (!pdfDoc) return;
    const container = document.querySelector('.pdf-viewer-container');
    const containerWidth = container.clientWidth - 40;
    
    // Calculate scale for width
    pdfDoc.getPage(currentPage).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const widthScale = containerWidth / viewport.width;
        renderPage(currentPage, widthScale);
    }).catch(error => {
        console.error('Error fitting to width:', error);
    });
}

function resetZoom() {
    if (!pdfDoc) return;
    renderPage(currentPage);
}

// Close modal
function closePDF() {
    const modal = document.getElementById('pdfModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Cleanup
    if (pdfDoc) {
        pdfDoc.destroy();
        pdfDoc = null;
    }
    currentPage = 1;
    totalPages = 1;
    currentScale = 1.0;
}

// Error handling
function showError(message) {
    console.error('PDF Viewer Error:', message);
    
    const viewer = document.getElementById('pdfViewer');
    if (viewer) {
        viewer.innerHTML = `
            <div class="pdf-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error</h3>
                <p>${message}</p>
                <button onclick="closePDF()" class="btn btn-primary">Close</button>
            </div>
        `;
    }
    
    // Hide loading
    const loading = document.getElementById('pdf-loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Add required CSS
const pdfViewerStyles = document.createElement('style');
pdfViewerStyles.textContent = `
    .pdf-viewer-container {
        position: relative;
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: 10px;
        overflow: auto;
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
        display: none;
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
        z-index: 999;
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
    
    .pdf-error {
        text-align: center;
        padding: 2rem;
        color: #e53e3e;
    }
    
    .pdf-error i {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .pdf-error h3 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .pdf-error p {
        color: #666;
        margin-bottom: 1.5rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(pdfViewerStyles);

// Make functions global
window.openPDF = openPDF;
window.closePDF = closePDF;
window.changePage = changePage;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.fitToWidth = fitToWidth;
window.resetZoom = resetZoom;

console.log('PDF Viewer loaded successfully!');
