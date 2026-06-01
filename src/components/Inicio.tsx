import React from 'react';
import './Inicio.css';

const Inicio: React.FC = () => {
  return (
    <section className="inicio">
      <div className="inicio-container">
        <div className="inicio-content">
          <p className="inicio-subtitle">Iniciativa · Red Solidaria</p>
          <h1 className="inicio-title">Tu guía para plantar el cambio</h1>
          <p className="inicio-description">
            Conectamos comunidades para crear un corredor biológico a lo largo del continente con especies nativas.
          </p>
          <button className="btn-explorar">Explorar mapa</button>
        </div>
        <div className="inicio-map-container">
          <div className="map-wrapper">
             {/* Representación visual del mapa de la imagen */}
             <img src="{{DATA:IMAGE:IMAGE_1}}" alt="Mapa de corredor biológico" className="map-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
