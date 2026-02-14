import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import article1 from '../../assets/documents/article/game.pdf';
import article2 from '../../assets/documents/article/Hilly region Report.pdf';
import article3 from '../../assets/documents/article/sample-journal.pdf';
import article4 from '../../assets/documents/article/game.pdf';
import article5 from '../../assets/documents/article/game.pdf';
import ProtectedPdfViewer from '../../components/ProtectedPdfViewer';
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
    pdfUrl: article1,
    description: 'An in-depth exploration of quantum entanglement and its applications in quantum computing.',
  },
  {
    id: 2,
    title: 'Dark Matter Detection Methods',
    author: 'Dr. Alex Chen',
    date: '2024-01-10',
    tags: ['Astrophysics', 'Dark Matter'],
    views: 980,
    pdfUrl: article2,
    description: 'A comprehensive review of current techniques used to detect dark matter particles.',
  },
  {
    id: 3,
    title: 'Machine Learning in Particle Physics',
    author: 'Dr. Alex Chen',
    date: '2024-01-05',
    tags: ['AI', 'Particle Physics'],
    views: 1500,
    pdfUrl: article3,
    description: 'How machine learning algorithms are revolutionizing data analysis at CERN.',
  },
  {
    id: 4,
    title: 'The Future of Nuclear Fusion',
    author: 'Dr. Alex Chen',
    date: '2023-12-28',
    tags: ['Nuclear Physics', 'Energy'],
    views: 2100,
    pdfUrl: article4,
    description: 'Examining recent breakthroughs in nuclear fusion research and their implications.',
  },
  {
    id: 5,
    title: 'Gravitational Waves: A New Window',
    author: 'Dr. Alex Chen',
    date: '2023-12-20',
    tags: ['Astrophysics', 'Gravitational Waves'],
    views: 1800,
    pdfUrl: article5,
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
      {/* Protected PDF Viewer */}
{selectedArticle && (
  <ProtectedPdfViewer 
    article={selectedArticle}
    onClose={() => setSelectedArticle(null)}
  />
)}

      <Footer />
    </div>
  );
}
