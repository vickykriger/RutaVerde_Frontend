import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InicioForm.css';
import api from '../../api.js';
import { useAuth } from '../context/AuthContext';

interface InicioFormProps {
  onRegisterClick?: () => void;
}

const InicioForm: React.FC<InicioFormProps> = ({ onRegisterClick }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  // 1. Creamos estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  // 2. Función que maneja el envío del formulario
  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const respuesta = await api.post('/api/login', {
        email: email,
        contrasenia: contrasenia
      });

      // Aceptamos la respuesta tanto si viene con success:true como si viene directamente el usuario
      const usuarioData = respuesta.data?.usuario ?? respuesta.data;
      login({
        id: usuarioData?.id ?? 0,
        nombre: usuarioData?.nombre ?? email.split('@')[0],
        email: usuarioData?.email ?? email,
        ...usuarioData,
      });
      navigate('/perfil');
    } catch (error: any) {
      console.error("Error en el login:", error?.response?.data?.error || error?.message);
      alert("Error al iniciar sesión. Revisa tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">¡Bienvenido de vuelta!</h1>
        <p className="login-subtitle">Ingresá a tu cuenta de Ruta Verde</p>
        <hr className="divider" />

        {/* Añadimos el onSubmit al formulario */}
        <form className="login-form" onSubmit={manejarLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Guardamos el cambio
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="contraseña"
              autoComplete="current-password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)} // Guardamos el cambio
            />
          </div>

          <div className="forgot-password">
            <a href="/recuperar">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-login-submit">Iniciar Sesión</button>
        </form>

        <div className="login-footer-divider">
          <hr className="footer-line" />
          <span className="footer-text">o</span>
        </div>

        <p className="login-register-text">
          ¿No tenés cuenta?{' '}
          <button
            type="button"
            className="btn-register-outline"
            onClick={() => onRegisterClick ? onRegisterClick() : navigate('/registrarse')}
          >
            Crear una cuenta
          </button>
        </p>
      </div>
    </div>
  );
};

export default InicioForm;