import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InicioForm.css';

const InicioForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">¡Bienvenido de vuelta!</h1>
        <p className="login-subtitle">Ingresá a tu cuenta de Ruta Verde</p>
        
        <hr className="divider" />

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              placeholder="correo@ejemplo.com" 
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="contraseña" 
              autoComplete="current-password"
            />
            <div className="forgot-password">
              <a href="/recuperar">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <button type="submit" className="btn-login-submit">Iniciar Sesion</button>
        </form>

        <div className="login-footer-divider">
          <hr className="footer-line" />
          <span className="footer-text">¿No tenés cuenta?</span>
        </div>

        <button 
          type="button" 
          className="btn-register-outline" 
          onClick={() => navigate('/registrarse')}
        >
          Registrate gratis
        </button>
      </div>
    </div>
  );
};

export default InicioForm;