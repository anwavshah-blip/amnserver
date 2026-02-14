import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  Eye,
  ChevronRight,
  Newspaper,
  Tag,
  X,
  ZoomIn,
  ZoomOut,
  Lock
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  attachments: { name: string; size: string; url: string }[];
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Published New Paper on Quantum Entanglement',
    date: '2024-01-20',
    excerpt: 'Our latest research on quantum entanglement has been published in Nature Physics.',
    content: 'We are excited to announce that our latest research paper on quantum entanglement has been published in Nature Physics. This work represents years of collaboration with international research teams and opens new possibilities for quantum communication technologies.',
    tags: ['Publication', 'Quantum Physics'],
    attachments: [
      { name: 'Research_Paper.pdf', size: '2.4 MB', url: '#' },
      { name: 'Supplementary_Data.zip', size: '15.8 MB', url: '#' },
    ],
  },
  {
    id: 2,
    title: 'CERN Experiment Results Announced',
    date: '2024-01-15',
    excerpt: 'New particle detection results from the LHC experiments show promising findings.',
    content: 'The latest results from our CERN collaboration have revealed interesting patterns in particle collision data. These findings could potentially lead to new discoveries in the field of particle physics.',
    tags: ['CERN', 'Research'],
    attachments: [
      { name: 'Experiment_Results.pdf', size: '5.2 MB', url: '#' },
    ],
  },
  {
    id: 3,
    title: 'Speaking at International Physics Conference',
    date: '2024-01-10',
    excerpt: 'I will be presenting our latest findings at the International Physics Conference.',
    content: 'I am honored to be invited as a keynote speaker at the International Physics Conference in Geneva. I will be presenting our recent work on dark matter detection methods and their implications for future experiments.',
    tags: ['Conference', 'Speaking'],
    attachments: [
      { name: 'Presentation_Slides.pptx', size: '12.5 MB', url: '#' },
      { name: 'Conference_Program.pdf', size: '1.8 MB', url: '#' },
    ],
  },
  {
    id: 4,
    title: 'New Grant Awarded for Quantum Computing Research',
    date: '2024-01-05',
    excerpt: 'We have received a major grant to continue our quantum computing research.',
    content: 'We are thrilled to announce that our research group has been awarded a $2.5 million grant from the National Science Foundation to continue our work on quantum computing applications in physics simulations.',
    tags: ['Funding', 'Quantum Computing'],
    attachments: [
      { name: 'Grant_Proposal.pdf', size: '3.1 MB', url: '#' },
    ],
  },
  {
    id: 5,
    title: 'Open Source Physics Simulator Released',
    date: '2023-12-28',
    excerpt: 'Our new open-source physics simulation tool is now available on GitHub.',
    content: 'After months of development, we are excited to release our open-source physics simulation tool. This project aims to make physics simulations accessible to students and researchers worldwide.',
    tags: ['Open Source', 'Software'],
    attachments: [
      { name: 'User_Manual.pdf', size: '4.5 MB', url: '#' },
      { name: 'Release_Notes.txt', size: '12 KB', url: '#' },
    ],
  },
  {
    id: 6,
    title: 'Collaboration with European Research Institute',
    date: '2023-12-20',
    excerpt: 'New international collaboration announced for dark matter research.',
    content: 'We are pleased to announce a new collaboration with the European Research Institute for Dark Matter Studies. This partnership will combine our expertise in detection methods with their advanced simulation capabilities.',
    tags: ['Collaboration', 'Dark Matter'],
    attachments: [
      { name: 'MOU.pdf', size: '1.2 MB', url: '#' },
    ],
  },
];

export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedAttachment, setSelectedAttachment] = useState<{ name: string; size: string } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  const filteredNews = newsItems.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
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
              Latest <span className="gradient-text">News</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest announcements, publications, and project updates.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-input"
              />
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line transform md:-translate-x-1/2" />
            
            {/* News Items */}
            <div className="space-y-8">
              {filteredNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-start md:items-center gap-4 md:gap-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10" />
                  
                  {/* Date (Desktop) */}
                  <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="flex items-center gap-2 justify-end">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{news.date}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="ml-12 md:ml-0 w-full md:w-1/2">
                    <div 
                      onClick={() => setSelectedNews(news)}
                      className="glass-card p-6 cursor-pointer group hover:scale-[1.02] transition-transform"
                    >
                      {/* Mobile Date */}
                      <div className="flex items-center gap-2 md:hidden mb-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{news.date}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {news.tags.map(tag => (
                          <span key={tag} className="tag-glass text-xs">
                            <Tag className="w-3 h-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4">
                        {news.excerpt}
                      </p>
                      
                      {news.attachments.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <FileText className="w-4 h-4" />
                          {news.attachments.length} attachment{news.attachments.length > 1 ? 's' : ''}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                        <span>Read more</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredNews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No news found</h3>
              <p className="text-muted-foreground">Try adjusting your search query.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-primary" />
                  <span className="font-medium">News Detail</span>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="w-8 h-8 rounded-lg neu-button flex items-center justify-center hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedNews.tags.map(tag => (
                    <span key={tag} className="tag-glass">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold mb-4">{selectedNews.title}</h2>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedNews.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    3 min read
                  </span>
                </div>
                
                <div className="prose max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedNews.content}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                
                {/* Attachments */}
                {selectedNews.attachments.length > 0 && (
                  <div className="glass-card p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Attachments
                    </h3>
                    <div className="space-y-2">
                      {selectedNews.attachments.map((attachment, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedAttachment(attachment)}
                          className="flex items-center justify-between p-3 glass-card hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium text-sm">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-lg glass-button flex items-center justify-center">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-lg glass-button flex items-center justify-center">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attachment Viewer Modal */}
      <AnimatePresence>
        {selectedAttachment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
          >
            {/* Toolbar */}
            <div className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedAttachment(null)}
                  className="w-10 h-10 rounded-lg neu-button flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="font-semibold text-sm">{selectedAttachment.name}</h3>
                  <p className="text-xs text-muted-foreground">{zoomLevel}%</p>
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
            
            {/* Document Content */}
            <div className="h-[calc(100vh-64px)] overflow-auto bg-[#1a1a1a] flex items-center justify-center p-8">
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
                  <h1 className="text-2xl font-bold mb-4">{selectedAttachment.name}</h1>
                  <p className="text-gray-600 mb-8">File Size: {selectedAttachment.size}</p>
                  
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      This is a preview of the attached document. The actual content would be displayed here 
                      when connected to a real document storage system.
                    </p>
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-500 text-sm">
                    <p>This document is protected and cannot be downloaded or printed.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
