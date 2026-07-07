import React, { useRef, useState } from 'react';
import api from '../../api';
import './SubirBaldosa.css';

interface SubirBaldosaProps {
  onRegisterClick?: () => void;
}

const SubirBaldosa: React.FC<SubirBaldosaProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [planta, setPlanta] = useState('');
  const [region, setRegion] = useState('');
  const [tamano, setTamano] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [imagenArchivo, setImagenArchivo] = useState<File | null>(null);
  const [nombreImagen, setNombreImagen] = useState('Ningún archivo seleccionado');

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagenArchivo(file);
      setNombreImagen(file.name);
    }
  };

  const handlePlantaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorLimpio = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g, '');
    setPlanta(valorLimpio);
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!planta || !region || !tamano || !imagenArchivo) {
      alert("Por favor, completa los campos obligatorios y sube una imagen.");
      return;
    }

    let idRegionNum = 1;
    if (region === 'chorotega') idRegionNum = 2;
    if (region === 'brunca') idRegionNum = 3;

    try {
      const formData = new FormData();
      formData.append('nombrePlanta', planta);
      formData.append('idRegion', idRegionNum.toString());
      formData.append('tamanio', tamano);
      formData.append('comentarios', comentarios);
      formData.append('imagen', imagenArchivo);

      console.log("Subiendo baldosa al servidor...");
      const respuesta = await api.post('/api/baldosas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (respuesta.data.success) {
        alert("¡Baldosa guardada con éxito en la base de datos!");
        setPlanta('');
        setRegion('');
        setTamano('');
        setComentarios('');
        setImagenArchivo(null);
        setNombreImagen('Ningún archivo seleccionado');
      }
    } catch (error: any) {
      console.error("Error al subir la baldosa:", error.response?.data?.error || error.message);
      alert("Hubo un problema al subir la baldosa.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Subir baldosa</h1>
        <p className="login-subtitle">Sumáte al corredor biológico</p>
        
        <hr className="divider" />

        <form className="login-form" onSubmit={manejarEnvio}>
          <div className="form-group">
            <label htmlFor="planta">Planta</label>
            <input 
              type="text" 
              id="planta" 
              placeholder="Nombre de la planta" 
              value={planta}
              onChange={handlePlantaChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="region">Región</label>
            <select id="region" value={region} onChange={(e) => setRegion(e.target.value)} required>
              <option value="" disabled>Seleccioná tu región</option>
              <option value="central">Región Central</option>
              <option value="chorotega">Región Chorotega</option>
              <option value="brunca">Región Brunca</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tamano">Tamaño</label>
            <select id="tamano" value={tamano} onChange={(e) => setTamano(e.target.value)} required>
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
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              ></textarea>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="sr-only" 
              />
              
              <div className="upload-icon-container" onClick={handleUploadClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="#333"/>
                </svg>
                <span className="upload-text" style={{ marginLeft: '8px', fontSize: '12px', color: '#555' }}>
                  {nombreImagen}
                </span>
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