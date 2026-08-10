import React, { useState } from 'react';
import { ecorregiones } from '../data/ecorregiones';
import type { Ecorregion } from '../data/ecorregiones';
import './ListaEcorregiones.css';

const ListaEcorregiones: React.FC = () => {
  const [activa, setActiva] = useState<Ecorregion | null>(null);

  const handleClick = (eco: Ecorregion) => {
    setActiva(activa?.id === eco.id ? null : eco);
  };

  return (
    <div className="lista-eco">
      <div className="lista-eco-header">
        <p className="lista-eco-titulo">Ecorregiones de América Latina</p>
      </div>

      <div className="lista-eco-scroll">
        {ecorregiones.map((eco) => (
          <React.Fragment key={eco.id}>
            <div
              className={`eco-item ${activa?.id === eco.id ? 'activo' : ''}`}
              onClick={() => handleClick(eco)}
            >
              <p className="eco-item-nombre">{eco.nombre}</p>
              <p className="eco-item-paises">{eco.paises}</p>
            </div>

            {activa?.id === eco.id && (
              <div className="eco-detalle">
                <p className="eco-detalle-nombre">{eco.nombre}</p>
                <p className="eco-detalle-resumen">{eco.resumen}</p>
                <div className="eco-detalle-tags">
                  <span className="eco-tag">{eco.bioma}</span>
                  <span className="eco-tag">{eco.superficie}</span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListaEcorregiones;
