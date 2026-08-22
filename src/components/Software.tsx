import './Software.css';

const Software = () => {
  return (
    <section className="software-section">
      <div className="software-container">
        <div className="software-label">SOFTWARE</div>
        
        <div className="software-capsule glass-panel">
          <div className="software-icon ae-icon">
            <span className="icon-text">Ae</span>
          </div>
          
          <div className="software-icon pr-icon">
            <span className="icon-text">Pr</span>
          </div>
          
          <div className="software-icon figma-icon">
             <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '60%', height: '60%'}}>
              <path d="M19 28.5C19 33.7467 14.7467 38 9.5 38C4.25329 38 0 33.7467 0 28.5C0 23.2533 4.25329 19 9.5 19H19V28.5Z" fill="#0ACF83"/>
              <path d="M0 47.5C0 52.7467 4.25329 57 9.5 57C14.7467 57 19 52.7467 19 47.5V38H9.5C4.25329 38 0 42.2533 0 47.5Z" fill="#1ABCFE"/>
              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.2533 0 9.5Z" fill="#F24E1E"/>
              <path d="M19 0H28.5C33.7467 0 38 4.2533 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262"/>
              <path d="M38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5Z" fill="#A259FF"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Software;
