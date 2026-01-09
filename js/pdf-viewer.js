// Enhanced PDF Viewer - Optimized for Quality, Speed, and Instant Close

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let canvas = null;
let ctx = null;
let currentScale = 1.0;
let isModalClosing = false;

// Initialize PDF.js with optimized settings
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Optimize PDF.js settings for better quality and performance
const PDFJS_OPTIONS = {
    maxImageSize: -1, // No limit on image size for better quality
    disableFontFace: false, // Enable font rendering
    disableRange: false, // Enable range requests for faster loading
    disableStream: false, // Enable streaming
    disableAutoFetch: false, // Enable auto-fetching
    disableCreateObjectURL: false, // Enable object URLs
    verbosity: 0 // Reduce console output
};

// Pre-load common PDFs for instant display
const pdfCache = new Map();
const preloadedPDFs = [
    'assets/documents/habitat-preferences-spiny-babbler.pdf',
    'assets/documents/breeding-behavior-observations.pdf',
    'assets/documents/conservation-status-assessment.pdf'
];

// Pre-load PDFs in background
function preloadPDFs() {
    preloadedPDFs.forEach(pdfPath => {
        const loadingTask = pdfjsLib.getDocument({
            url: pdfPath,
            ...PDFJS_OPTIONS
        });
        
        loadingTask.promise.then(pdf => {
            pdfCache.set(pdfPath, pdf);
            console.log(`Pre-loaded: ${pdfPath}`);
        }).catch(error => {
            console.warn(`Failed to pre-load: ${pdfPath}`, error);
        });
    });
}

// Start pre-loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(preloadPDFs, 1000); // Delay to prioritize main content
});

// Enhanced PDF opening with instant display
async function openPDF(pdfId, pdfPath = null) {
    if (isModalClosing) return; // Prevent multiple opens during close
    
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const title = document.getElementById('pdfTitle');
    
    try {
        // Show modal immediately for instant feedback
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        document.body.style.overflow = 'hidden';
        
        // Fade in animation
        requestAnimationFrame(() => {
            modal.style.transition = 'opacity 0.2s ease';
            modal.style.opacity = '1';
        });
        
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
        
        // Create enhanced canvas with high quality settings
        viewer.innerHTML = createEnhancedPDFCanvas();
        
        // Initialize canvas with high quality settings
        canvas = document.getElementById('pdf-canvas');
        ctx = canvas.getContext('2d', { 
            alpha: false, // Disable transparency for better performance
            desynchronized: true // Enable desynchronized canvas for faster rendering
        });
        
        // Try to get cached PDF first
        let pdf = pdfCache.get(pdfData.fileName);
        
        if (!pdf) {
            // Show loading state
            showPDFLoading();
            
            // Load PDF with optimized settings
            const loadingTask = pdfjsLib.getDocument({
                url: pdfData.fileName,
                ...PDFJS_OPTIONS
            });
            
            // Progress tracking with faster updates
            loadingTask.onProgress = function(progress) {
                const percent = Math.round((progress.loaded / progress.total) * 100);
                updateLoadingProgress(percent);
            };
            
            pdf = await loadingTask.promise;
        }
        
        // Cache the PDF for future use
        if (!pdfCache.has(pdfData.fileName)) {
            pdfCache.set(pdfData.fileName, pdf);
        }
        
        pdfDoc = pdf;
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        // Update page info
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Render first page with enhanced quality
        await renderEnhancedPage(currentPage);
        
        // Add keyboard navigation
        addPDFKeyboardNavigation();
        
        // Prevent PDF download and copying
        preventPDFActions(modal);
        
        // Add enhanced zoom controls
        addEnhancedZoomControls();
        
        // Mark as active after successful load
        modal.classList.add('active');
        
    } catch (error) {
        console.error('PDF loading error:', error);
        showPDFError('Failed to load PDF file. Please ensure the file exists and try again.');
    }
}

function createEnhancedPDFCanvas() {
    return `
        <div class="enhanced-pdf-viewer-container">
            <div class="pdf-canvas-wrapper">
                <canvas id="pdf-canvas" class="enhanced-canvas"></canvas>
            </div>
            <div class="pdf-loading" id="pdf-loading">
                <div class="pdf-spinner"></div>
                <p>Loading PDF... 0%</p>
            </div>
            <div class="enhanced-pdf-zoom-controls">
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
                <button class="zoom-btn close-pdf-instant" onclick="closePDF()" title="Close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
}

function showPDFLoading() {
    const loadingElement = document.getElementById('pdf-loading');
    if (loadingElement) {
        loadingElement.style.display = 'flex';
    }
}

function updateLoadingProgress(percent) {
    const loadingElement = document.getElementById('pdf-loading');
    if (loadingElement) {
        const progressText = loadingElement.querySelector('p');
        if (progressText) {
            progressText.textContent = `Loading PDF... ${percent}%`;
        }
    }
}

// Enhanced page rendering with better quality
async function renderEnhancedPage(num, targetScale = null) {
    if (pageRendering || !pdfDoc) return;
    
    pageRendering = true;
    
    try {
        const page = await pdfDoc.getPage(num);
        
        // Get container dimensions with better calculations
        const container = document.querySelector('.enhanced-pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        // Calculate optimal scale with better quality settings
        let scale;
        if (targetScale) {
            scale = Math.max(0.5, Math.min(4.0, targetScale)); // Allow up to 400% zoom
        } else {
            scale = calculateEnhancedOptimalScale(viewport, container);
        }
        
        const scaledViewport = page.getViewport({ scale: scale });
        
        // Update current scale
        currentScale = scale;
        
        // Update zoom display
        const zoomLevel = document.getElementById('zoomLevel');
        if (zoomLevel) {
            zoomLevel.textContent = Math.round(scale * 100) + '%';
        }
        
        // Configure canvas for high quality rendering
        const outputScale = window.devicePixelRatio || 1;
        
        canvas.width = Math.floor(scaledViewport.width * outputScale);
        canvas.height = Math.floor(scaledViewport.height * outputScale);
        canvas.style.width = Math.floor(scaledViewport.width) + 'px';
        canvas.style.height = Math.floor(scaledViewport.height) + 'px';
        
        // Set up canvas for high quality rendering
        ctx.scale(outputScale, outputScale);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Center the canvas
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = scaledViewport.width + 'px';
            canvasWrapper.style.height = scaledViewport.height + 'px';
            canvasWrapper.style.margin = '0 auto';
        }
        
        // Render with enhanced settings
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport,
            enableWebGL: true, // Enable WebGL if available
            renderInteractiveForms: false, // Disable for better performance
            background: 'white' // Set white background
        };
        
        const renderTask = page.render(renderContext);
        await renderTask.promise;
        
        // Update page info
        document.getElementById('currentPage').textContent = num;
        
        // Hide loading
        const loadingElement = document.getElementById('pdf-loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        // Update current page
        currentPage = num;
        
    } catch (error) {
        console.error('Enhanced page rendering error:', error);
        showPDFError('Failed to render PDF page with enhanced quality');
    } finally {
        pageRendering = false;
        
        // Render pending page
        if (pageNumPending !== null) {
            const pending = pageNumPending;
            pageNumPending = null;
            renderEnhancedPage(pending.num || pending, pending.scale);
        }
    }
}

function calculateEnhancedOptimalScale(pageViewport, container) {
    const containerWidth = container.clientWidth - 60; // Account for padding and controls
    const containerHeight = container.clientHeight - 120; // Account for header, footer, and controls
    
    // Calculate scale to fit with better quality
    const widthScale = containerWidth / pageViewport.width;
    const heightScale = containerHeight / pageViewport.height;
    
    // Use the smaller scale but ensure minimum quality
    const optimalScale = Math.max(0.8, Math.min(widthScale, heightScale, 2.0));
    
    return optimalScale;
}

// Enhanced zoom functions
function zoomPDF(zoomDelta) {
    if (!pdfDoc || pageRendering) return;
    
    const newScale = Math.max(0.5, Math.min(4.0, currentScale + zoomDelta));
    renderEnhancedPage(currentPage, newScale);
}

function fitToWidth() {
    if (!pdfDoc || pageRendering) return;
    
    const container = document.querySelector('.enhanced-pdf-viewer-container');
    const containerWidth = container.clientWidth - 60;
    
    pdfDoc.getPage(currentPage).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const widthScale = containerWidth / viewport.width;
        renderEnhancedPage(currentPage, Math.min(widthScale, 2.0));
    });
}

function fitToPage() {
    if (!pdfDoc || pageRendering) return;
    
    renderEnhancedPage(currentPage);
}

// Instant close function
function closePDF() {
    if (isModalClosing) return; // Prevent multiple close calls
    
    const modal = document.getElementById('pdfModal');
    if (!modal.classList.contains('active')) return;
    
    isModalClosing = true;
    
    // Instant visual feedback
    modal.style.transition = 'opacity 0.1s ease';
    modal.style.opacity = '0';
    
    // Clean up after fade out
    setTimeout(() => {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Clean up PDF resources
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
        isModalClosing = false;
        
        // Clear the viewer
        const viewer = document.getElementById('pdfViewer');
        if (viewer) {
            viewer.innerHTML = '';
        }
    }, 100);
}

// Enhanced keyboard navigation
function addPDFKeyboardNavigation() {
    const keyHandler = function(e) {
        const modal = document.getElementById('pdfModal');
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                changePage(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                changePage(1);
                break;
            case 'Escape':
                e.preventDefault();
                closePDF();
                break;
            case 'Home':
                e.preventDefault();
                queueRenderPage(1);
                break;
            case 'End':
                e.preventDefault();
                queueRenderPage(totalPages);
                break;
            case '+':
            case '=':
                e.preventDefault();
                zoomPDF(0.1);
                break;
            case '-':
                e.preventDefault();
                zoomPDF(-0.1);
                break;
            case '0':
                e.preventDefault();
                fitToPage();
                break;
        }
    };
    
    document.addEventListener('keydown', keyHandler);
    
    // Store handler for cleanup
    modal.keyHandler = keyHandler;
}

function queueRenderPage(num, targetScale = null) {
    if (pageRendering) {
        pageNumPending = { num: num, scale: targetScale };
    } else {
        renderEnhancedPage(num, targetScale);
    }
}

function changePage(direction) {
    if (pageRendering) return;
    
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        queueRenderPage(newPage);
    }
}

// Enhanced zoom controls
function addEnhancedZoomControls() {
    // Controls are already added in createEnhancedPDFCanvas()
    // This function can be used for additional setup
}

// Enhanced error handling
function showPDFError(message) {
    const viewer = document.getElementById('pdfViewer');
    viewer.innerHTML = `
        <div class="pdf-error enhanced-error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error Loading PDF</h3>
            <p>${message}</p>
            <button onclick="closePDF()" class="btn btn-primary">Close</button>
        </div>
    `;
    
    // Hide loading on error
    const loadingElement = document.getElementById('pdf-loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

// Enhanced PDF actions prevention
function preventPDFActions(container) {
    // Multiple prevention methods for better security
    const preventDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };
    
    // Prevent context menu
    container.addEventListener('contextmenu', preventDefault);
    
    // Prevent text selection
    container.style.userSelect = 'none';
    container.style.webkitUserSelect = 'none';
    container.style.mozUserSelect = 'none';
    container.style.msUserSelect = 'none';
    
    // Prevent copy operations
    container.addEventListener('copy', preventDefault);
    container.addEventListener('cut', preventDefault);
    
    // Prevent print operations
    container.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
            preventDefault(e);
        }
    });
    
    // Prevent drag operations
    container.addEventListener('dragstart', preventDefault);
    container.addEventListener('selectstart', preventDefault);
}

// Enhanced touch/swipe support
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    const modal = document.getElementById('pdfModal');
    if (!modal.classList.contains('active')) return;
    
    const touch = e.changedTouches[0];
    touchStartX = touch.screenX;
    touchStartY = touch.screenY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    const modal = document.getElementById('pdfModal');
    if (!modal.classList.contains('active')) return;
    
    const touch = e.changedTouches[0];
    touchEndX = touch.screenX;
    touchEndY = touch.screenY;
    handleEnhancedSwipe();
}, { passive: true });

function handleEnhancedSwipe() {
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Check if horizontal swipe is dominant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            changePage(1); // Swipe left - next page
        } else {
            changePage(-1); // Swipe right - previous page
        }
    }
}

// Enhanced window resize handler
const debouncedResize = debounce(() => {
    const modal = document.getElementById('pdfModal');
    if (modal.classList.contains('active') && pdfDoc && !pageRendering) {
        // Re-render current page with new dimensions
        renderEnhancedPage(currentPage, currentScale);
    }
}, 150);

window.addEventListener('resize', debouncedResize);

// Enhanced cleanup on page unload
window.addEventListener('beforeunload', () => {
    pdfCache.forEach(pdf => {
        if (pdf && pdf.destroy) {
            pdf.destroy();
        }
    });
    pdfCache.clear();
});

// Export enhanced functions
window.PDFViewer = {
    openPDF,
    closePDF,
    changePage,
    zoomPDF,
    fitToWidth,
    fitToPage,
    preloadPDFs
};

// Enhanced CSS styles for better quality display
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
        border-radius: 12px;
        overflow: auto;
        padding: 30px;
        box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .pdf-canvas-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        transition: all 0.3s ease;
    }
    
    .enhanced-canvas {
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        display: block;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        transform-origin: center center;
        transition: transform 0.2s ease;
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
        backdrop-filter: blur(2px);
    }
    
    .pdf-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f1f5f9;
        border-top: 4px solid #4299e1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1.5rem;
    }
    
    .pdf-loading p {
        color: #64748b;
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    .enhanced-pdf-zoom-controls {
        position: absolute;
        bottom: 25px;
        right: 25px;
        display: flex;
        gap: 12px;
        background: rgba(255, 255, 255, 0.95);
        padding: 12px;
        border-radius: 30px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 20;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .zoom-btn {
        background: linear-gradient(135deg, #4299e1, #3182ce);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 15px;
        box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
    }
    
    .zoom-btn:hover {
        background: linear-gradient(135deg, #3182ce, #2c5282);
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
        color: #374151;
        background: rgba(241, 245, 249, 0.8);
        padding: 4px 8px;
        border-radius: 12px;
    }
    
    .close-pdf-instant {
        background: linear-gradient(135deg, #ef4444, #dc2626);
    }
    
    .close-pdf-instant:hover {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
    }
    
    .pdf-error.enhanced-error {
        text-align: center;
        padding: 3rem;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 12px;
        margin: 2rem;
    }
    
    .pdf-error.enhanced-error i {
        font-size: 4rem;
        color: #ef4444;
        margin-bottom: 1.5rem;
    }
    
    .pdf-error.enhanced-error h3 {
        color: #374151;
        margin-bottom: 0.75rem;
        font-size: 1.5rem;
    }
    
    .pdf-error.enhanced-error p {
        color: #6b7280;
        margin-bottom: 2rem;
        font-size: 1.1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 768px) {
        .enhanced-pdf-viewer-container {
            padding: 20px;
        }
        
        .enhanced-pdf-zoom-controls {
            bottom: 15px;
            right: 15px;
            padding: 10px;
            gap: 10px;
        }
        
        .zoom-btn {
            width: 35px;
            height: 35px;
            font-size: 13px;
        }
        
        .zoom-level {
            min-width: 50px;
            font-size: 12px;
        }
    }
    
    @media (max-width: 480px) {
        .enhanced-pdf-viewer-container {
            padding: 15px;
        }
        
        .enhanced-pdf-zoom-controls {
            bottom: 10px;
            right: 10px;
            padding: 8px;
            gap: 8px;
        }
        
        .zoom-btn {
            width: 30px;
            height: 30px;
            font-size: 11px;
        }
        
        .zoom-level {
            min-width: 45px;
            font-size: 11px;
        }
    }
`;
document.head.appendChild(enhancedPDFStyles);
