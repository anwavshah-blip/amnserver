import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Atom, ArrowRight, BookOpen, Calculator, FlaskConical, Orbit, Waves, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface PhysicsTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const physicsTopics: PhysicsTopic[] = [
  {
    id: 'quantum-mechanics',
    title: 'Quantum Mechanics',
    description: 'Explore the fundamental theory describing nature at the smallest scales of energy levels of atoms and subatomic particles.',
    icon: Atom,
    category: 'Quantum Physics',
    difficulty: 'Advanced',
  },
  {
    id: 'relativity',
    title: 'Theory of Relativity',
    description: 'Einstein\'s theories of special and general relativity, describing the relationship between space, time, and gravity.',
    icon: Orbit,
    category: 'Classical Physics',
    difficulty: 'Advanced',
  },
  {
    id: 'thermodynamics',
    title: 'Thermodynamics',
    description: 'Study of heat, work, temperature, and energy, including the four laws that govern energy transfer.',
    icon: FlaskConical,
    category: 'Classical Physics',
    difficulty: 'Intermediate',
  },
  {
    id: 'electromagnetism',
    title: 'Electromagnetism',
    description: 'Understanding the interactions between electric and magnetic fields, Maxwell\'s equations, and electromagnetic waves.',
    icon: Zap,
    category: 'Classical Physics',
    difficulty: 'Intermediate',
  },
  {
    id: 'particle-physics',
    title: 'Particle Physics',
    description: 'Study of fundamental particles and their interactions, including the Standard Model of particle physics.',
    icon: Atom,
    category: 'Quantum Physics',
    difficulty: 'Advanced',
  },
  {
    id: 'wave-mechanics',
    title: 'Wave Mechanics',
    description: 'Analysis of wave phenomena, including mechanical waves, electromagnetic waves, and quantum wave functions.',
    icon: Waves,
    category: 'Classical Physics',
    difficulty: 'Intermediate',
  },
  {
    id: 'nuclear-physics',
    title: 'Nuclear Physics',
    description: 'Study of atomic nuclei, nuclear reactions, radioactivity, and applications in energy and medicine.',
    icon: Atom,
    category: 'Quantum Physics',
    difficulty: 'Advanced',
  },
  {
    id: 'computational-physics',
    title: 'Computational Physics',
    description: 'Using numerical methods and computer simulations to solve complex physics problems.',
    icon: Calculator,
    category: 'Applied Physics',
    difficulty: 'Intermediate',
  },
  {
    id: 'astrophysics',
    title: 'Astrophysics',
    description: 'Application of physics principles to understand celestial objects and the universe as a whole.',
    icon: Orbit,
    category: 'Applied Physics',
    difficulty: 'Advanced',
  },
];

const categories = ['All', 'Quantum Physics', 'Classical Physics', 'Applied Physics'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Physics() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');

  const filteredTopics = physicsTopics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || topic.category === activeCategory;
    const matchesDifficulty = activeDifficulty === 'All' || topic.difficulty === activeDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
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
              Physics <span className="gradient-text">Concepts</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the fundamental laws of the universe through interactive content 
              and detailed explanations of key physics concepts.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search physics topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-input text-lg"
              />
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground py-2">Category:</span>
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
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground py-2">Difficulty:</span>
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setActiveDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeDifficulty === difficulty
                      ? 'glass-button'
                      : 'glass-card hover:bg-white/5'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground">
              Showing {filteredTopics.length} of {physicsTopics.length} topics
            </p>
          </motion.div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link to={`/physics/${topic.id}`}>
                  <div className="glass-card p-6 h-full group hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl glass-button flex items-center justify-center group-hover:scale-110 transition-transform">
                        <topic.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(topic.difficulty)}`}>
                        {topic.difficulty}
                      </span>
                    </div>
                    
                    <span className="tag-glass text-xs mb-2 inline-block">{topic.category}</span>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {topic.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary text-sm font-medium">
                      <BookOpen className="w-4 h-4" />
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTopics.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No topics found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
