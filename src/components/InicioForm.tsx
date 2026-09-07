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
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [camposError, setCamposError] = useState<{ email?: boolean; contrasenia?: boolean }>({});

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCamposError({});

    // Validación local antes de llamar al backend
    const errores: { email?: boolean; contrasenia?: boolean } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errores.email = true;
    } else if (!emailRegex.test(email.trim())) {
      errores.email = true;
    }

    if (!contrasenia) {
      errores.contrasenia = true;
    } else if (contrasenia.length < 6) {
      errores.contrasenia = true;
    }

    if (Object.keys(errores).length > 0) {
      setCamposError(errores);
      if (errores.email && errores.contrasenia) {
        setError('Completá el correo y la contraseña correctamente.');
      } else if (errores.email) {
        setError('Ingresá un correo electrónico válido.');
      } else {
        setError('La contraseña debe tener al menos 6 caracteres.');
      }
      return;
    }

    try {
      const respuesta = await api.post('/api/login', { email, contrasenia });
      const usuarioData = respuesta.data?.usuario ?? respuesta.data;
      login({
        id: usuarioData?.id ?? 0,
        nombre: usuarioData?.nombre ?? email.split('@')[0],
        email: usuarioData?.email ?? email,
        ...usuarioData,
      });
      navigate('/perfil');
    } catch (err: any) {
      setError('La contraseña es incorrecta. Revisá e intentá de nuevo.');
      setCamposError({ contrasenia: true });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">¡Bienvenido de vuelta!</h1>
        <p className="login-subtitle">Ingresá a tu cuenta de Ruta Verde</p>
        <hr className="divider" />

        <form className="login-form" onSubmit={manejarLogin}>
          {error && <p className="form-error-banner">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              value={email}
              className={camposError.email ? 'input-error' : ''}
              onChange={(e) => { setEmail(e.target.value); setCamposError(p => ({ ...p, email: false })); }}
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
              className={camposError.contrasenia ? 'input-error' : ''}
              onChange={(e) => { setContrasenia(e.target.value); setCamposError(p => ({ ...p, contrasenia: false })); }}
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