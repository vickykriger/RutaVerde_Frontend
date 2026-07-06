import React, { useState } from 'react';
import './InicioForm.css';
import api from '../../api.js';

interface InicioFormProps {
  onRegisterClick: () => void;
}

const InicioForm: React.FC<InicioFormProps> = ({ onRegisterClick }) => {
  // 1. Creamos estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  // 2. Función que maneja el envío del formulario
  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que se recargue la página

    try {
      // 3. Enviamos los datos mediante POST al backend
      const respuesta = await api.post('/api/login', {
        email: email,
        contrasenia: contrasenia
      });

      if (respuesta.data.success) {
        console.log("¡Logueado con éxito!", respuesta.data.usuario);
        // Aquí puedes redirigir al usuario o guardar su sesión
      }
    } catch (error) {
      console.error("Error en el login:", error.response?.data?.error || error.message);
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
      </div>
    </div>
  );
};

export default InicioForm;