import React, { useRef } from 'react';
import './SubirBaldosa.css';

interface SubirBaldosaProps {
  onRegisterClick?: () => void;
}

const SubirBaldosa: React.FC<SubirBaldosaProps> = ({ onRegisterClick }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Imagen seleccionada:', file.name);
      // Aquí podrías manejar la lógica de previsualización o carga
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Subir baldosa</h1>
        <p className="login-subtitle">Sumáte al corredor biológico</p>
        
        <hr className="divider" />

        <form className="login-form">
          <div className="form-group">
            <label htmlFor="planta">Planta</label>
            <input 
              type="text" 
              id="planta" 
              placeholder="Nombre de la planta" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="region">Región</label>
            <select id="region" defaultValue="" required>
              <option value="" disabled>Seleccioná tu región</option>
              <option value="central">Región Central</option>
              <option value="chorotega">Región Chorotega</option>
              <option value="brunca">Región Brunca</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tamano">Tamañána</label>
            <select id="tamano" defaultValue="" required>
              <option value="" disabled>Seleccioná el tamaño de la baldosa en metros</option>
              <option value="1">1 metro</option>
              <option value="2">2 metros</option>
              <option value="5">5 metros</option>
            </select>
          </div>

          <div className="form-group textarea-group">
            <label htmlFor="comentarios" className="sr-only">Comentarios</label>
            <div className="textarea-container">
              <textarea 
                id="comentarios" 
                placeholder="Comentarios..." 
                rows={4}
              ></textarea>
              
              {/* Input de archivo oculto */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="sr-only" 
                required 
              />
              
              <div className="upload-icon-container" onClick={handleUploadClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="#333"/>
                </svg>
                <span className="upload-text">Subir imagen</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-login-submit">Subir baldosa</button>
        </form>
      </div>
    </div>
  );
};

export default SubirBaldosa;
