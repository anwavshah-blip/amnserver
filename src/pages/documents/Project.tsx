import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FolderOpen, 
  Calendar, 
  Tag, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight,
  X,
  Lock,
  Github,
  ExternalLink
} from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

interface Project {
  id: number;
  title: string;
  author: string;
  date: string;
  tags: string[];
  views: number;
  pdfUrl: string;
  description: string;
  status: string;
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Quantum Simulator Web Application',
    author: 'Dr. Alex Chen',
    date: '2024-01-15',
    tags: ['Quantum Computing', 'Web Development', 'React'],
    views: 3200,
    pdfUrl: '/sample.pdf',
    description: 'Interactive web-based quantum circuit simulator for educational purposes.',
    status: 'Completed',
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
  },
  {
    id: 2,
    title: 'Particle Physics Data Analysis Tool',
    author: 'Dr. Alex Chen',
    date: '2023-12-01',
    tags: ['Particle Physics', 'Python', 'Data Science'],
    views: 2100,
    pdfUrl: '/sample.pdf',
    description: 'Python-based toolkit for analyzing CERN LHC experiment data.',
    status: 'In Progress',
    githubUrl: 'https://github.com',
  },
  {
    id: 3,
    title: 'Gravitational Wave Visualization',
    author: 'Dr. Alex Chen',
    date: '2023-10-15',
    tags: ['Astrophysics', 'Visualization', 'Three.js'],
    views: 2800,
    pdfUrl: '/sample.pdf',
    description: '3D visualization of gravitational wave data from LIGO.',
    status: 'Completed',
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
  },
  {
    id: 4,
    title: 'Dark Matter Detection Dashboard',
    author: 'Dr. Alex Chen',
    date: '2023-09-01',
    tags: ['Dark Matter', 'Dashboard', 'D3.js'],
    views: 1900,
    pdfUrl: '/sample.pdf',
    description: 'Real-time monitoring dashboard for dark matter detection experiments.',
    status: 'In Progress',
    githubUrl: 'https://github.com',
  },
  {
    id: 5,
    title: 'Nuclear Reaction Calculator',
    author: 'Dr. Alex Chen',
    date: '2023-07-20',
    tags: ['Nuclear Physics', 'Calculator', 'TypeScript'],
    views: 3500,
    pdfUrl: '/sample.pdf',
    description: 'Web-based calculator for nuclear reaction equations and decay chains.',
    status: 'Completed',
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com',
  },
];

export default function Project() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
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
              <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my portfolio of physics-related software projects and applications.
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
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-input"
              />
            </div>
          </motion.div>

          {/* Projects List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card p-6 cursor-pointer group hover:scale-[1.01] transition-transform"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl glass-button flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FolderOpen className="w-7 h-7 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`tag-glass text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {project.views} views
                      </span>
                      <div className="flex gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="tag-glass text-xs">
                            <Tag className="w-3 h-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs glass-card px-3 py-1.5 hover:bg-white/5 transition-colors"
                        >
                          <Github className="w-3 h-3" />
                          GitHub
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs glass-card px-3 py-1.5 hover:bg-white/5 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Click to view docs</span>
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search query.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedProject && (
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
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-lg neu-button flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-semibold text-sm truncate max-w-[200px] sm:max-w-md">
                  {selectedProject.title} - Documentation
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
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                  <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
                  <p className="text-gray-600 mt-4">
                    Project Documentation
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    By {selectedProject.author} • {selectedProject.date}
                  </p>
                </div>
                
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mt-8 mb-4">Project Overview</h2>
                  <p className="mb-4">
                    {selectedProject.description}
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Features</h2>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Interactive user interface with real-time data visualization</li>
                    <li>Advanced algorithms for accurate calculations and predictions</li>
                    <li>Cross-platform compatibility and responsive design</li>
                    <li>Comprehensive documentation and user guides</li>
                    <li>Open-source codebase for community contributions</li>
                  </ul>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Installation</h2>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4 overflow-x-auto">
                    <code>
                      git clone https://github.com/username/{selectedProject.title.toLowerCase().replace(/\s+/g, '-')}\\n
                      cd {selectedProject.title.toLowerCase().replace(/\s+/g, '-')}\\n
                      npm install\\n
                      npm start
                    </code>
                  </pre>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Usage</h2>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">API Documentation</h2>
                  <p className="mb-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Contributing</h2>
                  <p className="mb-4">
                    We welcome contributions! Please read our contributing guidelines and submit 
                    pull requests to help improve this project.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">License</h2>
                  <p className="mb-4">
                    This project is licensed under the MIT License - see the LICENSE file for details.
                  </p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-500 text-sm">
                  <p>© 2024 {selectedProject.author}. All rights reserved.</p>
                  <p className="mt-2">This documentation is protected and cannot be downloaded or printed.</p>
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
