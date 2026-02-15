import { useState } from 'react';
import { motion } from 'framer-motion';
import journal1 from '../../assets/documents/journal/Hilly region Report.pdf';
import ProtectedPdfViewer from '../../components/ProtectedPdfViewer';

import { 
  Search, 
  BookOpen, 
  Calendar, 
  Tag, 
  Eye,  
  ChevronRight
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Journal {
  id: number;
  title: string;
  author: string;
  date: string;
  tags: string[];
  views: number;
  pdfUrl: string;
  description: string;
  volume: string;
}

const journals: Journal[] = [
  {
    id: 1,
    title: 'Quantum Field Theory Applications in Condensed Matter',
    author: 'Dr. Alex Chen',
    date: '2024-01-20',
    tags: ['Quantum Field Theory', 'Condensed Matter'],
    views: 890,
    pdfUrl: journal1,
    description: 'Published in Journal of Theoretical Physics, exploring QFT applications.',
    volume: 'Vol. 45, Issue 3',
  },
  {
    id: 2,
    title: 'Novel Approaches to Dark Matter Detection',
    author: 'Dr. Alex Chen',
    date: '2023-12-15',
    tags: ['Dark Matter', 'Experimental Physics'],
    views: 1200,
    pdfUrl: '/sample.pdf',
    description: 'Peer-reviewed article on innovative dark matter detection techniques.',
    volume: 'Vol. 28, Issue 7',
  },
  {
    id: 3,
    title: 'Machine Learning for Particle Identification',
    author: 'Dr. Alex Chen',
    date: '2023-11-10',
    tags: ['Machine Learning', 'Particle Physics'],
    views: 1500,
    pdfUrl: '/sample.pdf',
    description: 'Application of neural networks in particle physics experiments.',
    volume: 'Vol. 33, Issue 12',
  },
  {
    id: 4,
    title: 'Gravitational Wave Signal Processing',
    author: 'Dr. Alex Chen',
    date: '2023-10-05',
    tags: ['Gravitational Waves', 'Signal Processing'],
    views: 980,
    pdfUrl: '/sample.pdf',
    description: 'Advanced signal processing techniques for LIGO data analysis.',
    volume: 'Vol. 19, Issue 4',
  },
  {
    id: 5,
    title: 'Topological Insulators: A Review',
    author: 'Dr. Alex Chen',
    date: '2023-09-01',
    tags: ['Condensed Matter', 'Topology'],
    views: 2100,
    pdfUrl: '/sample.pdf',
    description: 'Comprehensive review of topological insulator materials and properties.',
    volume: 'Vol. 52, Issue 8',
  },
];

export default function Journal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <span className="gradient-text">Journals</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Peer-reviewed journal publications and academic research papers.
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
                placeholder="Search journals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-input"
              />
            </div>
          </motion.div>

          {/* Journals List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredJournals.map((journal, index) => (
              <motion.div
                key={journal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                onClick={() => setSelectedJournal(journal)}
                className="glass-card p-6 cursor-pointer group hover:scale-[1.01] transition-transform"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl glass-button flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="tag-glass text-xs">{journal.volume}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {journal.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {journal.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {journal.date}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {journal.views} views
                      </span>
                      <div className="flex gap-2">
                        {journal.tags.map(tag => (
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
          {filteredJournals.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No journals found</h3>
              <p className="text-muted-foreground">Try adjusting your search query.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedJournal && (
        <ProtectedPdfViewer 
                    article={selectedJournal}
                    onClose={() => setSelectedJournal(null)}
        />
      )}

      <Footer />
    </div>
  );
}
