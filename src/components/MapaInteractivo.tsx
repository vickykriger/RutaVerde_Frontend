import React from 'react';
import './MapaInteractivo.css';

const MapaInteractivo: React.FC = () => {
  return (
    <section className="mapa-interactivo">
      <div className="mapa-container">
        <div className="mapa-header">
          <h2 className="mapa-title">Mapa interactivo</h2>
          <p className="mapa-subtitle">
            Visualizá dónde se realizan plantaciones y cómo podés participar.
          </p>
        </div>
        
        <div className="map-visual">
          <div className="map-overlay-text">
            Mapa interactivo · Corredor Biológico Nacional
          </div>
          
          {/* Marcadores simulados basándose en la imagen */}
          <div className="marker green m1"></div>
          <div className="marker green m2"></div>
          <div className="marker green m3"></div>
          <div className="marker red m4"></div>
          <div className="marker green m5"></div>
          <div className="marker green m6"></div>
          <div className="marker red m7"></div>
        </div>
      </div>
    </section>
  );
};

export default MapaInteractivo;