import { useState, useRef } from 'react';
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
// GOOGLE SHEETS WEB APP URL - REPLACE THIS!
// ============================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNIopuOGB7nEk1DzaiOa1Z7yHH9hpMKKB01Fz6VDT66sWcquvXfjukANsGCLYENbwMnA/exec';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Send to Google Sheets
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',  // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() })
      });

      // Since mode is 'no-cors', we can't read the response
      // So we assume success if no error is thrown
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 4000);

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  // Status styles configuration
  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          buttonText: 'Subscribing...',
          buttonClass: 'opacity-75 cursor-wait',
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          showMessage: false
        };
      case 'success':
        return {
          buttonText: 'Subscribed!',
          buttonClass: 'bg-green-500/20 text-green-600 border-green-500/50',
          icon: <CheckCircle className="w-4 h-4" />,
          showMessage: true,
          messageClass: 'text-green-500'
        };
      case 'error':
        return {
          buttonText: 'Try Again',
          buttonClass: 'bg-red-500/20 text-red-600 border-red-500/50',
          icon: <AlertCircle className="w-4 h-4" />,
          showMessage: true,
          messageClass: 'text-red-500'
        };
      case 'duplicate':
        return {
          buttonText: 'Already Subscribed',
          buttonClass: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/50',
          icon: <AlertCircle className="w-4 h-4" />,
          showMessage: true,
          messageClass: 'text-yellow-500'
        };
      default:
        return {
          buttonText: 'Subscribe',
          buttonClass: 'glass-button hover:bg-primary/20',
          icon: null,
          showMessage: false
        };
    }
  };

  const statusConfig = getStatusConfig();

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
            
            <form ref={formRef} className="space-y-3" onSubmit={handleSubscribe}>
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
                className={`w-full py-3 font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 border ${statusConfig.buttonClass}`}
              >
                {statusConfig.icon}
                {statusConfig.buttonText}
              </button>
              
              {statusConfig.showMessage && message && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm flex items-center gap-1 ${statusConfig.messageClass}`}
                >
                  {status === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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