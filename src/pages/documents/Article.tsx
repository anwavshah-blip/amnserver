import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Calendar, 
  Tag, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight,
  X,
  Lock,
  Download,
  Printer
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  tags: string[];
  views: number;
  pdfUrl: string;
  description: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Quantum Entanglement in Modern Physics',
    author: 'Dr. Alex Chen',
    date: '2024-01-15',
    tags: ['Quantum Physics', 'Research'],
    views: 1250,
    pdfUrl: '/sample.pdf',
    description: 'An in-depth exploration of quantum entanglement and its applications in quantum computing.',
  },
  {
    id: 2,
    title: 'Dark Matter Detection Methods',
    author: 'Dr. Alex Chen',
    date: '2024-01-10',
    tags: ['Astrophysics', 'Dark Matter'],
    views: 980,
    pdfUrl: '/sample.pdf',
    description: 'A comprehensive review of current techniques used to detect dark matter particles.',
  },
  {
    id: 3,
    title: 'Machine Learning in Particle Physics',
    author: 'Dr. Alex Chen',
    date: '2024-01-05',
    tags: ['AI', 'Particle Physics'],
    views: 1500,
    pdfUrl: '/sample.pdf',
    description: 'How machine learning algorithms are revolutionizing data analysis at CERN.',
  },
  {
    id: 4,
    title: 'The Future of Nuclear Fusion',
    author: 'Dr. Alex Chen',
    date: '2023-12-28',
    tags: ['Nuclear Physics', 'Energy'],
    views: 2100,
    pdfUrl: '/sample.pdf',
    description: 'Examining recent breakthroughs in nuclear fusion research and their implications.',
  },
  {
    id: 5,
    title: 'Gravitational Waves: A New Window',
    author: 'Dr. Alex Chen',
    date: '2023-12-20',
    tags: ['Astrophysics', 'Gravitational Waves'],
    views: 1800,
    pdfUrl: '/sample.pdf',
    description: 'Understanding how gravitational wave detection has opened new frontiers in astronomy.',
  },
];

export default function Article() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
              <span className="gradient-text">Articles</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through my collection of research articles and scientific publications.
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-input"
              />
            </div>
          </motion.div>

          {/* Articles List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => setSelectedArticle(article)}
                className="glass-card p-6 cursor-pointer group hover:scale-[1.01] transition-transform"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl glass-button flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {article.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {article.views} views
                      </span>
                      <div className="flex gap-2">
                        {article.tags.map(tag => (
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
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search query.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedArticle && (
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
                onClick={() => setSelectedArticle(null)}
                className="w-10 h-10 rounded-lg neu-button flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-semibold text-sm truncate max-w-[200px] sm:max-w-md">
                  {selectedArticle.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Page {currentPage} • {zoomLevel}%
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 glass-card p-1">
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm w-14 text-center">{zoomLevel}%</span>
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              {/* Page Navigation */}
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
              
              {/* Restricted Actions */}
              <div className="flex items-center gap-1">
                <button
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center opacity-50 cursor-not-allowed"
                  title="Download disabled"
                >
                  <Lock className="w-4 h-4" />
                  <Download className="w-4 h-4 hidden" />
                </button>
                <button
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center opacity-50 cursor-not-allowed"
                  title="Print disabled"
                >
                  <Lock className="w-4 h-4" />
                  <Printer className="w-4 h-4 hidden" />
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
              {/* Simulated PDF Content */}
              <div className="text-black">
                <h1 className="text-3xl font-bold mb-4 text-center">{selectedArticle.title}</h1>
                <p className="text-center text-gray-600 mb-8">
                  By {selectedArticle.author} • {selectedArticle.date}
                </p>
                
                <div className="prose max-w-none">
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Abstract</h2>
                  <p className="mb-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Introduction</h2>
                  <p className="mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                    architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <p className="mb-4">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Methodology</h2>
                  <p className="mb-4">
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                    adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
                    dolore magnam aliquam quaerat voluptatem.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Results</h2>
                  <p className="mb-4">
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit 
                    laboriosam, nisi ut aliquid ex ea commodi consequatur?
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Conclusion</h2>
                  <p className="mb-4">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil 
                    molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-500 text-sm">
                  <p>© 2024 {selectedArticle.author}. All rights reserved.</p>
                  <p className="mt-2">This document is protected and cannot be downloaded or printed.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 text-sm text-muted-foreground">
            Use Ctrl + Scroll to zoom • Scroll to navigate
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
