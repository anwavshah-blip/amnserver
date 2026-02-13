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
import profilePhoto from '../assets/images/profile1.jpeg';
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
    Grade: '+2',
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
    title: 'Senior Research Scientist',
    company: 'CERN',
    period: '2022 - Present',
    description: 'Leading research projects in particle physics and developing computational models for data analysis.',
  },
  {
    title: 'Software Engineer',
    company: 'Google Research',
    period: '2020 - 2022',
    description: 'Developed machine learning algorithms for scientific applications and data visualization tools.',
  },
  {
    title: 'Research Assistant',
    company: 'MIT Physics Lab',
    period: '2018 - 2020',
    description: 'Assisted in quantum computing research and published 5 papers in peer-reviewed journals.',
  },
];

const skills = [
  { name: 'React & TypeScript', level: 95, icon: Code },
  { name: 'Python & Data Science', level: 90, icon: Database },
  { name: 'UI/UX Design', level: 85, icon: Palette },
  { name: 'Quantum Computing', level: 88, icon: Cpu },
  { name: 'Machine Learning', level: 82, icon: Globe },
  { name: 'Physics Simulation', level: 92, icon: Award },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', color: 'hover:text-gray-400' },
  { name: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-500' },
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
                  I am a passionate physicist and software developer with over 5 years of experience 
                  in both academic research and industry applications. My journey began with a fascination 
                  for understanding the fundamental laws of the universe, which eventually led me to 
                  explore the world of computational physics and software development.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Currently, I work at CERN where I contribute to cutting-edge research in particle 
                  physics while also developing software tools that help visualize and analyze complex 
                  scientific data. I believe in the power of technology to make science more accessible 
                  and engaging for everyone.
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
