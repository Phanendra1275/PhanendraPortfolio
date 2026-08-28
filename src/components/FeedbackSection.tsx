import React, { useRef, useState, useEffect, useMemo } from 'react';
import './FeedbackSection.css';
import { mockFeedbacks } from '../data/feedbackData';

interface FeedbackSectionProps {
  onOpenFeedback: () => void;
}

const FILTER_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Video Editing', value: 'Video Editing' },
  { label: 'UI/UX', value: 'UI/UX Designing' },
  { label: 'Motion', value: 'Motion Graphics' },
  { label: 'Thumbnail', value: 'Thumbnail Designing' },
  { label: 'Other', value: 'Other' }
];

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ onOpenFeedback }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');

  // Filtering and Sorting
  const displayFeedbacks = useMemo(() => {
    let filtered = mockFeedbacks.filter(
      (f) => f.rating >= 4 && f.approvedForPublicDisplay
    );

    if (activeFilter !== 'All') {
      filtered = filtered.filter((f) => f.service === activeFilter);
    }

    return filtered.sort((a, b) => {
      if (a.rating !== b.rating) {
        return b.rating - a.rating; // 5-star first
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first
    });
  }, [activeFilter]);

  // Auto-scroll logic
  useEffect(() => {
    let animationFrameId: number;
    
    const scroll = () => {
      const isMobile = window.innerWidth <= 768;
      if (trackRef.current && !isDragging && !isHovered && !isMobile) {
        trackRef.current.scrollLeft += 0.5; // Adjust speed as needed
        
        // Reset scroll if we reached the end to loop (optional, but requested just auto-scroll)
        // A full infinite loop requires duplicating items, which might be overkill here.
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isHovered]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="feedback-section" id="feedback">
      <div className="feedback-container">
        <div className="feedback-header">
          <div className="feedback-header-left">
            <div className="heading-glow"></div>
            <h2 className="feedback-main-heading">
              <span className="accent-line">━━</span> WHAT PEOPLE SAY
            </h2>
            <p className="feedback-subtitle">Feedback from people who have experienced my work.</p>
          </div>
          <button className="add-feedback-btn" onClick={onOpenFeedback}>
            ADD FEEDBACK
          </button>
        </div>

        <div className="feedback-filters">
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter.label}
              className={`feedback-filter-btn ${activeFilter === filter.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="feedback-track-container">
          <div className="fade-overlay fade-left"></div>
          <div
            className={`feedback-track ${isDragging ? 'grabbing' : ''}`}
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
          >
            {displayFeedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-card">
                <div className="feedback-content">
                  <p className="feedback-message">{feedback.review}</p>
                </div>
                <div className="feedback-author">
                  {feedback.profileImage ? (
                    <img 
                      src={feedback.profileImage} 
                      alt={`${feedback.clientName} profile photo`} 
                      className="author-avatar"
                    />
                  ) : feedback.fallbackAvatar ? (
                    <img 
                      src={feedback.fallbackAvatar} 
                      alt={`Generic avatar for ${feedback.clientName}`} 
                      className="author-avatar"
                    />
                  ) : (
                    <div className="author-avatar fallback-initial">
                      {(feedback.clientName || 'Anonymous').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="author-details">
                    <div className="author-name">{feedback.clientName || 'Anonymous'}</div>
                    <div className="author-role">{feedback.service}</div>
                  </div>
                  <div className="feedback-rating">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="fade-overlay fade-right"></div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
