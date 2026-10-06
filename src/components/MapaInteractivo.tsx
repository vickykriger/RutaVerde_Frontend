import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MapaInteractivo.css';
import Mapa from './Mapa';

const MapaInteractivo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="mapa-interactivo">
      <div className="mapa-container">
        <div className="mapa-header">
          <h2 className="mapa-title">Mapa interactivo</h2>
          <p className="mapa-subtitle">
            Visualizá dónde se realizan plantaciones y cómo podés participar.
          </p>
        </div>
        
        <div className="map-visual"  style={{ cursor: 'pointer' }}>
          <Mapa />
        </div>
        </div>
    </section>
  );
};

export default MapaInteractivo;