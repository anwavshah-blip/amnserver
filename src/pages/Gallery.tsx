import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Info, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  location: string;
  date: string;
  purpose: string;
  description: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'CERN Particle Accelerator',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    location: 'Geneva, Switzerland',
    date: 'March 2023',
    purpose: 'Research Visit',
    description: 'Visiting the Large Hadron Collider at CERN to study particle physics experiments and data collection methods.',
    category: 'Research',
  },
  {
    id: 2,
    title: 'Quantum Computing Lab',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    location: 'MIT, Cambridge',
    date: 'June 2023',
    purpose: 'Collaboration',
    description: 'Working with quantum computing researchers to develop new algorithms for physics simulations.',
    category: 'Technology',
  },
  {
    id: 3,
    title: 'Astrophotography Session',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop',
    location: 'Mauna Kea, Hawaii',
    date: 'August 2023',
    purpose: 'Observation',
    description: 'Capturing deep space images using professional telescopes for educational content.',
    category: 'Astronomy',
  },
  {
    id: 4,
    title: 'Coding Workspace Setup',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    location: 'Home Office',
    date: 'Ongoing',
    purpose: 'Development',
    description: 'My personal development environment where I build physics simulations and web applications.',
    category: 'Development',
  },
  {
    id: 5,
    title: 'Physics Conference 2023',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&h=600&fit=crop',
    location: 'Berlin, Germany',
    date: 'September 2023',
    purpose: 'Presentation',
    description: 'Presenting research findings on quantum field theory at the International Physics Conference.',
    category: 'Conference',
  },
  {
    id: 6,
    title: 'Particle Detector Assembly',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&h=600&fit=crop',
    location: 'Fermilab, USA',
    date: 'November 2023',
    purpose: 'Experiment',
    description: 'Assisting in the assembly and calibration of particle detection equipment.',
    category: 'Research',
  },
  {
    id: 7,
    title: '3D Physics Visualization',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&h=600&fit=crop',
    location: 'Virtual',
    date: 'December 2023',
    purpose: 'Education',
    description: 'Creating interactive 3D visualizations of complex physics concepts for students.',
    category: 'Education',
  },
  {
    id: 8,
    title: 'Dark Matter Research',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop',
    location: 'Underground Lab',
    date: 'January 2024',
    purpose: 'Research',
    description: 'Working in an underground laboratory to minimize background radiation for dark matter detection.',
    category: 'Research',
  },
];

const categories = ['All', 'Research', 'Technology', 'Astronomy', 'Development', 'Conference', 'Education'];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

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
              Visual <span className="gradient-text">Journey</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of moments from my research, travels, and projects in the world of physics and technology.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'glass-button'
                    : 'glass-card hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer"
                >
                  <div className="glass-card overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white">
                          <span className="tag-glass text-xs mb-2 inline-block">{item.category}</span>
                          <h3 className="font-semibold text-sm">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 truncate">{item.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="glass-card max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <span className="tag-glass">{selectedItem.category}</span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-lg neu-button flex items-center justify-center hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="aspect-video relative">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 glass-card p-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{selectedItem.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 glass-card p-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="text-sm font-medium">{selectedItem.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 glass-card p-3">
                      <Info className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Purpose</p>
                        <p className="text-sm font-medium">{selectedItem.purpose}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 text-primary" />
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-6 py-2 glass-button flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
