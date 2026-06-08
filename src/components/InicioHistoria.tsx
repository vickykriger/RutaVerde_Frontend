import React from 'react';
import './InicioHistoria.css';

const Inicio: React.FC = () => {
  return (
    <section className="inicio">
      <div className="inicio-container">
        <div className="inicio-content">
          <p className="inicio-subtitle">Iniciativa · Red Solidaria</p>
          <h1 className="inicio-title">La historia de Ruta Verde</h1>
          <p className="inicio-description">
            Un proyecto que nació de la comunidad para crear un corredor biológico continental con especies nativas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Inicio;
