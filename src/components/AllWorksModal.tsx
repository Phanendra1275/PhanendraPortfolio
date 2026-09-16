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

  const categories = ['All', 'Video Editing', 'UI/UX Design', 'Visual Identity'];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Video Editing') {
      return project.category.toLowerCase().includes('video') || project.title.toLowerCase().includes('video') || project.title.toLowerCase().includes('real estate');
    }
    if (activeCategory === 'UI/UX Design') {
      return project.category.toLowerCase().includes('ui') || project.category.toLowerCase().includes('ux') || project.title.toLowerCase().includes('starter') || project.title.toLowerCase().includes('growth');
    }
    if (activeCategory === 'Visual Identity') {
      return project.category.toLowerCase().includes('visual') || project.category.toLowerCase().includes('identity') || project.title.toLowerCase().includes('design');
    }
    return true;
  });

  return (
    <div className="aw-backdrop" onClick={onClose}>
      <div className="aw-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="aw-header">
          <div className="aw-header-info">
            <span className="aw-badge">PORTFOLIO ARCHIVE</span>
            <h2 className="aw-title">All Featured Works</h2>
            <p className="aw-subtitle">
              Browse through my latest video edits, UI/UX designs, and visual branding projects.
            </p>
          </div>

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

        {/* Category Filter Pills */}
        <div className="aw-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`aw-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              <span className="aw-filter-count">
                {cat === 'All'
                  ? projects.length
                  : projects.filter((p) => {
                      if (cat === 'Video Editing') return p.category.toLowerCase().includes('video') || p.title.toLowerCase().includes('video') || p.title.toLowerCase().includes('real estate');
                      if (cat === 'UI/UX Design') return p.category.toLowerCase().includes('ui') || p.category.toLowerCase().includes('ux') || p.title.toLowerCase().includes('starter') || p.title.toLowerCase().includes('growth');
                      if (cat === 'Visual Identity') return p.category.toLowerCase().includes('visual') || p.category.toLowerCase().includes('identity') || p.title.toLowerCase().includes('design');
                      return true;
                    }).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="aw-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="aw-card"
              onClick={() => {
                if (project.videoUrl) {
                  onSelectProject(project);
                } else if (project.imageUrl) {
                  setSelectedImage(project.imageUrl);
                }
              }}
            >
              {/* Media Thumbnail Container */}
              <div className="aw-media-box">
                {project.videoUrl ? (
                  <>
                    <video
                      src={project.videoUrl}
                      muted
                      loop
                      playsInline
                      className="aw-card-video"
                      onMouseEnter={(e) => {
                        e.currentTarget.play().catch(() => {});
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="aw-play-badge">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="6 4 20 12 6 20 6 4"></polygon>
                      </svg>
                      <span>Preview Reel</span>
                    </div>
                  </>
                ) : (
                  <>
                    <img 
                      src={project.imageUrl || '/assets/vastra-alankara.png'} 
                      alt={project.title} 
                      className="aw-card-img" 
                    />
                    <div className="aw-play-badge aw-view-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <span>View Design</span>
                    </div>
                  </>
                )}

                <span className="aw-card-category">{project.category}</span>
              </div>

              {/* Card Meta Content */}
              <div className="aw-card-info">
                <div className="aw-card-header">
                  <h3 className="aw-card-title">{project.title}</h3>
                  <span className="aw-arrow-indicator">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </span>
                </div>
                <p className="aw-card-desc">
                  {project.description || "High-impact creative production with dynamic visual pacing and precision design."}
                </p>
                <div className="aw-card-footer">
                  <span className="aw-cta-label">
                    {project.videoUrl ? "Watch in iPhone Player" : "Open High-Res Design"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox for static UI designs */}
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
