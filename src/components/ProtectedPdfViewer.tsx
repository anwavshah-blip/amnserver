import { useEffect, useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  pdfUrl: string;
  type?: string;
  description?: string;
  tags?: string[];
  views?: number;
  volume?: string;
  status?: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface ProtectedPdfViewerProps {
  article: Article;
  onClose: () => void;
}

export default function ProtectedPdfViewer({ article, onClose }: ProtectedPdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);

  // Disable all interactions
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventKeys = (e: KeyboardEvent) => {
      // Block Ctrl+P, Ctrl+S, Ctrl+C, Ctrl+Shift+S
      if ((e.ctrlKey || e.metaKey) && ['p', 's', 'c'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        e.stopPropagation();
        alert('This action is restricted for this document.');
        return false;
      }
    };

    // Add event listeners with capture phase
    document.addEventListener('contextmenu', preventDefault, true);
    document.addEventListener('keydown', preventKeys, true);
    document.addEventListener('dragstart', preventDefault, true);
    document.addEventListener('selectstart', preventDefault, true);
    document.addEventListener('copy', preventDefault, true);
    document.addEventListener('cut', preventDefault, true);

    return () => {
      document.removeEventListener('contextmenu', preventDefault, true);
      document.removeEventListener('keydown', preventKeys, true);
      document.removeEventListener('dragstart', preventDefault, true);
      document.removeEventListener('selectstart', preventDefault, true);
      document.removeEventListener('copy', preventDefault, true);
      document.removeEventListener('cut', preventDefault, true);
    };
  }, []);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const nextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const prevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Watermark overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Ctext x='50%25' y='50%25' font-size='40' fill='white' text-anchor='middle' transform='rotate(-45 250 250)'%3EConfidential - Aman Sah%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Toolbar */}
      <div className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-4 relative z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg neu-button flex items-center justify-center hover:scale-105 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="hidden sm:block">
            <h3 className="font-semibold text-sm truncate max-w-[300px]">
              {article.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              By {article.author} • {article.date}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="hidden sm:flex items-center gap-1 glass-card p-1">
            <button onClick={zoomOut} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-1 glass-card p-1">
            <button 
              onClick={prevPage} 
              disabled={pageNumber <= 1}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm px-2 min-w-[60px] text-center">
              {pageNumber} / {numPages}
            </span>
            <button 
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Protected badge */}
          <span className="hidden md:flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
            <Lock className="w-3 h-3" />
            Protected
          </span>
        </div>
      </div>

      {/* PDF Content */}
      <div 
        className="flex-1 overflow-auto bg-[#1a1a1a] relative z-20 flex items-start justify-center p-4"
        style={{ userSelect: 'none' }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="glass-card p-6 rounded-xl">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p>Loading document...</p>
            </div>
          </div>
        )}

        <Document
          file={article.pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
          error={
            <div className="text-white text-center p-8 glass-card rounded-xl">
              <p className="text-red-400 mb-2">Failed to load PDF</p>
              <p className="text-sm text-muted-foreground">Please try again later</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-2xl"
            loading={
              <div className="w-[600px] h-[800px] glass-card flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }
          />
        </Document>
      </div>

      {/* Footer warning */}
      <div className="h-12 glass-card border-t border-border/50 flex items-center justify-center gap-4 text-xs text-muted-foreground relative z-20 shrink-0">
        <span className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-red-400" />
          View Only Mode
        </span>
        <span>•</span>
        <span>Downloading, printing, and copying are disabled</span>
        <span>•</span>
        <span>© 2024 {article.author}</span>
      </div>
    </motion.div>
  );
}