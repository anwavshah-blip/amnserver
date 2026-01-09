// Complete Fixed PDF Viewer JavaScript

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

// Main PDF opening function
async function openPDF(pdfId, pdfPath = null) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const title = document.getElementById('pdfTitle');
    
    try {
        // INSTANT OPEN - Show modal immediately
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        document.body.style.overflow = 'hidden';
        
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
        
        // Create viewer HTML
        viewer.innerHTML = createPDFViewerHTML();
        
        // Initialize canvas
        canvas = document.getElementById('pdf-canvas');
        ctx = canvas.getContext('2d', { 
            alpha: false, 
            desynchronized: true 
        });
        
        // Load PDF
        const loadingTask = pdfjsLib.getDocument(pdfData.fileName);
        loadingTask.onProgress = function(progress) {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            updateLoadingProgress(percent);
        };
        
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        currentPage = 1;
        
        // Update UI
        document.getElementById('currentPage').textContent = currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        
        // Render first page
        await renderPage(currentPage);
        
        // Add navigation
        addKeyboardNavigation();
        
    } catch (error) {
        console.error('PDF loading error:', error);
        showError('Failed to load PDF file. Please ensure the file exists and try again.');
    }
}

// Create PDF viewer HTML
function createPDFViewerHTML() {
    return `
        <div class="pdf-viewer-container">
            <div class="pdf-canvas-wrapper">
                <canvas id="pdf-canvas"></canvas>
            </div>
            <div class="pdf-loading" id="pdf-loading">
                <div class="pdf-loading-spinner"></div>
                <p>Loading PDF... <span id="loadPercent">0</span>%</p>
            </div>
            <div class="pdf-zoom-controls">
                <button class="pdf-zoom-btn" onclick="zoomOut()" title="Zoom Out">
                    <i class="fas fa-search-minus"></i>
                </button>
                <span class="pdf-zoom-level" id="zoomLevel">100%</span>
                <button class="pdf-zoom-btn" onclick="zoomIn()" title="Zoom In">
                    <i class="fas fa-search-plus"></i>
                </button>
            </div>
        </div>
    `;
}

// Render PDF page
async function renderPage(num, targetScale = null) {
    if (pageRendering) {
        pageNumPending = num;
        return;
    }
    
    pageRendering = true;
    
    try {
        const page = await pdfDoc.getPage(num);
        const container = document.querySelector('.pdf-viewer-container');
        const viewport = page.getViewport({ scale: 1 });
        
        // Calculate scale
        let scale = calculateOptimalScale(viewport, container);
        if (targetScale) scale = Math.max(0.5, Math.min(3.0, targetScale));
        
        const scaledViewport = page.getViewport({ scale: scale });
        
        // Update canvas
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        
        // High-quality rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Render
        const renderContext = {
            canvasContext: ctx,
            viewport: scaledViewport
        };
        
        await page.render(renderContext).promise;
        
        // Add smooth transition
        canvas.style.opacity = '0';
        setTimeout(() => {
            canvas.style.opacity = '1';
        }, 50);
        
        // Update UI
        currentPage = num;
        currentScale = scale;
        document.getElementById('currentPage').textContent = num;
        document.getElementById('zoomLevel').textContent = Math.round(scale * 100) + '%';
        
        // Hide loading
        document.getElementById('pdf-loading').style.display = 'none';
        
    } catch (error) {
        console.error('Page rendering error:', error);
        showError('Failed to render PDF page');
    } finally {
        pageRendering = false;
        
        if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
        }
    }
}

// INSTANT CLOSE FUNCTION
function closePDF() {
    const modal = document.getElementById('pdfModal');
    
    // Remove active class first
    modal.classList.remove('active');
    
    // Then hide completely after transition
    setTimeout(() => {
        modal.style.display = 'none';
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
    }, 200); // Match CSS transition duration
}

// Zoom functions
function zoomIn() {
    if (!pdfDoc) return;
    const newScale = Math.max(0.5, Math.min(3.0, currentScale + 0.1));
    renderPage(currentPage, newScale);
}

function zoomOut() {
    if (!pdfDoc) return;
    const newScale = Math.max(0.5, Math.min(3.0, currentScale - 0.1));
    renderPage(currentPage, newScale);
}

// Navigation functions
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        renderPage(newPage);
    }
}

// Utility functions
function updateLoadingProgress(percent) {
    const percentElement = document.getElementById('loadPercent');
    if (percentElement) {
        percentElement.textContent = percent;
    }
}

function calculateOptimalScale(viewport, container) {
    const containerWidth = container.clientWidth - 40;
    const containerHeight = container.clientHeight - 40;
    const widthScale = containerWidth / viewport.width;
    const heightScale = containerHeight / viewport.height;
    return Math.max(0.5, Math.min(2.0, Math.min(widthScale, heightScale)));
}

function showError(message) {
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

function addKeyboardNavigation() {
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
                renderPage(1);
                break;
            case 'End':
                e.preventDefault();
                renderPage(totalPages);
                break;
        }
    });
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
    zoomIn,
    zoomOut
};