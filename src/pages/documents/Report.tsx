import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileBarChart, 
  Calendar, 
  Tag, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight,
  X,
  Lock
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Report {
  id: number;
  title: string;
  author: string;
  date: string;
  tags: string[];
  views: number;
  pdfUrl: string;
  description: string;
  type: string;
}

const reports: Report[] = [
  {
    id: 1,
    title: 'Annual Research Report 2023',
    author: 'Dr. Alex Chen',
    date: '2023-12-31',
    tags: ['Annual', 'Research'],
    views: 3200,
    pdfUrl: '/sample.pdf',
    description: 'Comprehensive overview of research activities and findings throughout 2023.',
    type: 'Annual Report',
  },
  {
    id: 2,
    title: 'CERN Experiment Analysis Report',
    author: 'Dr. Alex Chen',
    date: '2023-11-15',
    tags: ['CERN', 'Particle Physics'],
    views: 2100,
    pdfUrl: '/sample.pdf',
    description: 'Detailed analysis of particle collision data from the LHC experiments.',
    type: 'Technical Report',
  },
  {
    id: 3,
    title: 'Quantum Computing Feasibility Study',
    author: 'Dr. Alex Chen',
    date: '2023-10-20',
    tags: ['Quantum', 'Computing'],
    views: 1850,
    pdfUrl: '/sample.pdf',
    description: 'Assessment of quantum computing applications in scientific research.',
    type: 'Feasibility Study',
  },
  {
    id: 4,
    title: 'Dark Matter Detection Progress Report',
    author: 'Dr. Alex Chen',
    date: '2023-09-30',
    tags: ['Dark Matter', 'Research'],
    views: 1600,
    pdfUrl: '/sample.pdf',
    description: 'Quarterly progress report on dark matter detection experiments.',
    type: 'Progress Report',
  },
  {
    id: 5,
    title: 'Nuclear Fusion Safety Assessment',
    author: 'Dr. Alex Chen',
    date: '2023-08-15',
    tags: ['Nuclear', 'Safety'],
    views: 2400,
    pdfUrl: '/sample.pdf',
    description: 'Comprehensive safety evaluation of nuclear fusion reactor designs.',
    type: 'Safety Report',
  },
];

export default function Report() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="gradient-text">Reports</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access technical reports, feasibility studies, and research documentation.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-input"
              />
            </div>
          </motion.div>

          {/* Reports List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => setSelectedReport(report)}
                className="glass-card p-6 cursor-pointer group hover:scale-[1.01] transition-transform"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl glass-button flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileBarChart className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="tag-glass text-xs">{report.type}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {report.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {report.views} views
                      </span>
                      <div className="flex gap-2">
                        {report.tags.map(tag => (
                          <span key={tag} className="tag-glass text-xs">
                            <Tag className="w-3 h-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Click to view</span>
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <FileBarChart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground">Try adjusting your search query.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        >
          {/* Toolbar */}
          <div className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedReport(null)}
                className="w-10 h-10 rounded-lg neu-button flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-semibold text-sm truncate max-w-[200px] sm:max-w-md">
                  {selectedReport.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Page {currentPage} • {zoomLevel}%
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 glass-card p-1">
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm w-14 text-center">{zoomLevel}%</span>
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              <div className="hidden md:flex items-center gap-1 glass-card p-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm px-2">{currentPage}</span>
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center opacity-50 cursor-not-allowed"
                  title="Download disabled"
                >
                  <Lock className="w-4 h-4" />
                </button>
                <button
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center opacity-50 cursor-not-allowed"
                  title="Print disabled"
                >
                  <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* PDF Content */}
          <div 
            ref={pdfContainerRef}
            onWheel={handleWheel}
            className="h-[calc(100vh-64px)] overflow-auto bg-[#1a1a1a] flex items-center justify-center p-8"
          >
            <div 
              className="bg-white shadow-2xl transition-transform duration-200"
              style={{ 
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'center top',
                width: '210mm',
                minHeight: '297mm',
                padding: '20mm'
              }}
            >
              <div className="text-black">
                <div className="text-center mb-8">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">{selectedReport.type}</span>
                  <h1 className="text-3xl font-bold mt-2">{selectedReport.title}</h1>
                  <p className="text-gray-600 mt-2">
                    Prepared by {selectedReport.author} • {selectedReport.date}
                  </p>
                </div>
                
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mt-8 mb-4">Executive Summary</h2>
                  <p className="mb-4">
                    {selectedReport.description}
                  </p>
                  <p className="mb-4">
                    This report presents a comprehensive analysis of the subject matter, 
                    including detailed findings, methodologies, and recommendations for future work.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Introduction</h2>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Methodology</h2>
                  <p className="mb-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Findings</h2>
                  <p className="mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                    architecto beatae vitae dicta sunt explicabo.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Conclusions</h2>
                  <p className="mb-4">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Recommendations</h2>
                  <p className="mb-4">
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
                    dolore magnam aliquam quaerat voluptatem.
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-500 text-sm">
                  <p>© 2024 {selectedReport.author}. All rights reserved.</p>
                  <p className="mt-2">CONFIDENTIAL - This document is protected and cannot be downloaded or printed.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 text-sm text-muted-foreground">
            Use Ctrl + Scroll to zoom • Scroll to navigate
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
