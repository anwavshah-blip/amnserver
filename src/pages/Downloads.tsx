import { useState, useEffect } from 'react';
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
  CheckCircle,
  AlertCircle
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
  path: string; // Path relative to public folder
}

// File metadata - update this array when adding new files to public/downloads/
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
    path: '/downloads/Quantum_Mechanics_Handbook.pdf',
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
    path: '/downloads/Physics_Simulation_Toolkit.zip',
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
    path: '/downloads/Particle_Data_Analysis_Scripts.zip',
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
    path: '/downloads/Research_Paper_Template.docx',
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
    path: '/downloads/CERN_Visit_Photos.zip',
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
    path: '/downloads/Dark_Matter_Presentation.pptx',
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
    path: '/downloads/Nuclear_Physics_Calculator.exe',
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
    path: '/downloads/Quantum_Field_Theory_Notes.pdf',
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
    path: '/downloads/Lab_Report_Template.docx',
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
    path: '/downloads/Gravitational_Wave_Dataset.csv',
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
  const [missingFiles, setMissingFiles] = useState<number[]>([]);
  const [checkedFiles, setCheckedFiles] = useState<Set<number>>(new Set());

  // Check which files actually exist on the server
  useEffect(() => {
    const checkFiles = async () => {
      const missing: number[] = [];
      const checked = new Set<number>();

      for (const file of downloadFiles) {
        try {
          // Check if file exists with HEAD request
          const response = await fetch(file.path, { method: 'HEAD' });
          if (!response.ok) {
            missing.push(file.id);
            console.warn(`❌ Missing: ${file.name} at ${file.path}`);
          } else {
            console.log(`✅ Found: ${file.name}`);
          }
          checked.add(file.id);
        } catch (error) {
          // If fetch fails (e.g., during development), assume file exists
          console.log(`⚠️ Could not verify: ${file.name}`);
          checked.add(file.id);
        }
      }

      setMissingFiles(missing);
      setCheckedFiles(checked);
    };

    checkFiles();
  }, []);

  const filteredFiles = downloadFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || file.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (file: DownloadFile) => {
    if (missingFiles.includes(file.id)) {
      alert(`File "${file.name}" is not available on the server.`);
      return;
    }

    setDownloadingId(file.id);
    
    try {
      // Create download link - browser handles the actual download
      const a = document.createElement('a');
      a.href = file.path;
      a.download = file.name;
      a.target = '_blank'; // Fallback for browsers that don't support download attribute
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDownloadedIds(prev => [...prev, file.id]);
    } catch (error) {
      console.error('Download failed:', error);
      alert(`Failed to download ${file.name}. Please try again.`);
    } finally {
      setDownloadingId(null);
    }
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

          {/* Missing Files Warning */}
          {missingFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 glass-card p-4 border-l-4 border-yellow-500 bg-yellow-500/10"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-400">Missing Files Detected</p>
                  <p className="text-sm text-muted-foreground">
                    {missingFiles.length} file(s) not found in <code>Nepal Wild Research/</code>. 
                    Be calm, we quickly fix its.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

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
                const isMissing = missingFiles.includes(file.id);
                const isChecked = checkedFiles.has(file.id);
                
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center transition-colors ${
                      isMissing ? 'opacity-50 bg-red-500/5' : 'hover:bg-white/5'
                    }`}
                  >
                    {/* File Info */}
                    <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isMissing ? 'bg-red-500/20' : 'glass-button'
                      }`}>
                        <FileIcon className={`w-5 h-5 ${isMissing ? 'text-red-400' : getFileColor(file.type)}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate flex items-center gap-2">
                          {file.name}
                          {isMissing && (
                            <span className="text-xs text-red-400 bg-red-500/20 px-2 py-0.5 rounded">
                              Missing
                            </span>
                          )}
                          {!isChecked && !isMissing && (
                            <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded">
                              Checking...
                            </span>
                          )}
                        </p>
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
                    <div className="col-span-1 pr-2">
                      <button
                        onClick={() => handleDownload(file)}
                        disabled={isDownloading || isDownloaded || isMissing}
                        className={`w-full md:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                          isDownloaded
                            ? 'bg-green-500/20 text-green-400 cursor-default'
                            : isMissing
                            ? 'bg-red-500/20 text-red-400 cursor-not-allowed'
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
                        ) : isMissing ? (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Missing</span>
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
              All files are served from <code className="bg-white/10 px-1 rounded">Nepal Wild Research</code> and Nice.
              Files are important and originaly licence to NWR.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}