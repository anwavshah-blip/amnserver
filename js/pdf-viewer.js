// Enhanced PDF Viewer with Clear Display - Fixed Version

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let canvas = null;
let ctx = null;
let currentScale = 1.0;

// Initialize PDF.js with better quality settings
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Enhanced PDF Viewer with High Quality Rendering
async function openPDF(pdfId, pdfPath = null) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const title = document.getElementById('pdfTitle');
    
    try {
        // Get PDF data
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
        
        // Initialize canvas with high quality settings
        canvas = document.getElementById('pdf-canvas');
        ctx = canvas.getContext('2d', {
            alpha: false,
            desynchronized: false,
            willReadFrequently: false
        });
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Load the PDF file with enhanced settings
        const loadingTask = pdfjsLib.getDocument({
            url: pdfData.fileName,
            // Enhanced settings for better quality
            disableAutoFetch: false,
            disableStream: false,
            disableRange: false,
            isEvalSupported: false,
            useSystemFonts: true,
            useWorkerFetch: true,
            // CMap settings for better text rendering
            cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
            cMapPacked: true,
            // Enable native image decoding
            isOffscreenCanvasSupported: true,
            // Max image size for better quality
            maxImageSize: 10000000, // 10MB
            // Disable font faces for better compatibility
            disableFontFace: false,
            // Enable font extra properties
            fontExtraProperties: true
        });
        
        // Add progress tracking
        loadingTask.onProgress = function(progress) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateLoadingProgress(percent);
        };
        
        pdfDoc = await loadingTask.promise;
        
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        // Update page info
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Render first page with high quality
        await renderEnhancedPage(currentPage);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        addPDFKeyboardNavigation();
        
        // Prevent PDF download and copying
        preventPDFActions(modal);
        
        // Add enhanced zoom controls
        addEnhancedZoomControls();
        
    } catch (error) {
        console.error('PDF loading error:', error);
        showPDFError('Failed to load PDF file. Please ensure the file exists and try again.');
    }
}

function createEnhancedPDFCanvas() {
    return `
        <div class="enhanced-pdf-viewer-container">
            <div class="pdf-canvas-wrapper">
                <canvas id="pdf-canvas"></canvas>
            </div>
            <div class="pdf-loading" id="pdf-loading">
                <div class="pdf-spinner"></div>
                <p>Loading PDF... 0%</p>
            </div>
            <div class="pdf-enhanced-controls">
                <button class="zoom-btn" onclick="zoomPDF(-0.1)" title="Zoom Out">
                    <i class="fas fa-search-minus"></i>
                </button>
                <span class="zoom-level" id="zoomLevel">100%</span>
                <button class="zoom-btn" onclick="zoomPDF(0.1)" title="Zoom In">
                    <i class="fas fa-search-plus"></i>
                </button>
                <button class="zoom-btn" onclick="fitToWidth()" title="Fit to Width">
                    <i class="fas fa-arrows-alt-h"></i>
                </button>
                <button class="zoom-btn" onclick="fitToPage()" title="Fit to Page">
                    <i class="fas fa-compress"></i>
                </button>
                <button class="zoom-btn" onclick="resetZoom()" title="Reset Zoom">
                    <i class="fas fa-undo"></i>
                </button>
            </div>
        </div>
    `;
}

async function renderEnhancedPage(num, targetScale = null) {
    pageRendering = true;
    
    // Show loading
    document.getElementById('pdf-loading').style.display = 'flex';
    
    try {
        const page = await pdfDoc.getPage(num);
        
        // Get container dimensions
        const container = document.querySelector('.enhanced-pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        // Calculate optimal scale with better quality
        let scale;
        if (targetScale) {
            scale = targetScale;
        } else {
            // Start with a higher base scale for better quality
            const containerWidth = container.clientWidth - 40;
            const containerHeight = container.clientHeight - 40;
            
            const widthScale = containerWidth / viewport.width;
            const heightScale = containerHeight / viewport.height;
            
            // Use 90% of the available space for better clarity
            const optimalScale = Math.min(widthScale, heightScale) * 0.9;
            scale = Math.max(0.8, Math.min(2.0, optimalScale)); // Allow up to 200% scale
        }
        
        // Create high-quality viewport
        const scaledViewport = page.getViewport({ 
            scale: scale,
            // Enable better text rendering
            dontFlip: false
        });
        
        // Update current scale
        currentScale = scale;
        
        // Update zoom display
        const zoomLevel = document.getElementById('zoomLevel');
        if (zoomLevel) {
            zoomLevel.textContent = Math.round(scale * 100) + '%';
        }
        
        // Set canvas dimensions with high quality
        const outputScale = window.devicePixelRatio || 1;
        
        canvas.width = Math.floor(scaledViewport.width * outputScale);
        canvas.height = Math.floor(scaledViewport.height * outputScale);
        canvas.style.width = Math.floor(scaledViewport.width) + 'px';
        canvas.style.height = Math.floor(scaledViewport.height) + 'px';
        
        // Center the canvas
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = scaledViewport.width + 'px';
            canvasWrapper.style.height = scaledViewport.height + 'px';
            canvasWrapper.style.margin = '0 auto';
        }
        
        // Clear canvas with white background for better clarity
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set up high-quality rendering context
        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
        
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport,
            transform: transform,
            // Enable high-quality rendering options
            enableWebGL: false,
            renderInteractiveForms: true,
            // Use better text rendering
            textLayerMode: 1
        };
        
        // Render PDF page with high quality
        const renderTask = page.render(renderContext);
        await renderTask.promise;
        
        // Update page info
        document.getElementById('currentPage').textContent = num;
        
        // Hide loading
        document.getElementById('pdf-loading').style.display = 'none';
        
        // Update current page
        currentPage = num;
        
    } catch (error) {
        console.error('Page rendering error:', error);
        showPDFError('Failed to render PDF page clearly. Please try again.');
    } finally {
        pageRendering = false;
        
        // Render pending page
        if (pageNumPending !== null) {
            if (typeof pageNumPending === 'object') {
                renderEnhancedPage(pageNumPending.num, pageNumPending.scale);
            } else {
                renderEnhancedPage(pageNumPending);
            }
            pageNumPending = null;
        }
    }
}

// Enhanced zoom functions
function zoomPDF(zoomDelta) {
    if (!pdfDoc) return;
    
    const newScale = Math.max(0.5, Math.min(3.0, currentScale + zoomDelta));
    renderEnhancedPage(currentPage, newScale);
}

function resetZoom() {
    if (!pdfDoc) return;
    
    // Reset to optimal fit
    renderEnhancedPage(currentPage);
}

function fitToWidth() {
    if (!pdfDoc) return;
    
    const container = document.querySelector('.enhanced-pdf-viewer-container');
    const containerWidth = container.clientWidth - 40;
    
    pdfDoc.getPage(currentPage).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const widthScale = containerWidth / viewport.width;
        renderEnhancedPage(currentPage, widthScale);
    });
}

function fitToPage() {
    if (!pdfDoc) return;
    
    // Reset to optimal scaling
    renderEnhancedPage(currentPage);
}

// Add enhanced CSS for better PDF display
const enhancedPDFStyles = document.createElement('style');
enhancedPDFStyles.textContent = `
    .enhanced-pdf-viewer-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        border-radius: 10px;
        overflow: auto;
        padding: 20px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    .pdf-canvas-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background: #ffffff;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    }
    
    #pdf-canvas {
        max-width: 100%;
        max-height: 100%;
        display: block;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        background: #ffffff;
        /* Improve rendering quality */
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
        /* For high DPI displays */
        image-rendering: -webkit-crisp-edges;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
    }
    
    .pdf-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    
    .pdf-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid #4299e1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    .pdf-loading p {
        color: #4a5568;
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    .pdf-enhanced-controls {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 8px;
        background: rgba(255, 255, 255, 0.95);
        padding: 12px;
        border-radius: 25px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 20;
        backdrop-filter: blur(10px);
    }
    
    .zoom-btn {
        background: linear-gradient(45deg, #4299e1, #3182ce);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
    }
    
    .zoom-btn:hover {
        background: linear-gradient(45deg, #3182ce, #2b6cb0);
        transform: scale(1.1) translateY(-2px);
        box-shadow: 0 4px 15px rgba(66, 153, 225, 0.4);
    }
    
    .zoom-btn:active {
        transform: scale(0.95);
    }
    
    .zoom-level {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 60px;
        font-size: 13px;
        font-weight: 600;
        color: #2d3748;
        background: rgba(66, 153, 225, 0.1);
        padding: 8px 12px;
        border-radius: 15px;
        margin: 0 4px;
    }
    
    .pdf-error {
        text-align: center;
        padding: 3rem;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .pdf-error i {
        font-size: 4rem;
        color: #f56565;
        margin-bottom: 1.5rem;
    }
    
    .pdf-error h3 {
        color: #2d3748;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
    }
    
    .pdf-error p {
        color: #4a5568;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    /* Dark mode adjustments */
    [data-theme="dark"] .enhanced-pdf-viewer-container {
        background: #2d3748;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    }
    
    [data-theme="dark"] .pdf-canvas-wrapper {
        background: #2d3748;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    }
    
    [data-theme="dark"] #pdf-canvas {
        border-color: #4a5568;
        background: #ffffff;
    }
    
    [data-theme="dark"] .pdf-enhanced-controls {
        background: rgba(45, 55, 72, 0.95);
    }
    
    [data-theme="dark"] .zoom-level {
        color: #e2e8f0;
        background: rgba(66, 153, 225, 0.2);
    }
    
    [data-theme="dark"] .pdf-loading {
        background: rgba(45, 55, 72, 0.95);
    }
    
    [data-theme="dark"] .pdf-loading p {
        color: #a0aec0;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
        .enhanced-pdf-viewer-container {
            padding: 10px;
        }
        
        .pdf-enhanced-controls {
            bottom: 10px;
            right: 10px;
            padding: 10px;
            gap: 6px;
        }
        
        .zoom-btn {
            width: 35px;
            height: 35px;
            font-size: 12px;
        }
        
        .zoom-level {
            min-width: 50px;
            font-size: 12px;
            padding: 6px 10px;
        }
    }
    
    @media (max-width: 480px) {
        .pdf-enhanced-controls {
            bottom: 5px;
            right: 5px;
            padding: 8px;
            gap: 5px;
            flex-wrap: wrap;
            max-width: 200px;
        }
        
        .zoom-btn {
            width: 30px;
            height: 30px;
            font-size: 10px;
        }
        
        .zoom-level {
            min-width: 45px;
            font-size: 11px;
            padding: 5px 8px;
        }
    }
`;
document.head.appendChild(enhancedPDFStyles);
