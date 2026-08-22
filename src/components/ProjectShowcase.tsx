import { useState, useEffect } from 'react';
import './ProjectShowcase.css';

const ProjectShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const projects = [
    {
      id: 1,
      title: "Mobile App",
      category: "UI/UX Design",
      imageClass: "project-img-1"
    },
    {
      id: 2,
      title: "Video Editing",
      category: "Promo Video",
      imageClass: "project-img-2"
    },
    {
      id: 3,
      title: "Dashboard",
      category: "UI Project",
      imageClass: "project-img-3"
    },
    {
      id: 4,
      title: "Branding",
      category: "Visual Identity",
      imageClass: "project-img-4"
    },
    {
      id: 5,
      title: "Landing Page",
      category: "UI/UX Design",
      imageClass: "project-img-5"
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

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
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
    }, 3500); // Change slide every 3.5 seconds

    return () => clearInterval(interval);
  }, [projects.length]);

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
              onClick={() => setActiveIndex(index)}
            >
              <div className={`project-image-placeholder ${project.imageClass}`}>
                <div className="premium-tag">
                  {project.title}
                </div>
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
      
    </section>
  );
};

export default ProjectShowcase;
