import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Home, 
  User, 
  Image, 
  Atom, 
  FileText, 
  Newspaper, 
  Download, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About', icon: User },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/physics', label: 'Physics', icon: Atom },
  { 
    path: '/documents', 
    label: 'Documents', 
    icon: FileText,
    submenu: [
      { path: '/documents/article', label: 'Article' },
      { path: '/documents/report', label: 'Report' },
      { path: '/documents/journal', label: 'Journal' },
      { path: '/documents/project', label: 'Project' },
    ]
  },
  { path: '#/news', label: 'News', icon: Newspaper },
  { path: '#/downloads', label: 'Download', icon: Download },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
  return location.pathname === path || location.pathname.startsWith(path + '/');
};
  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'nav-glass' : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl glass-button flex items-center justify-center">
                <Atom className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                Portfolio
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenSubmenu(item.path)}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <button
                        className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? 'glass-button text-primary'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${openSubmenu === item.path ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {openSubmenu === item.path && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 glass-card py-2 z-50"
                          >
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`block px-4 py-2 transition-all duration-200 ${
                                  location.pathname === sub.path
                                    ? 'text-primary bg-primary/10'
                                    : 'hover:bg-white/5 hover:text-primary'
                                }`}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? 'glass-button text-primary'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl neu-button flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl neu-button flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="section-container py-4">
              <div className="glass-card p-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.path}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => setOpenSubmenu(openSubmenu === item.path ? null : item.path)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive(item.path)
                              ? 'glass-button text-primary'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.path ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {openSubmenu === item.path && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-12 pr-4 py-2 space-y-1">
                                {item.submenu.map((sub) => (
                                  <Link
                                    key={sub.path}
                                    to={sub.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-2 rounded-lg transition-all duration-200 ${
                                      location.pathname === sub.path
                                        ? 'text-primary bg-primary/10'
                                        : 'hover:bg-white/5 hover:text-primary'
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? 'glass-button text-primary'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden mobile-nav-glass safe-area-pb">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'animate-pulse-glow' : ''}`} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
