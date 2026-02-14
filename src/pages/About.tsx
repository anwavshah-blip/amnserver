import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase,
  Award,
  Code,
  Palette,
  Database,
  Globe,
  Cpu
} from 'lucide-react';
import profilePhoto from '../assets/images/profile.jpeg';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const personalInfo = [
  { icon: Calendar, label: 'Date of Birth', value: 'Shrawan 07, 2060' },
  { icon: MapPin, label: 'Address', value: 'Syuchatar, Kirtipur, Kathmandu' },
  { icon: Mail, label: 'Email', value: 'amangrown@outlook.com' },
  { icon: Phone, label: 'Phone', value: '+977-9864164617' },
];

const education = [
  {
    degree: '+2',
    institution: 'MIT',
    year: '2077 - 2079',
    description: 'Physical Group- Mathematics, Physic and Computer',
  },
  {
    degree: 'B.E in Civil Engineering',
    institution: 'Advance College Of Engineering and Management',
    year: '2079 - Current',
    description: 'Currently Pursuing',
  },
  {
    degree: 'B.S. in Physics',
    institution: 'Caltech',
    year: '2012 - 2016',
    description: 'Minor in Mathematics, Graduated with Honors',
  },
];

const experience = [
  {
    title: 'Calculus',
    company: 'Mathematics',
    period: '2020 - Present',
    description: 'Working projects in *** physics and developing computational models for data analysis.',
  },
  {
    title: 'Rain Water Harvesting',
    company: 'Hydro',
    period: '2025 - present',
    description: 'Working in to collects data, information and analysing.',
  },
  {
    title: 'K-Os',
    company: 'ANBHAE Lab',
    period: '2018 - Present',
    description: 'Working till',
  },
];

const skills = [
  { name: 'Travel & Explorer', level: 10, icon: Code },
  { name: 'Python & C++', level: 90, icon: Database },
  { name: 'GUI/UX Design', level: 85, icon: Palette },
  { name: 'Sketch & CAD', level: 88, icon: Cpu },
  { name: 'Playing Chess', level: 20, icon: Globe },
  { name: 'Physics Simulation', level: 72, icon: Award },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', color: 'hover:text-gray-400' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shree-aman-shah', color: 'hover:text-blue-500' },
  { name: 'Twitter', url: 'https://twitter.com', color: 'hover:text-sky-400' },
  { name: 'ResearchGate', url: 'https://researchgate.net', color: 'hover:text-green-500' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bridging the gap between theoretical physics and practical engineering.
            </p>
          </motion.div>
          
          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-card p-8 text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 animate-pulse-glow" />
                  <div className="absolute inset-1 rounded-full bg-background" />
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rounded-full object-cover"
                  />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">Aman Shah</h2>
                <p className="text-primary font-medium mb-4">
                  Physicist & Engineer
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1.5 rounded-lg glass-button text-sm ${link.color} transition-colors`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                
                <a
                  href="mailto:amangrown@outlook.com"
                  className="w-full py-3 glass-button font-medium"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
            
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8 h-full">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {personalInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg glass-button flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Bio</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I am Aman Shah, a civil engineering student driven by an insatiable curiosity for the intersection of science, nature, and practical innovation. My academic journey is fueled by a deep passion for physics and research. My passion are always driven me to explore the unknown and dive deep into the fundamental workings of the universe. I'm especially fascinated by quantum physics, the laws of space and the cosmos, and the scientific theories that explain them.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I thrive on practical application projects that bridge theoretical science with real-world engineering solutions. Whether I'm coding complex systems, designing sustainable infrastructure, or studying celestial mechanics, I approach every challenge with analytical rigor and creative problem-solving.
                  My mission is to contribute meaningfully to environmental conservation, scientific advancement, and innovative engineering—building a future where technology and nature coexist sustainably.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-10">
              My <span className="gradient-text">Skills</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg glass-button flex items-center justify-center">
                      <skill.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                    />
                  </div>
                  <div className="mt-2 text-right text-sm text-muted-foreground">
                    {skill.level}%
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Education & Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-primary" />
                Education
              </h2>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-violet-500" />
                    
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="tag-glass">{edu.year}</span>
                      <span className="text-sm text-muted-foreground">{edu.institution}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                Experience
              </h2>
              
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-cyan-500" />
                    
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="tag-glass">{exp.period}</span>
                      <span className="text-sm text-muted-foreground">{exp.company}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
