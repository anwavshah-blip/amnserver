// Complete PDF Viewer with Working Scrollbars and Persistent Zoom Controls

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
        viewer.innerHTML = createPDFCanvas();
        
        canvas = document.getElementById('pdf-canvas');
        ctx = canvas.getContext('2d');
        
        const loadingTask = pdfjsLib.getDocument(pdfData.fileName);
        loadingTask.onProgress = function(progress) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateLoadingProgress(percent);
        };
        
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        await renderPage(currentPage);
        
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
        </div>
    `;
}

async function renderPage(num, targetScale = null) {
    pageRendering = true;
    document.getElementById('pdf-loading').style.display = 'flex';
    
    try {
        const page = await pdfDoc.getPage(num);
        const container = document.querySelector('.pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        let scale;
        if (targetScale) {
            scale = targetScale;
        } else {
            scale = calculateOptimalScale(viewport, container);
        }
        
        const scaledViewport = page.getViewport({ scale: scale });
        currentScale = scale;
        
        document.getElementById('zoomLevel').textContent = Math.round(scale * 100) + '%';
        
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        const canvasWrapper = document.querySelector('.pdf-canvas-wrapper');
        if (canvasWrapper) {
            canvasWrapper.style.width = scaledViewport.width + 'px';
            canvasWrapper.style.height = scaledViewport.height + 'px';
            
            // ENABLE SCROLLING WHEN CONTENT IS LARGER
            if (scaledViewport.width > container.clientWidth || scaledViewport.height > container.clientHeight) {
                container.style.overflow = 'auto';
            } else {
                container.style.overflow = 'hidden';
            }
        }
        
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport
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
            renderPage(pageNumPending);
            pageNumPending = null;
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

// ZOOM FUNCTIONS (Fixed)
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
    
    pdfDoc.getPage(currentPage).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const widthScale = containerWidth / viewport.width;
        renderPage(currentPage, widthScale);
    });
}

function resetZoom() {
    if (!pdfDoc) return;
    renderPage(currentPage);
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        renderPage(newPage);
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

// Add CSS for PDF viewer
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
