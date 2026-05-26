import React from 'react';
import './RegistroForm.css';

const RegistroForm: React.FC = () => {
  return (
    <div className="registro-container">
      <div className="registro-card">
        <h1 className="registro-title">Crear cuenta</h1>
        <p className="registro-subtitle">Sumáte al corredor biológico nacional</p>
        
        <hr className="divider" />

        <form className="registro-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" placeholder="Tu nombre y apellido" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" placeholder="correo@ejemplo.com" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="Mínimo 8 caracteres" />
          </div>

          <div className="form-group">
            <label htmlFor="region">Región</label>
            <select id="region">
              <option value="" disabled selected>Seleccioná tu región</option>
              <option value="central">Región Central</option>
              <option value="chorotega">Región Chorotega</option>
              <option value="brunca">Región Brunca</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">Registrarse</button>
        </form>

        <div className="registro-footer">
          <a href="/login" className="login-link">¿Ya tenés cuenta? Iniciá sesión &rarr;</a>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;