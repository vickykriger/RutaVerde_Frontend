// src/components/Header.tsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-section" style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <img src="/svg/Logo.svg" alt="logo" />
          </div>
          <img className="logo-text" src="/svg/LogoFrase.svg" />
        </Link>

        <nav className="nav-menu">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Inicio</NavLink>
          <NavLink to="/mapa" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Mapa</NavLink>
          <NavLink to="/noticias" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Noticias</NavLink>
          <NavLink to="/aportes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Aportes</NavLink>
          <NavLink to="/historia" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Historia</NavLink>
        </nav>

        <div className="auth-buttons">
          <button className="btn btn-login" onClick={() => navigate('/ingresar')}>Ingresar</button>
          <button className="btn btn-register" onClick={() => navigate('/registrarse')}>Registrarse</button>
        </div>
      </div>
    </header>
  );
};

export default Header;