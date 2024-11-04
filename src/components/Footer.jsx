import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Portfolio Generator</h3>
          <p className="footer-description">
            Create professional portfolios instantly with our AI-powered tool.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/generator/create">Create Portfolio</a></li>
            <li><a href="#features">Features</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <div className="footer-social">
            <a href="#" className="social-link"><FaGithub /></a>
            <a href="#" className="social-link"><FaLinkedin /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Portfolio Generator. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;