import React from 'react';
import './Header.css';

interface HeaderProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoClick?: () => void;
  isFormView?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick, onLogoClick, isFormView = false }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <img src='/svg/Logo.svg' alt="logo"></img>
          </div>
          <img className="logo-text" src='/svg/LogoFrase.svg'></img>
        </div>

        <nav className="nav-menu">
          <a href="/" className={`nav-link ${!isFormView ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onLogoClick?.(); }}>Inicio</a>
          <a href="/mapa" className="nav-link">Mapa</a>
          <a href="/noticias" className="nav-link">Noticias</a>
          <a href="/aportes" className="nav-link">Aportes</a>
          <a href="/historia" className="nav-link">Historia</a>
        </nav>

        <div className="auth-buttons">
          <button className="btn btn-login" onClick={onLoginClick}>Ingresar</button>
          <button className="btn btn-register" onClick={onRegisterClick}>Registrarse</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
