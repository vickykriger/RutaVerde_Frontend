import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <img className="footer-logo" src='/svg/LogoFrase.svg'></img>
          <p className="footer-tagline">Una iniciativa de la Red Solidaria · Tu guía para plantar el cambio</p>
          <p className="footer-copyright">© 2026 Ruta Verde</p>
        </div>
      </div>
      <a
        href="http://localhost:5174"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-admin-link"
        title="Backoffice"
      >
        admin
      </a>
    </footer>
  );
};

export default Footer;
