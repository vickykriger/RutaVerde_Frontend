import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

const Inicio: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="inicio">
      <div className="inicio-container">
        <div className="inicio-content">
          <p className="inicio-subtitle">Iniciativa · Red Solidaria</p>
          <h1 className="inicio-title">Tu guía para plantar el cambio</h1>
          <p className="inicio-description">
            Conectamos comunidades para crear un corredor biológico a lo largo del continente con especies nativas.
          </p>
          <button className="btn-explorar" onClick={() => navigate('/mapa')}>Explorar mapa</button>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
