// Production PDF Viewer with PDF.js - Complete Version

let currentPDF = null;
let currentPage = 1;
let totalPages = 1;
let pdfDoc = null;
let pageRendering = false;
let pageNumPending = null;
let canvas = null;
let ctx = null;

// Initialize PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// PDF Viewer Functions
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
        pdfDoc = await loadingTask.promise;
        
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        // Update page info
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Render first page
        await renderPage(currentPage);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        addPDFKeyboardNavigation();
        
        // Prevent PDF download and copying
        preventPDFActions(modal);
        
    } catch (error) {
        showPDFError('Failed to load PDF file. Please try again.');
    }
}

function createPDFCanvas() {
    return `
        <div class="pdf-viewer-container">
            <canvas id="pdf-canvas"></canvas>
            <div class="pdf-loading" id="pdf-loading">
                <div class="pdf-spinner"></div>
                <p>Loading PDF...</p>
            </div>
        </div>
    `;
}

async function renderPage(num) {
    pageRendering = true;
    
    // Show loading
    document.getElementById('pdf-loading').style.display = 'flex';
    
    try {
        const page = await pdfDoc.getPage(num);
        
        // Set scale based on container width
        const container = document.querySelector('.pdf-viewer-container');
        const containerWidth = container.clientWidth - 40;
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale: scale });
        
        // Prepare canvas using PDF page dimensions
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
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

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
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
        },
        research1: {
            id: 'research1',
            title: 'Population Dynamics Study 2024',
            fileName: 'assets/documents/population-dynamics-study-2024.pdf',
            pages: 2,
            uploadDate: '2024-01-05',
            type: 'Population Study'
        },
        research2: {
            id: 'research2',
            title: 'Genetic Diversity Analysis',
            fileName: 'assets/documents/genetic-diversity-analysis.pdf',
            pages: 3,
            uploadDate: '2024-02-28',
            type: 'Genetics Research'
        },
        project1: {
            id: 'project1',
            title: 'Spiny Babbler Habitat Restoration',
            fileName: 'assets/documents/habitat-restoration-project.pdf',
            pages: 5,
            uploadDate: '2024-03-15',
            type: 'Project Report'
        },
        journal1: {
            id: 'journal1',
            title: 'Field Observations Journal 2024',
            fileName: 'assets/documents/field-observations-journal.pdf',
            pages: 8,
            uploadDate: '2024-01-20',
            type: 'Field Journal'
        }
    };
    
    return pdfDatabase[pdfId] || null;
}

// Window resize handler
window.addEventListener('resize', debounce(() => {
    const modal = document.getElementById('pdfModal');
    if (modal.classList.contains('active') && pdfDoc) {
        renderPage(currentPage);
    }
}, 250));

// Utility function
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
        background: #f8f9fa;
        border-radius: 10px;
        overflow: auto;
    }
    
    #pdf-canvas {
        max-width: 100%;
        height: auto;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
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
            padding: 1rem;
        }
        
        #pdf-canvas {
            max-width: 100%;
            height: auto;
        }
    }
`;
document.head.appendChild(pdfViewerStyles);