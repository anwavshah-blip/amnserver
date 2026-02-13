import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  FileText, 
  FileCode, 
  FileArchive,
  File,
  Calendar,
  HardDrive,
  Filter,
  CheckCircle
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface DownloadFile {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  description: string;
  downloads: number;
  category: string;
}

const downloadFiles: DownloadFile[] = [
  {
    id: 1,
    name: 'Quantum_Mechanics_Handbook.pdf',
    type: 'pdf',
    size: '15.2 MB',
    date: '2024-01-15',
    description: 'Comprehensive handbook covering quantum mechanics fundamentals and applications.',
    downloads: 1250,
    category: 'Educational',
  },
  {
    id: 2,
    name: 'Physics_Simulation_Toolkit.zip',
    type: 'zip',
    size: '45.8 MB',
    date: '2024-01-10',
    description: 'Python-based physics simulation toolkit with examples and documentation.',
    downloads: 890,
    category: 'Software',
  },
  {
    id: 3,
    name: 'Particle_Data_Analysis_Scripts.zip',
    type: 'zip',
    size: '12.5 MB',
    date: '2024-01-05',
    description: 'Collection of scripts for analyzing particle physics experimental data.',
    downloads: 650,
    category: 'Software',
  },
  {
    id: 4,
    name: 'Research_Paper_Template.docx',
    type: 'doc',
    size: '2.1 MB',
    date: '2023-12-28',
    description: 'Professional template for writing physics research papers.',
    downloads: 2100,
    category: 'Templates',
  },
  {
    id: 5,
    name: 'CERN_Visit_Photos.zip',
    type: 'zip',
    size: '128.6 MB',
    date: '2023-12-20',
    description: 'High-resolution photos from the CERN facility visit.',
    downloads: 450,
    category: 'Media',
  },
  {
    id: 6,
    name: 'Dark_Matter_Presentation.pptx',
    type: 'ppt',
    size: '18.3 MB',
    date: '2023-12-15',
    description: 'Presentation slides on dark matter detection methods and research.',
    downloads: 780,
    category: 'Presentations',
  },
  {
    id: 7,
    name: 'Nuclear_Physics_Calculator.exe',
    type: 'exe',
    size: '8.7 MB',
    date: '2023-12-10',
    description: 'Windows application for nuclear physics calculations.',
    downloads: 920,
    category: 'Software',
  },
  {
    id: 8,
    name: 'Quantum_Field_Theory_Notes.pdf',
    type: 'pdf',
    size: '22.4 MB',
    date: '2023-12-05',
    description: 'Detailed lecture notes on quantum field theory.',
    downloads: 1500,
    category: 'Educational',
  },
  {
    id: 9,
    name: 'Lab_Report_Template.docx',
    type: 'doc',
    size: '1.5 MB',
    date: '2023-11-28',
    description: 'Standardized template for physics laboratory reports.',
    downloads: 1800,
    category: 'Templates',
  },
  {
    id: 10,
    name: 'Gravitational_Wave_Dataset.csv',
    type: 'csv',
    size: '156.2 MB',
    date: '2023-11-20',
    description: 'Sample dataset from LIGO gravitational wave detection.',
    downloads: 320,
    category: 'Data',
  },
];

const categories = ['All', 'Software', 'Educational', 'Templates', 'Media', 'Presentations', 'Data'];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return FileText;
    case 'zip': return FileArchive;
    case 'doc': return FileText;
    case 'ppt': return FileText;
    case 'exe': return FileCode;
    case 'csv': return FileCode;
    default: return File;
  }
};

const getFileColor = (type: string) => {
  switch (type) {
    case 'pdf': return 'text-red-400';
    case 'zip': return 'text-yellow-400';
    case 'doc': return 'text-blue-400';
    case 'ppt': return 'text-orange-400';
    case 'exe': return 'text-green-400';
    case 'csv': return 'text-cyan-400';
    default: return 'text-gray-400';
  }
};

export default function Downloads() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<number[]>([]);

  const filteredFiles = downloadFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || file.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (file: DownloadFile) => {
    setDownloadingId(file.id);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDownloadingId(null);
    setDownloadedIds(prev => [...prev, file.id]);
    
    // Create and trigger download
    const blob = new Blob(['This is a sample file content for ' + file.name], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const totalSize = downloadFiles.reduce((acc, file) => {
    const size = parseFloat(file.size);
    const unit = file.size.includes('GB') ? 1024 : 1;
    return acc + size * unit;
  }, 0);

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
              <span className="gradient-text">Downloads</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access resources, software, templates, and educational materials for your learning journey.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{downloadFiles.length}</div>
              <div className="text-sm text-muted-foreground">Total Files</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{totalSize.toFixed(1)} MB</div>
              <div className="text-sm text-muted-foreground">Total Size</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text">
                {downloadFiles.reduce((acc, f) => acc + f.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-input"
              />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category
                      ? 'glass-button'
                      : 'glass-card hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Files List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card overflow-hidden"
          >
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-white/5 font-medium text-sm">
              <div className="col-span-5">File Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Action</div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-border/50">
              {filteredFiles.map((file, index) => {
                const FileIcon = getFileIcon(file.type);
                const isDownloading = downloadingId === file.id;
                const isDownloaded = downloadedIds.includes(file.id);
                
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors"
                  >
                    {/* File Info */}
                    <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg glass-button flex items-center justify-center flex-shrink-0">
                        <FileIcon className={`w-5 h-5 ${getFileColor(file.type)}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground truncate md:hidden">{file.description}</p>
                        <p className="text-xs text-muted-foreground hidden md:block">{file.description}</p>
                      </div>
                    </div>
                    
                    {/* Category */}
                    <div className="col-span-1 md:col-span-2">
                      <span className="tag-glass text-xs">{file.category}</span>
                    </div>
                    
                    {/* Size */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <HardDrive className="w-4 h-4 md:hidden" />
                      <span>{file.size}</span>
                    </div>
                    
                    {/* Date */}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 md:hidden" />
                      <span>{file.date}</span>
                    </div>
                    
                    {/* Action */}
                    <div className="col-span-1">
                      <button
                        onClick={() => handleDownload(file)}
                        disabled={isDownloading || isDownloaded}
                        className={`w-full md:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                          isDownloaded
                            ? 'bg-green-500/20 text-green-400 cursor-default'
                            : isDownloading
                            ? 'glass-card cursor-wait'
                            : 'glass-button hover:scale-105'
                        }`}
                      >
                        {isDownloaded ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Done</span>
                          </>
                        ) : isDownloading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="hidden sm:inline">...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Empty State */}
          {filteredFiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <File className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No files found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter.</p>
            </motion.div>
          )}

          {/* Download Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 glass-card p-6"
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-primary" />
              Download Information
            </h3>
            <p className="text-sm text-muted-foreground">
              All files are downloaded to your default downloads folder. Please ensure you have 
              sufficient disk space before downloading large files. For software downloads, make sure 
              to check system requirements before installation.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
