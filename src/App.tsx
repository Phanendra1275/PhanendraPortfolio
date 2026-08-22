import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Software from './components/Software';
import ProjectShowcase from './components/ProjectShowcase';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import './App.css';
import { useState } from 'react';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="app-container">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <Hero />
      <Experience />
      <div className="portfolio-bottom-wrapper">
        <Software />
        <ProjectShowcase />
      </div>
      
      <Footer onOpenContact={() => setIsContactOpen(true)} />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}

export default App;
