import { useState, useRef, useEffect } from 'react';
import './ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialPackage?: string;
}

const SERVICES = [
  'Video Editing',
  'UI/UX Designing',
  'Graphic Designing',
  'Thumbnail Designing',
  'Poster Designing',
  'Website Designing',
  'Social Media Management',
  'Other'
];

const PACKAGES = [
  'None',
  'Starter',
  'Growth',
  'Professional',
  'Brand Starter Setup',
  'Custom'
];

const ContactModal = ({ isOpen, onClose, initialService = '', initialPackage = '' }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState('');
  const [pkg, setPkg] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPkgDropdownOpen, setIsPkgDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pkgDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (pkgDropdownRef.current && !pkgDropdownRef.current.contains(event.target as Node)) {
        setIsPkgDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setMobile('');
      setService(initialService);
      setPkg(initialPackage);
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
      setIsDropdownOpen(false);
      setIsPkgDropdownOpen(false);
    }
  }, [isOpen, initialService, initialPackage]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!phoneRegex.test(mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    if (!service) newErrors.service = 'Please select a service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: '8baf8756-195a-40ef-b561-25dcb8e9dc72',
            name: name,
            email: email,
            phone: mobile,
            service: service,
            package: pkg !== 'None' ? pkg : undefined,
            subject: 'New Portfolio Contact Submission'
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setIsSubmitting(false);
          setIsSuccess(true);
        } else {
          setErrors({ form: 'Something went wrong. Please try again.' });
          setIsSubmitting(false);
        }
      } catch (error) {
        setErrors({ form: 'Failed to send message. Please check your connection.' });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contact-overlay">
      <div className="contact-backdrop" onClick={onClose}></div>
      <div className="contact-modal">
        <button className="contact-close" onClick={onClose} aria-label="Close modal">&times;</button>
        
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
            <h3 className="success-title">Message Sent! ✨</h3>
            <p className="success-message">Your request has been received.</p>
            <p className="success-message">I'll be in touch with you shortly.</p>
            <button className="submit-btn success-close-btn premium-btn" onClick={onClose}>
              Back to Portfolio
            </button>
          </div>
        ) : (
          <>
            <div className="contact-header">
              <h2>Let's Work Together</h2>
              <p>Tell us what you need, and we'll get back to you soon.</p>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'error-input' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter your mobile number" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={errors.mobile ? 'error-input' : ''}
                />
                {errors.mobile && <span className="error-text">{errors.mobile}</span>}
              </div>

              <div className="form-group dropdown-group" ref={dropdownRef}>
                <label>Service</label>
                <div 
                  className={`custom-select ${isDropdownOpen ? 'open' : ''} ${errors.service ? 'error-input' : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={service ? 'selected-text' : 'placeholder-text'}>
                    {service || 'Select a service'}
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

              <div className="form-group dropdown-group" ref={pkgDropdownRef}>
                <label>Package (Optional)</label>
                <div 
                  className={`custom-select ${isPkgDropdownOpen ? 'open' : ''}`}
                  onClick={() => setIsPkgDropdownOpen(!isPkgDropdownOpen)}
                >
                  <span className={pkg && pkg !== 'None' ? 'selected-text' : 'placeholder-text'}>
                    {pkg && pkg !== 'None' ? pkg : 'Select a package'}
                  </span>
                  <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                
                {isPkgDropdownOpen && (
                  <ul className="dropdown-menu">
                    {PACKAGES.map((p) => (
                      <li 
                        key={p} 
                        onClick={() => {
                          setPkg(p);
                          setIsPkgDropdownOpen(false);
                        }}
                        className={pkg === p ? 'active' : ''}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {errors.form && <div className="error-text" style={{textAlign: 'center', marginBottom: '16px'}}>{errors.form}</div>}

              <button type="submit" className={`submit-btn ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
