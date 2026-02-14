import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import project1 from '../../assets/documents/project/game1.pdf';
import ProtectedPdfViewer from '../../components/ProtectedPdfViewer';

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
    author: 'Aman Shah',
    date: '2024-01-15',
    tags: ['Quantum Computing', 'Web Development', 'React'],
    views: 3200,
    pdfUrl: project1,
    description: 'Interactive web-based quantum circuit simulator for educational purposes.',
    status: 'Completed',
    githubUrl: 'https://github.com',
    demoUrl: 'https://www.aman-sah.com.np',
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
        <ProtectedPdfViewer 
                    article={selectedProject}
                    onClose={() => setSelectedProject(null)}
        />
      )}

      <Footer />
    </div>
  );
}
