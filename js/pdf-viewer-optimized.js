// Enhanced PDF Viewer JavaScript for Clear Display

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let canvas = null;
let ctx = null;
let currentScale = 1.0;

// Initialize PDF.js with enhanced settings
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Enhanced PDF rendering with better quality
async function openPDF(pdfId, pdfPath = null) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const title = document.getElementById('pdfTitle');
    
    try {
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
        
        // Create enhanced canvas for PDF rendering
        viewer.innerHTML = createEnhancedPDFCanvas();
        
        // Initialize canvas with high-quality settings
        canvas = document.getElementById('pdf-canvas');
        ctx = canvas.getContext('2d', { 
            alpha: false,
            desynchronized: true,
            willReadFrequently: false
        });
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Load PDF with enhanced settings
        const loadingTask = pdfjsLib.getDocument({
            url: pdfData.fileName,
            disableAutoFetch: false,
            disableStream: false,
            disableFontFace: false,
            useSystemFonts: false,
            standardFontDataUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/standard_fonts/'
        });
        
        // Add progress tracking with better UX
        loadingTask.onProgress = function(progress) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateLoadingProgress(percent);
        };
        
        pdfDoc = await loadingTask.promise;
        
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Render first page with enhanced quality
        await renderEnhancedPage(currentPage);
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        addPDFKeyboardNavigation();
        preventPDFActions(modal);
        addZoomControls();
        
    } catch (error) {
        console.error('PDF loading error:', error);
        showPDFError('Failed to load PDF file. Please ensure the file exists and try again.');
    }
}

function createEnhancedPDFCanvas() {
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
                <button class="zoom-btn" onclick="zoomPDF(-0.1)" title="Zoom Out">
                    <i class="fas fa-search-minus"></i>
                </button>
                <span class="zoom-level" id="zoomLevel">100%</span>
                <button class="zoom-btn" onclick="zoomPDF(0.1)" title="Zoom In">
                    <i class="fas fa-search-plus"></i>
                </button>
            </div>
        </div>
    `;
}

async function renderEnhancedPage(num, targetScale = null) {
    pageRendering = true;
    
    // Show loading with enhanced UX
    const loadingElement = document.getElementById('pdf-loading');
    if (loadingElement) {
        loadingElement.style.display = 'flex';
        loadingElement.style.opacity = '1';
    }
    
    try {
        const page = await pdfDoc.getPage(num);
        
        // Get container dimensions with better calculations
        const container = document.querySelector('.pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        // Calculate optimal scale with better quality
        let scale;
        if (targetScale) {
            scale = targetScale;
        } else {
            scale = calculateEnhancedScale(viewport, container);
        }
        
        // Use higher resolution for better quality (device pixel ratio)
        const devicePixelRatio = window.devicePixelRatio || 1;
        const enhancedScale = scale * devicePixelRatio;
        
        const scaledViewport = page.getViewport({ scale: enhancedScale });
        
        currentScale = scale;
        
        // Update zoom display
        const zoomLevel = document.getElementById('zoomLevel');
        if (zoomLevel) {
            zoomLevel.textContent = Math.round(scale * 100) + '%';
        }
        
        // Set canvas dimensions with device pixel ratio
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        // Scale down the canvas for display to maintain sharpness
        canvas.style.height = (scaledViewport.height / devicePixelRatio) + 'px';
        canvas.style.width = (scaledViewport.width / devicePixelRatio) + 'px';
        
        // Center the canvas
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = (scaledViewport.width / devicePixelRatio) + 'px';
            canvasWrapper.style.height = (scaledViewport.height / devicePixelRatio) + 'px';
        }
        
        // Enhanced rendering context
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport,
            enableWebGL: true,
            renderInteractiveForms: true
        };
        
        const renderTask = page.render(renderContext);
        await renderTask.promise;
        
        document.getElementById('currentPage').textContent = num;
        
        // Hide loading with fade effect
        if (loadingElement) {
            loadingElement.style.opacity = '0';
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 300);
        }
        
        currentPage = num;
        
    } catch (error) {
        console.error('Page rendering error:', error);
        showPDFError('Failed to render PDF page');
    } finally {
        pageRendering = false;
        
        if (pageNumPending !== null) {
            renderEnhancedPage(pageNumPending);
            pageNumPending = null;
        }
    }
}

function calculateEnhancedScale(pageViewport, container) {
    const containerWidth = container.clientWidth - 60; // More padding
    const containerHeight = container.clientHeight - 60;
    
    const widthScale = containerWidth / pageViewport.width;
    const heightScale = containerHeight / pageViewport.height;
    
    // Use the smaller scale but ensure minimum readability
    const optimalScale = Math.min(widthScale, heightScale);
    return Math.max(0.8, Math.min(2.5, optimalScale));
}

// Enhanced zoom functions
function zoomPDF(zoomDelta) {
    if (!pdfDoc) return;
    
    const newScale = Math.max(0.5, Math.min(3.0, currentScale + zoomDelta));
    renderEnhancedPage(currentPage, newScale);
}

// Add this enhanced CSS to your HTML files
const enhancedPDFStyles = document.createElement('style');
enhancedPDFStyles.textContent = `
    /* Additional enhanced styles for better PDF clarity */
    .pdf-viewer-container {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    }
    
    #pdf-canvas {
        filter: contrast(1.05) brightness(1.02);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }
    
    [data-theme="dark"] #pdf-canvas {
        filter: contrast(1.1) brightness(1.05);
    }
`;
document.head.appendChild(enhancedPDFStyles);
