import { useState } from 'react';
import { motion } from 'framer-motion';
import report1 from '../../assets/documents/report/Hilly region Report.pdf';
import ProtectedPdfViewer from '../../components/ProtectedPdfViewer';

import { 
  Search, 
  FileBarChart, 
  Calendar, 
  Tag, 
  Eye,  
  ChevronRight
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
    title: 'Hilly Region Research Report 2026',
    author: 'Aman Shah',
    date: '2023-12-31',
    tags: ['Annual', 'Research'],
    views: 3200,
    pdfUrl: report1,
    description: 'Comprehensive overview of research activities and findings throughout 2026.',
    type: 'Annual Report',
  },
  {
    id: 2,
    title: 'CERN Experiment Analysis Report',
    author: 'Aman Shah',
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
    author: 'Aman Shah',
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
    author: 'Aman Shah',
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
    author: 'Aman Shah',
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
  

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
        <ProtectedPdfViewer 
            article={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
      )}

      <Footer />
    </div>
  );
}
