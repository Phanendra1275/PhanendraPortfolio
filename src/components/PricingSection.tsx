import './PricingSection.css';

interface PricingSectionProps {
  onOpenContact: (service?: string, pkg?: string) => void;
}

const PricingSection = ({ onOpenContact }: PricingSectionProps) => {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2>CHOOSE YOUR PLAN</h2>
          <p>Social media content plans built for consistent growth.</p>
        </div>

        <div className="pricing-grid">
          {/* STARTER CARD */}
          <div className="pricing-card starter-card">
            <div className="card-top">
              <h3 className="package-name">STARTER</h3>
              <p className="package-subtitle">Build your presence</p>
              
              <div className="pricing-block">
                <span className="old-price">₹3,999</span>
                <div className="current-price-row">
                  <span className="current-price">₹2,999</span>
                  <span className="per-month">/ month</span>
                </div>
              </div>
              
              <button 
                className="pricing-cta outline-cta"
                onClick={() => onOpenContact('Social Media Management', 'Starter')}
              >
                GET STARTED
              </button>
            </div>
            
            <div className="card-bottom">
              <h4 className="includes-heading">WHAT'S INCLUDED</h4>
              <ul className="feature-list">
                <li><span className="check">✓</span> Up to 8 Static Posts</li>
                <li><span className="check">✓</span> Up to 2 Reels</li>
                <li><span className="check">✓</span> 1 Social Platform</li>
                <li><span className="check">✓</span> Captions + Hashtags</li>
                <li><span className="check">✓</span> Basic Content Planning</li>
                <li><span className="check">✓</span> Basic Profile Optimization</li>
                <li><span className="check">✓</span> 1 Revision per design</li>
                <li><span className="check">✓</span> Basic Monthly Summary</li>
              </ul>
            </div>
          </div>

          {/* GROWTH CARD */}
          <div className="pricing-card growth-card">
            <div className="popular-badge">MOST POPULAR</div>
            <div className="card-top">
              <h3 className="package-name">GROWTH</h3>
              <p className="package-subtitle">Build your audience</p>
              
              <div className="pricing-block">
                <span className="old-price">₹7,499</span>
                <div className="current-price-row">
                  <span className="current-price">₹5,999</span>
                  <span className="per-month">/ month</span>
                </div>
              </div>
              
              <button 
                className="pricing-cta filled-cta"
                onClick={() => onOpenContact('Social Media Management', 'Growth')}
              >
                CHOOSE GROWTH
              </button>
            </div>
            
            <div className="card-bottom">
              <h4 className="includes-heading">WHAT'S INCLUDED</h4>
              <ul className="feature-list">
                <li><span className="check">✓</span> Everything in Starter</li>
                <li><span className="check">✓</span> Up to 12 Static Posts</li>
                <li><span className="check">✓</span> Up to 4 Reels</li>
                <li><span className="check">✓</span> 2 Social Platforms</li>
                <li><span className="check">✓</span> Monthly Content Calendar</li>
                <li><span className="check">✓</span> Profile Optimization</li>
                <li><span className="check">✓</span> Basic Content Strategy</li>
                <li><span className="check">✓</span> Monthly Performance Report</li>
                <li><span className="check">✓</span> 2 Revisions per design</li>
              </ul>
            </div>
          </div>

          {/* PROFESSIONAL CARD */}
          <div className="pricing-card professional-card">
            <div className="card-top">
              <h3 className="package-name">PROFESSIONAL</h3>
              <p className="package-subtitle">Build your brand</p>
              
              <div className="pricing-block">
                <span className="old-price">₹12,999</span>
                <div className="current-price-row">
                  <span className="current-price">₹9,999</span>
                  <span className="per-month">/ month</span>
                </div>
              </div>
              
              <button 
                className="pricing-cta strong-outline-cta"
                onClick={() => onOpenContact('Social Media Management', 'Professional')}
              >
                GO PROFESSIONAL
              </button>
            </div>
            
            <div className="card-bottom">
              <h4 className="includes-heading">WHAT'S INCLUDED</h4>
              <ul className="feature-list">
                <li><span className="check">✓</span> Everything in Growth</li>
                <li><span className="check">✓</span> Up to 16 Static Posts</li>
                <li><span className="check">✓</span> Up to 6 Reels</li>
                <li><span className="check">✓</span> 3 Social Platforms</li>
                <li><span className="check">✓</span> Advanced Content Strategy</li>
                <li><span className="check">✓</span> Detailed Monthly Analytics</li>
                <li><span className="check">✓</span> Priority Support</li>
                <li><span className="check">✓</span> Monthly Strategy Call</li>
                <li><span className="check">✓</span> 2 Revisions per design</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pricing-secondary-grid">
          <div className="addons-card">
            <h4>ADD-ONS</h4>
            <div className="addons-list">
              <div className="addon-item"><span>Extra Static Post</span> <span>₹399</span></div>
              <div className="addon-item"><span>Extra Reel</span> <span>from ₹999</span></div>
              <div className="addon-item"><span>Extra Carousel</span> <span>₹599</span></div>
              <div className="addon-item"><span>Additional Platform</span> <span>₹999/month</span></div>
              <div className="addon-item"><span>Ad Creative</span> <span>₹499</span></div>
              <div className="addon-item"><span>Logo Design</span> <span>from ₹1,499</span></div>
              <div className="addon-item"><span>Business Poster</span> <span>₹499</span></div>
              <div className="addon-item"><span>Content Shoot</span> <span>from ₹1,999</span></div>
              <div className="addon-item"><span>Ads Management</span> <span>from ₹2,999/mo + ad spend</span></div>
            </div>
          </div>

          <div className="brand-starter-card">
            <div className="brand-starter-top">
              <h4>BRAND STARTER SETUP</h4>
              <span className="onetime-price">₹2,499 one-time</span>
            </div>
            <div className="brand-starter-body">
              <ul className="feature-list">
                <li><span className="check">✓</span> Social media profile optimization</li>
                <li><span className="check">✓</span> Brand color selection</li>
                <li><span className="check">✓</span> Typography selection</li>
                <li><span className="check">✓</span> Basic visual direction</li>
                <li><span className="check">✓</span> Profile/Bio optimization</li>
                <li><span className="check">✓</span> Highlight cover design</li>
                <li><span className="check">✓</span> 3 reusable post templates</li>
              </ul>
              <button 
                className="pricing-cta outline-cta"
                onClick={() => onOpenContact('Social Media Management', 'Brand Starter Setup')}
              >
                GET BRAND SETUP
              </button>
            </div>
          </div>
        </div>

        <div className="pricing-scope-note">
          <p>
            All plans are billed monthly. Revisions apply to the original approved brief.
            Client-provided footage/assets are assumed unless otherwise agreed.<br/>
            Content shoots, advanced motion graphics, paid assets, ad spend and additional revisions are charged separately.<br/>
            Unused deliverables do not roll over. Custom packages are available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
