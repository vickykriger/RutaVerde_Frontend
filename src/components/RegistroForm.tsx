import React, { useState } from 'react';
import api from '../../api.js';
import './RegistroForm.css';

interface RegistroFormProps {
  onLoginClick?: () => void;
}

const RegistroForm: React.FC<RegistroFormProps> = ({ onLoginClick }) => {
  // 1. Estados para controlar los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [region, setRegion] = useState('');

  // 2. Función para manejar el envío de datos
  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica en Frontend antes de mandar el paquete
    if (!nombre || !email || !contrasenia || !region) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Convertimos el valor del select a los IDs numéricos que tu backend/Supabase esperan
      let idRegionNum = 1; 
      if (region === 'chorotega') idRegionNum = 2;
      if (region === 'brunca') idRegionNum = 3;

      // 3. Petición POST al endpoint de registro
      const respuesta = await api.post('/api/registro', {
        nombre,
        email,
        contrasenia,
        region: idRegionNum // Enviamos el número esperado por la base de datos
      });

      if (respuesta.data.success) {
        alert("🎉 ¡Cuenta creada con éxito! Ya podés iniciar sesión.");
        if (onLoginClick) onLoginClick(); // Redirige al login automáticamente
      } else {
        alert(`Error: ${respuesta.data.error}`);
      }
    } catch (error: any) {
      console.error("Error en el registro:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Hubo un problema al crear tu cuenta.");
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h1 className="registro-title">Crear cuenta</h1>
        <p className="registro-subtitle">Sumáte al corredor biológico</p>
        
        <hr className="divider" />

        <form className="registro-form" onSubmit={manejarRegistro}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input 
              type="text" 
              id="nombre" 
              placeholder="Tu nombre y apellido" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              placeholder="correo@ejemplo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Mínimo 8 caracteres" 
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="region">Región</label>
            <select 
              id="region" 
              value={region} 
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="" disabled>Seleccioná tu región</option>
              <option value="central">Región Central</option>
              <option value="chorotega">Región Chorotega</option>
              <option value="brunca">Región Brunca</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">Registrarse</button>
        </form>

        <div className="registro-footer">
          <button 
            type="button" 
            onClick={onLoginClick}
            className="login-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
          >
            ¿Ya tenés cuenta? Iniciá sesión &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;