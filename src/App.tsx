import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Physics from './pages/Physics';
import News from './pages/News';
import Downloads from './pages/Downloads';

// Document Subpages
import Article from './pages/documents/Article';
import Report from './pages/documents/Report';
import Journal from './pages/documents/Journal';
import Project from './pages/documents/Project';

// Physics Content Pages
import PhysicsContent from './pages/physics/PhysicsContent';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/physics" element={<Physics />} />
            <Route path="/physics/:topicId" element={<PhysicsContent />} />
            <Route path="/news" element={<News />} />
            <Route path="/downloads" element={<Downloads />} />
            
            {/* Document Routes */}
            <Route path="/documents/article" element={<Article />} />
            <Route path="/documents/report" element={<Report />} />
            <Route path="/documents/journal" element={<Journal />} />
            <Route path="/documents/project" element={<Project />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;
