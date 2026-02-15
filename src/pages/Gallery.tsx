import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Info, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import gal1 from '../assets/gallery/particle accelerator.jpg';
import gal2 from '../assets/gallery/spiny-babler-bird-pic.jpg';
import gal3 from '../assets/gallery/red_panda_names_web_2.webp';
import gal4 from '../assets/gallery/snow leopard.webp';
import gal5 from '../assets/gallery/IMG_20230616_132509.jpg';
import gal6 from '../assets/gallery/IMG_20220903_160402.jpg';
import gal7 from '../assets/gallery/IMG_20221124_144442.jpg';
import gal8 from '../assets/gallery/IMG_14299.jpg';
import gal9 from '../assets/gallery/IMG_20220903_163249.jpg';
import gal10 from '../assets/gallery/IMG_14333.jpg';
import gal11 from '../assets/gallery/IMG_20181105_103040.jpg';
import gal12 from '../assets/gallery/Sunakhari.webp';
import gal13 from '../assets/gallery/IMG_13355.jpg';
import gal14 from '../assets/gallery/English-yew.webp';

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
    image: gal1,
    location: 'Geneva, Switzerland',
    date: 'March 2023',
    purpose: 'Research Visit',
    description: 'Visiting the Large Hadron Collider at CERN to study particle physics experiments and data collection methods.',
    category: 'Research',
  },
  {
    id: 2,
    title: 'Spiny Babbler(काँडे भ्याकुर)',
    image: gal2,
    location: 'Kathmandu, Bhaktapur, Lalitpur',
    date: 'June 2023',
    purpose: 'Endemic Species',
    description: 'The spiny babbler has a distinctive vocal repertoire — ranging from scratchy notes to varied warbles and mimic‑like calls.',
    category: 'Research',
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
    title: 'Habre (Red Panda)',
    image: gal3,
    location: 'Langtang National Park, Makalu Barun National Park, Rara National Park, & Kanchenjunga Conservation Area',
    date: 'November 2023',
    purpose: 'Endangered Animal',
    description: 'Red panda is a small mammal native to the eastern Himalayas and southwestern China. It has dense reddish-brown fur with a black belly and legs, white-lined ears, a mostly white muzzle and a ringed tail. Habitat loss due to deforestation, livestock grazing, and human encroachment, as well as poaching and climate change.',
    category: 'Research',
  },
  {
    id: 7,
    title: 'Hiun Chituwa (Snow Leopard)',
    image: gal4,
    location: 'Shey Phoksumdo National Park, Annapurna Conservation Area, & Kangchenjunga Conservation Area',
    date: 'April 2026',
    purpose: 'Endangered snow leopards',
    description: 'Nepal is home to an estimated 397 snow leopards, representing approximately 10–12% of the global population. Known as the "ghost of the mountains," these elusive predators inhabit the high-altitude Himalayan regions across a potential habitat of over 30,000 km².',
    category: 'Research',
  },
  {
    id: 8,
    title: 'Pratical Lab',
    image: gal5,
    location: 'Kalanki, Kathmandu',
    date: 'January 2023',
    purpose: 'Chemestry Lab',
    description: 'Chemistry lab',
    category: 'Technology',
  },
  {
    id: 9,
    title: 'Pashupati Aryaghat',
    image: gal6,
    location: 'Bank of Bgmati River',
    date: 'June 2022',
    purpose: 'Explorer',
    description: 'Pashupati Aryaghat is a prominent cremation site located along the Bagmati River in Kathmandu, Nepal. It is situated near the Pashupatinath Temple.',
    category: 'Research',
  },
  {
    id: 10,
    title: 'Pelton Turbine',
    image: gal7,
    location: 'Dhulikhel, Kathmandu',
    date: 'August 2022',
    purpose: 'Observation',
    description: 'Pelton wheels Turbine, which are impulse-type water turbines, are widely used in Nepal for hydropower generation due to the country geography providing high water heads and low flow rates.',
    category: 'Development',
  },
  {
    id: 11,
    title: 'Geology Camp',
    image: gal8,
    location: 'Malekhu',
    date: '2023',
    purpose: 'Fild Visit and Survey',
    description: 'Conducting fieldwork involving geological mapping, rock/soil identification,, mass movement observation, retaining structure analysis, and route mapping.',
    category: 'Development',
  },
  {
    id: 12,
    title: 'Pasupatinath Temple',
    image: gal9,
    location: 'Banks of the sacred Bagmati River, Kathmandu',
    date: 'September 2023',
    purpose: 'Visiting',
    description: 'Pashupatinath Temple is a 5th-century, UNESCO-listed Hindu temple in Kathmandu, Nepal, dedicated to Lord Shiva as the "Lord of Animals." Situated on the Bagmati River bank, it features a gold-plated, pagoda-style roof, a unique four-faced Lingam, and is a major site for cremation (Arya Ghat).',
    category: 'Education',
  },
  {
    id: 13,
    title: 'Geology Tour',
    image: gal10,
    location: 'Trisuli River',
    date: 'November 2023',
    purpose: 'Survey',
    description: 'Conducting fieldwork involving geological mapping, rock/soil identification,, mass movement observation, retaining structure analysis, and route mapping.',
    category: 'Research',
  },
  {
    id: 14,
    title: 'Award',
    image: gal11,
    location: 'Janakpur',
    date: 'April 2018',
    purpose: 'Technology',
    description: 'Creating interactive 3D visualizations of complex physics concepts for students.',
    category: 'Technology',
  },
  {
    id: 15,
    title: 'Sunakhari (Orchids)',
    image: gal12,
    location: 'Annapurna Conservation Area, Phulchoki Hill and Godavari Botanical Garden',
    date: 'January 2024',
    purpose: 'Rare & Endemic',
    description: 'There are 324 species of endemic flowering plants in Nepal. Among them, 20 are orchids. Popular species include Dendrobium densiflorum (Sungava), Coelogyne cristata (Chandigava), and Cypripedium himalaicum. Endemic Species are unique to the region, such as Bulbophyllum ambrosia and Pleione coronaria.',
    category: 'Research',
  },
  {
    id: 16,
    title: 'Gelology Camp',
    image: gal13,
    location: 'Mlekhu, Dhading district',
    date: 'December 2024',
    purpose: 'Education',
    description: 'These camp involve mapping, interpreting geological history, and studying rock formations. We focus on field-based studies to analyze mass movement, calculate Rock Mass Rating (RMR) values, examine retaining structures, and conduct route map surveys',
    category: 'Education',
  },
  {
    id: 14,
    title: 'Himalayan yew (Taxus wallichiana)',
    image: gal14,
    location: 'Taplejung, Baglung, Panchthar, Tehrathum, Humla, Jumla, Dolpa, and Mugu',
    date: 'January 2024',
    purpose: 'Endangered',
    description: 'In Nepal this species is commonly known as Loth salla or variants of salla (yew) in Nepali. The Himalayan yew occurs in temperate forests at high elevations — typically from about 2200 m to 3400 m above sea level.The bark and leaves contain taxol (paclitaxel), an important anti-cancer compound used in chemotherapy to treat: Breast cancer, Ovarian cancer & Lung cancer.',
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
