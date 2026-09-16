import React, { useState, useEffect } from 'react';
import './AllWorksModal.css';

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  imageClass?: string;
  videoUrl?: string;
  posterUrl?: string;
  imageUrl?: string;
  description?: string;
  videoType?: 'short' | 'long';
}

interface AllWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const AllWorksModal: React.FC<AllWorksModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSelectedImage(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedImage, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Short Form', 'Long Form Videos'];

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return projects.length;
    if (cat === 'Short Form') {
      return projects.filter(p => p.videoType === 'short').length;
    }
    if (cat === 'Long Form Videos') {
      return projects.filter(p => p.videoType === 'long').length;
    }
    return 0;
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Short Form') {
      return project.videoType === 'short';
    }
    if (activeCategory === 'Long Form Videos') {
      return project.videoType === 'long';
    }
    return true;
  });

  return (
    <div className="aw-backdrop" onClick={onClose}>
      <div className="aw-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Luxury Minimal Header */}
        <div className="aw-header">
          <div className="aw-header-left">
            <span className="aw-eyebrow">✦ PORTFOLIO ARCHIVE</span>
            <div className="aw-title-row">
              <h2 className="aw-title">Curated Works</h2>
              <span className="aw-count-badge">0{projects.length} Projects</span>
            </div>
          </div>

          <div className="aw-header-right">
            {/* Category Filter Pills */}
            <nav className="aw-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`aw-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="aw-filter-count">{getCategoryCount(cat)}</span>
                </button>
              ))}
            </nav>

            <button 
              className="aw-close-btn" 
              onClick={onClose} 
              aria-label="Close all works"
              title="Close (Esc)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* 9:16 Vertical Showcase Grid */}
        <div className="aw-grid-container">
          <div className="aw-grid">
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className="aw-card"
                style={{ animationDelay: `${idx * 0.06}s` }}
                onClick={() => {
                  if (project.videoUrl) {
                    onSelectProject(project);
                  } else if (project.imageUrl) {
                    setSelectedImage(project.imageUrl);
                  }
                }}
              >
                {/* Media Canvas (9:16 Aspect Ratio) */}
                <div className="aw-media-wrapper">
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      poster={project.posterUrl}
                      muted
                      loop
                      playsInline
                      className="aw-video"
                      onMouseEnter={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  ) : (
                    <img 
                      src={project.imageUrl || '/assets/vastra-alankara.png'} 
                      alt={project.title} 
                      className="aw-img" 
                    />
                  )}

                  {/* Top Badge: Category & Index */}
                  <div className="aw-top-bar">
                    <span className="aw-category-pill">{project.category}</span>
                    <span className="aw-index-number">0{idx + 1}</span>
                  </div>

                  {/* Center Hover Play Glyph */}
                  <div className="aw-hover-glyph">
                    {project.videoUrl ? (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="7 4 19 12 7 20 7 4"></polygon>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    )}
                  </div>

                  {/* Bottom Vignette & Meta Overlay */}
                  <div className="aw-meta-overlay">
                    <div className="aw-meta-content">
                      <h3 className="aw-meta-title">{project.title}</h3>
                      <span className="aw-meta-desc">
                        {project.videoUrl ? "Watch in iPhone Player" : "Open High-Res Design"}
                      </span>
                    </div>

                    <div className="aw-meta-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox for Static UI Designs */}
        {selectedImage && (
          <div className="aw-lightbox" onClick={() => setSelectedImage(null)}>
            <div className="aw-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="aw-lightbox-close" 
                onClick={() => setSelectedImage(null)}
                aria-label="Close image preview"
              >
                ✕
              </button>
              <img src={selectedImage} alt="Design preview" className="aw-lightbox-img" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllWorksModal;
