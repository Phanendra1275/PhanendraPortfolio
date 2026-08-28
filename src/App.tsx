import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Software from './components/Software';
import ProjectShowcase from './components/ProjectShowcase';
import PricingSection from './components/PricingSection';
import ContactModal from './components/ContactModal';
import FeedbackSection from './components/FeedbackSection';
import FeedbackModal from './components/FeedbackModal';
import Footer from './components/Footer';
import './App.css';
import { useState } from 'react';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [contactInitialService, setContactInitialService] = useState('');
  const [contactInitialPackage, setContactInitialPackage] = useState('');

  const openContact = (service = '', pkg = '') => {
    setContactInitialService(service);
    setContactInitialPackage(pkg);
    setIsContactOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar onOpenContact={() => openContact()} />
      <Hero />
      <Experience />
      <div className="portfolio-bottom-wrapper">
        <Software />
        <ProjectShowcase />
      </div>
      
      <PricingSection onOpenContact={openContact} />
      
      <FeedbackSection onOpenFeedback={() => setIsFeedbackOpen(true)} />
      
      <Footer onOpenContact={() => openContact()} />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        initialService={contactInitialService}
        initialPackage={contactInitialPackage}
      />
      
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
}

export default App;
