// Fixed PDF Viewer with Simple Zoom In/Out - Clean Version

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let canvas = null;
let ctx = null;
let currentScale = 1.0; // Track current scale for proper fitting

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Fixed PDF Viewer Functions with Simple Zoom
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
        
        // Create canvas for PDF rendering
        viewer.innerHTML = createPDFCanvas();
        
        // Initialize canvas
        canvas = document.getElementById('pdf-canvas');
        ctx = canvas.getContext('2d');
        
        // Load the PDF file
        const loadingTask = pdfjsLib.getDocument(pdfData.fileName);
        
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
        
        // Render first page with proper fitting
        await renderPage(currentPage);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        addPDFKeyboardNavigation();
        
        // Prevent PDF download and copying
        preventPDFActions(modal);
        
    } catch (error) {
        console.error('PDF loading error:', error);
        showPDFError('Failed to load PDF file. Please ensure the file exists and try again.');
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
                <button class="zoom-btn" onclick="zoomPDF(-0.2)" title="Zoom Out">
                    <i class="fas fa-search-minus"></i>
                </button>
                <span class="zoom-level" id="zoomLevel">100%</span>
                <button class="zoom-btn" onclick="zoomPDF(0.2)" title="Zoom In">
                    <i class="fas fa-search-plus"></i>
                </button>
            </div>
        </div>
    `;
}

function calculateOptimalScale(pageViewport, container) {
    const containerWidth = container.clientWidth - 40; // Account for padding
    const containerHeight = container.clientHeight - 40;
    
    // Calculate scale to fit width
    const widthScale = containerWidth / pageViewport.width;
    
    // Calculate scale to fit height
    const heightScale = containerHeight / pageViewport.height;
    
    // Use the smaller scale to ensure entire page fits
    const optimalScale = Math.min(widthScale, heightScale);
    
    // Ensure scale is within reasonable bounds (0.5 to 3.0)
    return Math.max(0.5, Math.min(3.0, optimalScale));
}

async function renderPage(num, targetScale = null) {
    pageRendering = true;
    
    // Show loading
    document.getElementById('pdf-loading').style.display = 'flex';
    
    try {
        const page = await pdfDoc.getPage(num);
        
        // Get container dimensions
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
        
        // Update current scale
        currentScale = scale;
        
        // Update zoom display
        const zoomLevel = document.getElementById('zoomLevel');
        if (zoomLevel) {
            zoomLevel.textContent = Math.round(scale * 100) + '%';
        }
        
        // Prepare canvas using PDF page dimensions
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        // Center the canvas if it's smaller than container
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = scaledViewport.width + 'px';
            canvasWrapper.style.height = scaledViewport.height + 'px';
        }
        
        // Render PDF page into canvas context
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport
        };
        
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
        showPDFError('Failed to render PDF page');
    } finally {
        pageRendering = false;
        
        // Render pending page
        if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
        }
    }
}

// Simple zoom functions
function zoomPDF(zoomDelta) {
    if (!pdfDoc) return;
    
    const newScale = Math.max(0.5, Math.min(3.0, currentScale + zoomDelta));
    renderPage(currentPage, newScale);
}

function queueRenderPage(num, targetScale = null) {
    if (pageRendering) {
        pageNumPending = num;
        // Store the target scale for pending page
        if (targetScale) {
            pageNumPending = { num: num, scale: targetScale };
        }
    } else {
        renderPage(num, targetScale);
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
    
    // Clean up
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
    // Prevent right-click context menu
    container.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Prevent text selection
    const canvas = container.querySelector('#pdf-canvas');
    if (canvas) {
        canvas.style.userSelect = 'none';
        canvas.style.webkitUserSelect = 'none';
        canvas.style.mozUserSelect = 'none';
        canvas.style.msUserSelect = 'none';
    }
    
    // Prevent copy operations
    container.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Prevent print operations
    container.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevent drag operations
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

// Touch/swipe support for mobile
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

// Window resize handler with debouncing
window.addEventListener('resize', debounce(() => {
    const modal = document.getElementById('pdfModal');
    if (modal.classList.contains('active') && pdfDoc) {
        // Re-render current page with new dimensions
        renderPage(currentPage);
    }
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions
window.PDFViewer = {
    openPDF,
    closePDF,
    changePage,
    zoomPDF
};

// Add CSS styles for screen-fitting PDF viewer with simple zoom
const pdfViewerStyles = document.createElement('style');
pdfViewerStyles.textContent = `
    .pdf-viewer-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 10px;
        overflow: auto;
        padding: 20px;
    }
    
    .pdf-canvas-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
    }
    
    #pdf-canvas {
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        display: block;
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
    
    .pdf-loading p {
        color: #666;
        font-size: 1rem;
    }
    
    .pdf-zoom-controls {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 25px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 20;
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
        transition: all 0.3s ease;
        font-size: 14px;
    }
    
    .zoom-btn:hover {
        background: #3182ce;
        transform: scale(1.1);
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
    
    .pdf-error {
        text-align: center;
        padding: 2rem;
    }
    
    .pdf-error i {
        font-size: 3rem;
        color: #f56565;
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
    
    @media (max-width: 768px) {
        .pdf-viewer-container {
            padding: 10px;
        }
        
        .pdf-zoom-controls {
            bottom: 10px;
            right: 10px;
            padding: 8px;
            gap: 8px;
        }
        
        .zoom-btn {
            width: 30px;
            height: 30px;
            font-size: 12px;
        }
        
        .zoom-level {
            min-width: 40px;
            font-size: 11px;
        }
        
        #pdf-canvas {
            max-width: 100%;
            height: auto;
        }
    }
    
    @media (max-width: 480px) {
        .pdf-zoom-controls {
            bottom: 5px;
            right: 5px;
            padding: 6px;
            gap: 6px;
        }
        
        .zoom-btn {
            width: 25px;
            height: 25px;
            font-size: 10px;
        }
        
        .zoom-level {
            min-width: 35px;
            font-size: 10px;
        }
    }
`;
document.head.appendChild(pdfViewerStyles);
