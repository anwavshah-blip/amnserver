import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const features = [
  {
    icon: '/assets/images/Spiny-Babbler-Kande-Vyakur.jpg',
    title: 'Kande Bhyakur',
    description: 'Shy, elusive, and ground-dwelling bird, usually detected by its loud, melodious, and thrush-like song.',
  },
  {
    icon: Zap,
    title: 'Siddhartha Gautama Buddha',
    description: 'It is better to travel well than to arrive.',
  },
  {
    icon: Globe,
    title: 'Quantum Tunneling',
    description: 'Particles can sometimes pass directly through solid barriers.',
  },
];

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '100+', label: 'Articles' },
  { value: '5+', label: 'Years Experience' },
  { value: '1000+', label: 'Downloads' },
];

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="section-container relative z-10 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                Together for Nature, Together for Nepal
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Aman Shah</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="text-xl sm:text-2xl text-muted-foreground mb-8"
            >
              Physicist | Engineer | Researcher
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10"
            >
              Exploring our wilderness, we reveal the wonders of Nepal’s wildlife. Learn, engage, and become a guardian of nature.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/about"
                className="group px-8 py-4 glass-button text-lg font-medium flex items-center gap-2"
              >
                Explore My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/physics"
                className="px-8 py-4 neu-button text-lg font-medium"
              >
                Physics Concepts
              </Link>
            </motion.div>
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0], y: [0, 12] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What You'll <span className="gradient-text">Discover</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A collection of physics concepts, personal projects, and creative works 
              presented through a modern, interactive interface.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 group"
              >
                <div className="w-14 h-14 rounded-xl glass-button flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-24">
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-10 sm:p-16 text-center relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to <span className="gradient-text">Explore?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Dive into the world of physics, browse through my gallery, or download 
                resources for your own learning journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/gallery"
                  className="px-8 py-4 glass-button text-lg font-medium"
                >
                  View Gallery
                </Link>
                <Link
                  to="/downloads"
                  className="px-8 py-4 neu-button text-lg font-medium"
                >
                  Download Resources
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
