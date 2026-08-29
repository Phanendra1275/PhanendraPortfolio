import { useState, useEffect, useRef } from 'react';
import './ProjectShowcase.css';

const ProjectShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const projects = [
    {
      id: 1,
      title: "Growth Pack",
      category: "UI/UX Design",
      imageClass: "project-img-1",
      videoUrl: "/assets/video2.mp4",
      posterUrl: "/assets/medical-video.jpg"
    },
    {
      id: 2,
      title: "Video Editing",
      category: "Promo Video",
      imageClass: "project-img-2",
      videoUrl: "/assets/video.mp4",
      posterUrl: "/assets/medical-promo.jpg"
    },
    {
      id: 3,
      title: "Starter Pack",
      category: "UI Project",
      imageClass: "project-img-3",
      videoUrl: "/assets/DEMO.mp4",
      posterUrl: "/assets/dashboard-ui-v2.jpg"
    },

    {
      id: 4,
      title: "Real Estate Editing",
      category: "Video Editing",
      imageClass: "project-img-4",
      videoUrl: "/assets/Demo 2.mp4",
    },
    {
      id: 5,
      title: "Ui Designing",
      category: "Visual Identity",
      imageClass: "project-img-5"
    },
    {
      id: 6,
      title: "Landing Page",
      category: "UI/UX Design",
      imageClass: "project-img-6"
    }
  ];

  const handlePrev = () => {
    setPlayingVideoId(null);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setPlayingVideoId(null);
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  // Ensure body scroll is locked when modal is open
  useEffect(() => {
    if (playingVideoId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [playingVideoId]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Auto-play carousel loop
  useEffect(() => {
    if (playingVideoId !== null) return; // Pause carousel if video is playing
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    }, 3500); // Change slide every 3.5 seconds

    return () => clearInterval(interval);
  }, [projects.length, playingVideoId]);

  return (
    <section 
      className="project-showcase"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      
      {/* Navigation Arrows */}
      <button className="nav-arrow prev-arrow" onClick={handlePrev} aria-label="Previous project">
        <div className="arrow-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </button>

      {/* Cards Container */}
      <div className="cards-container">
        {projects.map((project, index) => {
          let position = index - activeIndex;
          const total = projects.length;
          
          // Wrap around logic to ensure 5 cards are always visible
          if (position > Math.floor(total / 2)) {
            position -= total;
          } else if (position < -Math.floor(total / 2)) {
            position += total;
          }
          
          return (
            <div 
              key={project.id} 
              className={`project-card pos-${position}`}
              onClick={() => {
                if (activeIndex !== index) {
                  setPlayingVideoId(null);
                  setActiveIndex(index);
                }
              }}
            >
              <div className={`project-image-placeholder ${project.imageClass}`}>
                {project.videoUrl ? (
                  <>
                    <video
                      ref={(el) => {
                        if (el) {
                          videoRefs.current[project.id] = el;
                        }
                      }}
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="project-video"
                      data-id={project.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (position === 0) {
                          setPlayingVideoId(project.id);
                        }
                      }}
                    />
                    
                    {/* Minimal interactive indicator (optional, you can add a small volume icon here if you want) */}
                  </>
                ) : null}

                {/* Premium tag stays hidden while video is playing */}
                {playingVideoId !== project.id && (
                  <div className="premium-tag">
                    {project.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button className="nav-arrow next-arrow" onClick={handleNext} aria-label="Next project">
        <div className="arrow-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>

      {/* Bottom Arc */}
      <div className="project-arc-container">
        <svg viewBox="0 0 600 300" className="arc-svg">
          {/* Main filled arc background */}
          <path d="M 50 300 A 250 250 0 0 1 555 300" fill="#050833" stroke="#5C6CFF" strokeWidth="85" />
          
          {/* Text path - Identical path to perfectly center on the stroke */}
          <path id="arcPath" d="M 50 300 A 250 250 0 0 1 555 300" fill="transparent" stroke="transparent" />
          
          <text className="arc-text">
            <textPath href="#arcPath" startOffset="50%" textAnchor="middle" dominantBaseline="middle">
              MY PROJECTS
            </textPath>
          </text>
        </svg>
      </div>

      {/* Video Modal Overlay */}
      {playingVideoId !== null && (
        <div className="video-modal-overlay" onClick={() => setPlayingVideoId(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setPlayingVideoId(null)} aria-label="Close video">
              ✕
            </button>
            <video
              src={projects.find(p => p.id === playingVideoId)?.videoUrl}
              poster={projects.find(p => p.id === playingVideoId)?.posterUrl}
              autoPlay
              loop
              controls
              playsInline
              className="modal-video-player"
            />
          </div>
        </div>
      )}
      
    </section>
  );
};

export default ProjectShowcase;
