import React, { useRef, useState, useEffect } from 'react';
import api from '../../api';
import './SubirBaldosa.css';

interface SubirBaldosaProps {
  onRegisterClick?: () => void;
}

interface Planta {
  id_planta: number;
  nombre: string;
}

interface Region {
  id_region: number;
  nombre: string;
  plantas?: Planta[];
}

const SubirBaldosa: React.FC<SubirBaldosaProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [region, setRegion] = useState('');
  const [listaRegiones, setListaRegiones] = useState<Region[]>([]);
  
  const [planta, setPlanta] = useState('');
  const [plantasDisponibles, setPlantasDisponibles] = useState<Planta[]>([]);

  const [tamano, setTamano] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [imagenArchivo, setImagenArchivo] = useState<File | null>(null);
  const [nombreImagen, setNombreImagen] = useState('Ningún archivo seleccionado');

  useEffect(() => {
    const cargarRegiones = async () => {
      try {
        const respuesta = await api.get('/api/regiones');
        const datos = respuesta.data ?? respuesta;
        
        console.log('📌 Regiones y Plantas Nativas cargadas:', datos);

        if (Array.isArray(datos)) {
          setListaRegiones(datos);
        }
      } catch (error: any) {
        console.error('Error al pedir las regiones:', error.response?.data || error.message);
      }
    };

    cargarRegiones();
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const regionIdSel = e.target.value;
  setRegion(regionIdSel);
  setPlanta(''); 

  const regionEncontrada = listaRegiones.find(
    (r: any) => String(r.id_region ?? r.id) === String(regionIdSel)
  );
  console.log("🔍 Región seleccionada:", regionEncontrada);
  if (regionEncontrada && Array.isArray(regionEncontrada.plantas) && regionEncontrada.plantas.length > 0) {
    setPlantasDisponibles(regionEncontrada.plantas);
  } else {
    setPlantasDisponibles([]);
  }
};

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

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!planta || !region || !tamano || !imagenArchivo) {
      alert("Por favor, completa los campos obligatorios y sube una imagen.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('idPlanta', planta);
      formData.append('idRegion', region);
      formData.append('tamanio', tamano);
      formData.append('comentarios', comentarios);
      formData.append('imagen', imagenArchivo);

      const respuesta = await api.post('/api/baldosas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (respuesta.data?.success || respuesta.success) {
        alert("¡Baldosa guardada con éxito!");
        setPlanta('');
        setRegion('');
        setTamano('');
        setComentarios('');
        setImagenArchivo(null);
        setNombreImagen('Ningún archivo seleccionado');
        setPlantasDisponibles([]);
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
          
          {/* Desplegable de Regiones */}
          <div className="form-group">
            <label htmlFor="region">Región</label>
            <select 
              id="region" 
              value={region} 
              onChange={handleRegionChange} 
              required
            >
              <option value="" disabled>Seleccioná tu región</option>
              {listaRegiones.map((reg) => (
                <option key={reg.id_region} value={reg.id_region}>
                  {reg.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Desplegable de Plantas Nativas */}
          <div className="form-group">
            <label htmlFor="planta">Planta</label>
            <select 
              id="planta" 
              value={planta} 
              onChange={(e) => setPlanta(e.target.value)} 
              disabled={!region || plantasDisponibles.length === 0}
              required
            >
              <option value="" disabled>
                {!region 
                  ? 'Primero seleccioná una región' 
                  : plantasDisponibles.length === 0 
                    ? 'No hay plantas disponibles para esta región' 
                    : 'Seleccioná la planta'}
              </option>
              {plantasDisponibles.map((p) => (
                <option key={p.id_planta} value={p.id_planta}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Tamaño */}
          <div className="form-group">
            <label htmlFor="tamano">Tamaño</label>
            <select id="tamano" value={tamano} onChange={(e) => setTamano(e.target.value)} required>
              <option value="" disabled>Seleccioná el tamaño de la baldosa en metros</option>
              <option value="1">1 metro</option>
              <option value="2">2 metros</option>
              <option value="5">5 metros</option>
            </select>
          </div>

          {/* Comentarios e Imagen */}
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