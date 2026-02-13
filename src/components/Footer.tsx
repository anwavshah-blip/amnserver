import { motion } from 'framer-motion';
import logoImage from '../assets/images/logo.png';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Heart
} from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const quickLinks = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Gallery', href: '#/gallery' },
  { label: 'Physics', href: '#/physics' },
  { label: 'Documents', href: '#/documents/article' },
  { label: 'News', href: '#/news' },
  { label: 'Downloads', href: '#/downloads' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-20">
      {/* Gradient Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl glass-button flex items-center justify-center">
                <img 
              src={logoImage} 
              alt="Logo" 
              className="w-10 h-10 rounded-xl object-cover"
              />
              </div>
              <span className="text-2xl font-bold gradient-text">
                Nepal Wild Research
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Exploring Nepal’s forests and wildlife through science and research. Building digital experiences that turn knowledge into meaningful conservation action.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl neu-button flex items-center justify-center hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a 
                    href="mailto:nepalwildresearch@outlook.com" 
                    className="hover:text-primary transition-colors"
                  >
                    nepalwildresearch@outlook.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a 
                    href="tel:+977-9864164617" 
                    className="hover:text-primary transition-colors"
                  >
                    +977 986 4164617
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>Syuchatar</p>
                  <p>Kirtipur, Kathmandu</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get the latest updates and news.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 glass-input text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 glass-button font-medium text-sm"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Copyright Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Nepal Wild Research. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Aman Shah
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
