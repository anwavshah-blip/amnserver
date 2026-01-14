// Enhanced PDF Viewer with Screen-Fitting - Clean Version

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let canvas = null;
let ctx = null;
let currentScale = 1.0;

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Enhanced PDF Viewer Functions with Screen Fitting
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
            desynchronized: true
        });
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Load PDF with enhanced settings
        const loadingTask = pdfjsLib.getDocument({
            url: pdfData.fileName,
            disableAutoFetch: false,
            disableStream: false,
            disableFontFace: false
        });
        
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
    
    document.getElementById('pdf-loading').style.display = 'flex';
    
    try {
        const page = await pdfDoc.getPage(num);
        
        const container = document.querySelector('.pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        // Calculate optimal scale with device pixel ratio
        const devicePixelRatio = window.devicePixelRatio || 1;
        let scale;
        
        if (targetScale) {
            scale = targetScale;
        } else {
            const containerWidth = container.clientWidth - 60;
            const containerHeight = container.clientHeight - 60;
            const widthScale = containerWidth / viewport.width;
            const heightScale = containerHeight / viewport.height;
            scale = Math.min(widthScale, heightScale);
            scale = Math.max(0.8, Math.min(2.5, scale));
        }
        
        const enhancedScale = scale * devicePixelRatio;
        const scaledViewport = page.getViewport({ scale: enhancedScale });
        
        currentScale = scale;
        
        // Update zoom display
        const zoomLevel = document.getElementById('zoomLevel');
        if (zoomLevel) {
            zoomLevel.textContent = Math.round(scale * 100) + '%';
        }
        
        // Set canvas dimensions
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        canvas.style.height = (scaledViewport.height / devicePixelRatio) + 'px';
        canvas.style.width = (scaledViewport.width / devicePixelRatio) + 'px';
        
        // Center canvas
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = (scaledViewport.width / devicePixelRatio) + 'px';
            canvasWrapper.style.height = (scaledViewport.height / devicePixelRatio) + 'px';
        }
        
        // Render with enhanced settings
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport,
            enableWebGL: false
        };
        
        await page.render(renderContext).promise;
        
        document.getElementById('currentPage').textContent = num;
        document.getElementById('pdf-loading').style.display = 'none';
        
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

function updateLoadingProgress(percent) {
    const loadingElement = document.getElementById('pdf-loading');
    if (loadingElement) {
        const progressText = loadingElement.querySelector('p');
        if (progressText) {
            progressText.textContent = `Loading PDF... ${percent}%`;
        }
    }
}

function zoomPDF(zoomDelta) {
    if (!pdfDoc) return;
    
    const newScale = Math.max(0.5, Math.min(3.0, currentScale + zoomDelta));
    renderEnhancedPage(currentPage, newScale);
}

function queueRenderPage(num, targetScale = null) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderEnhancedPage(num, targetScale);
    }
}

function changePage(direction) {
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        queueRenderPage(newPage);
    }
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
}

function addPDFKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
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
        }
    });
}

function preventPDFActions(container) {
    container.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    const canvas = container.querySelector('#pdf-canvas');
    if (canvas) {
        canvas.style.userSelect = 'none';
        canvas.style.webkitUserSelect = 'none';
        canvas.style.mozUserSelect = 'none';
        canvas.style.msUserSelect = 'none';
    }
    
    container.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    container.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
            e.preventDefault();
            return false;
        }
    });
    
    container.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
}

function showPDFError(message) {
    const viewer = document.getElementById('pdfViewer');
    viewer.innerHTML = `
        <div class="pdf-error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error Loading PDF</h3>
            <p>${message}</p>
            <button onclick="closePDF()" class="btn btn-primary">Close</button>
        </div>
    `;
}

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    const modal = document.getElementById('pdfModal');
    if (!modal.classList.contains('active')) return;
    
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    const modal = document.getElementById('pdfModal');
    if (!modal.classList.contains('active')) return;
    
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changePage(1);
        } else {
            changePage(-1);
        }
    }
}

// PDF Database
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

// Export functions
window.PDFViewer = {
    openPDF,
    closePDF,
    changePage,
    zoomPDF
};

// Add CSS styles
const pdfViewerStyles = document.createElement('style');
pdfViewerStyles.textContent = `
    .pdf-viewer-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        border-radius: 10px;
        overflow: auto;
        padding: 30px;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
    }
    
    .pdf-canvas-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 20px;
    }
    
    #pdf-canvas {
        max-width: 100%;
        max-height: 100%;
        display: block;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        transform: translateZ(0);
        backface-visibility: hidden;
    }
    
    .pdf-zoom-controls {
        position: absolute;
        bottom: 25px;
        right: 25px;
        display: flex;
        gap: 12px;
        background: rgba(255, 255, 255, 0.95);
        padding: 12px;
        border-radius: 30px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 20;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 0, 0, 0.1);
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
        transition: all 0.3s ease;
        font-size: 16px;
    }
    
    .zoom-btn:hover {
        background: linear-gradient(135deg, #3182ce, #2b6cb0);
        transform: scale(1.1) translateY(-2px);
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
        border-radius: 20px;
    }
    
    .pdf-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(248, 249, 250, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
        backdrop-filter: blur(5px);
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
    
    .pdf-error {
        text-align: center;
        padding: 3rem;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 15px;
        margin: 2rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(pdfViewerStyles);
