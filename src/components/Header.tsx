import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo-icon">
            <img src='/svg/Logo.svg' alt="logo"></img>
          </div>
          <img className="logo-text" src='/svg/LogoFrase.svg'></img>
        </div>

        <nav className="nav-menu">
          <a href="/" className="nav-link active">Inicio</a>
          <a href="/mapa" className="nav-link">Mapa</a>
          <a href="/noticias" className="nav-link">Noticias</a>
          <a href="/aportes" className="nav-link">Aportes</a>
          <a href="/historia" className="nav-link">Historia</a>
        </nav>

        <div className="auth-buttons">
          <button className="btn btn-login">Ingresar</button>
          <button className="btn btn-register">Registrarse</button>
        </div>
      </div>
    </header>
  );
};

export default Header;