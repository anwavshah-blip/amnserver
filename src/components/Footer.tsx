import { useState } from 'react';
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
  Heart,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shree-aman-shah', label: 'LinkedIn' },
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

// ============================================
// REPLACE WITH YOUR ACTUAL GOOGLE SCRIPT URL
// ============================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw28e4EizQBbtMCC7Uqg3ZOboZzKD3QPkBaaFcYMzxHXvtsUkXtjJQ6IARGGmNwWCEtoA/exec';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // IMPORTANT: Use text/plain to avoid CORS issues
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      } else if (result.status === 'duplicate') {
        setStatus('duplicate');
        setMessage('You are already subscribed!');
      } else {
        setStatus('error');
        setMessage(result.message || 'Something went wrong');
      }

    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }

    // Clear message after 4 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 4000);
  };

  // Get button styles based on status
  const getButtonStyles = () => {
    switch (status) {
      case 'loading':
        return 'opacity-75 cursor-wait bg-primary/50';
      case 'success':
        return 'bg-green-500/20 text-green-600 border border-green-500/50 hover:bg-green-500/30';
      case 'error':
        return 'bg-red-500/20 text-red-600 border border-red-500/50 hover:bg-red-500/30';
      case 'duplicate':
        return 'bg-yellow-500/20 text-yellow-600 border border-yellow-500/50 hover:bg-yellow-500/30';
      default:
        return 'glass-button hover:bg-primary/20';
    }
  };

  // Get button text based on status
  const getButtonText = () => {
    switch (status) {
      case 'loading':
        return 'Subscribing...';
      case 'success':
        return 'Subscribed!';
      case 'error':
        return 'Try Again';
      case 'duplicate':
        return 'Already Subscribed';
      default:
        return 'Subscribe';
    }
  };

  // Get button icon based on status
  const getButtonIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'error':
      case 'duplicate':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Get message color based on status
  const getMessageColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'duplicate':
        return 'text-yellow-500';
      default:
        return 'text-muted-foreground';
    }
  };

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
              Exploring Nepal's forests and wildlife through science and research. Building digital experiences that turn knowledge into meaningful conservation action.
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
                    href="mailto:amangrown@outlook.com" 
                    className="hover:text-primary transition-colors"
                  >
                    amangrown@outlook.com
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
            
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full px-4 py-3 glass-input text-sm disabled:opacity-50 pr-10"
                />
                {status === 'success' && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-3 font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${getButtonStyles()}`}
              >
                {getButtonIcon()}
                {getButtonText()}
              </button>
              
              {message && status !== 'idle' && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm flex items-center gap-1 ${getMessageColor()}`}
                >
                  {status === 'error' || status === 'duplicate' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {message}
                </motion.p>
              )}
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