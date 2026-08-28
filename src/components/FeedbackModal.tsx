import React, { useState, useRef, useEffect } from 'react';
import './FeedbackModal.css';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  'Video Editing',
  'UI/UX Designing',
  'Motion Graphics',
  'Thumbnail Designing',
  'Graphic Designing',
  'Website Designing',
  'Other'
];

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [service, setService] = useState('');
  const [review, setReview] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setName('');
      setProfileImage(null);
      setProfileImagePreview(null);
      setRating(0);
      setHoverRating(0);
      setService('');
      setReview('');
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
      setIsDropdownOpen(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (name.length > 80) newErrors.name = 'Name must be less than 80 characters';
    
    if (rating < 1 || rating > 5) newErrors.rating = 'Please select a rating';
    
    if (!service) newErrors.service = 'Please select a service';
    
    if (profileImage && profileImage.size > 5 * 1024 * 1024) {
      newErrors.profileImage = 'Image must be smaller than 5MB';
    }

    if (!review.trim()) {
      newErrors.review = 'Feedback message is required';
    } else if (review.length > 1000) {
      newErrors.review = 'Feedback message must be under 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  return (
    <div className="feedback-overlay">
      <div className="feedback-backdrop" onClick={onClose}></div>
      <div className="feedback-modal">
        <button className="feedback-close" onClick={onClose} aria-label="Close modal">&times;</button>
        
        {isSuccess ? (
          <div className="success-state premium-success">
            <div className="success-glow-bg"></div>
            <div className="success-icon-container premium">
              <div className="ripple-1"></div>
              <div className="ripple-2"></div>
              <svg className="success-check clap-board" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 11h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8z" />
                <line x1="6" y1="15" x2="18" y2="15" />
                <line x1="10" y1="18" x2="14" y2="18" />
                <g className="clap-arm">
                  <path d="M2 10V6a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v4H2z" />
                  <line x1="6" y1="5" x2="9" y2="10" />
                  <line x1="12" y1="5" x2="15" y2="10" />
                  <line x1="18" y1="5" x2="21" y2="10" />
                </g>
              </svg>
            </div>
            <h3 className="success-title">Thank You! 💙</h3>
            <p className="success-message">Your feedback has been received.</p>
            <p className="success-message">I really appreciate you taking the time to help me improve.</p>
            <p className="success-message small-notice">Your feedback will be reviewed before it appears publicly.</p>
            <button className="submit-btn success-close-btn premium-btn" onClick={onClose}>
              Back to Portfolio
            </button>
          </div>
        ) : (
          <>
            <div className="feedback-header">
              <h2>Share Your Thoughts</h2>
              <p>Your feedback helps me improve and grow.</p>
            </div>
            
            <form className="feedback-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Name (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'error-input' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group profile-upload-group">
                <label>Profile Image (Optional)</label>
                <p className="upload-subtitle">Upload your photo, or we'll use a generated avatar.</p>
                
                <div className="upload-container">
                  {profileImagePreview ? (
                    <div className="image-preview-wrapper">
                      <img src={profileImagePreview} alt="Profile preview" className="profile-preview" />
                      <div className="preview-actions">
                        <label className="change-photo-btn">
                          Change Photo
                          <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageChange} hidden />
                        </label>
                        <button type="button" className="remove-photo-btn" onClick={handleRemoveImage}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="upload-placeholder">
                      <div className="upload-icon">+ Upload Photo</div>
                      <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageChange} hidden />
                    </label>
                  )}
                </div>
                {!profileImagePreview && (
                  <p className="upload-fallback-text">
                    No photo selected.<br/>A generic avatar will be used.
                  </p>
                )}
                {errors.profileImage && <span className="error-text">{errors.profileImage}</span>}
              </div>

              <div className="form-group">
                <label>Rating</label>
                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating && <span className="error-text">{errors.rating}</span>}
              </div>

              <div className="form-group dropdown-group" ref={dropdownRef}>
                <label>Service</label>
                <div 
                  className={`custom-select ${isDropdownOpen ? 'open' : ''} ${errors.service ? 'error-input' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={service ? 'selected-text' : 'placeholder-text'}>
                    {service || 'Select type of work'}
                  </span>
                  <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    {SERVICES.map((srv) => (
                      <li 
                        key={srv} 
                        onClick={() => {
                          setService(srv);
                          setIsDropdownOpen(false);
                        }}
                        className={service === srv ? 'active' : ''}
                      >
                        {srv}
                      </li>
                    ))}
                  </ul>
                )}
                {errors.service && <span className="error-text">{errors.service}</span>}
              </div>

              <div className="form-group">
                <div className="label-with-count">
                  <label>Your Experience</label>
                  <span className="char-count">{review.length} / 1000</span>
                </div>
                <textarea 
                  placeholder="Share your experience working with me..." 
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className={errors.review ? 'error-input' : ''}
                  rows={4}
                  maxLength={1000}
                />
                {errors.review && <span className="error-text">{errors.review}</span>}
              </div>

              {errors.form && <div className="error-text" style={{textAlign: 'center', marginBottom: '16px'}}>{errors.form}</div>}

              <button type="submit" className={`submit-btn ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT FEEDBACK'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
