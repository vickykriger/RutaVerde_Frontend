import React, { useState, useEffect } from 'react';
import { obtenerEcorregiones, type Ecorregion } from '../data/ecorregiones';
import './ListaEcorregiones.css';

interface ListaProps {
  regionSeleccionada?: Ecorregion | null;
}

const ListaEcorregiones: React.FC<ListaProps> = ({ regionSeleccionada }) => {
  const [ecorregiones, setEcorregiones] = useState<Ecorregion[]>([]);
  const [activa, setActiva] = useState<Ecorregion | null>(null);

  useEffect(() => {
    obtenerEcorregiones().then((data) => setEcorregiones(data));
  }, []); useEffect(() => {
    if (regionSeleccionada && ecorregiones.length > 0) {
      const regMap = regionSeleccionada as any;

      const nombreBuscado = (
        regMap.NOMBRE ||
        regMap.ECO_NAME ||
        regMap.nombre ||
        ''
      ).toString().toLowerCase().trim();

      const idBuscado = (
        regMap.ECO_ID ||
        regMap.id_region ||
        regMap.id ||
        ''
      ).toString().trim();

      const encontrada = ecorregiones.find((item) => {
        const nombreItem = item.nombre ? item.nombre.toLowerCase().trim() : '';
        const idItem = item.id ? item.id.toString().trim() : '';

        const coincideNombre = Boolean(nombreBuscado) && (nombreItem.includes(nombreBuscado) || nombreBuscado.includes(nombreItem));
        const coincideId = Boolean(idBuscado) && idItem === idBuscado;

        return coincideNombre || coincideId;
      });

      if (encontrada) {
        setActiva(encontrada);

        setTimeout(() => {
          const el = document.getElementById(`eco-${encontrada.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    }
  }, [regionSeleccionada, ecorregiones]);

  const handleClick = (eco: Ecorregion) => {
    setActiva((prev) => (prev?.id === eco.id ? null : eco));
  };

  const ecorregionesOrdenadas = [...ecorregiones].sort((a, b) => {
    if (activa?.id === a.id) return -1;
    if (activa?.id === b.id) return 1;
    return 0;
  });
  return (
  <div className="lista-eco">
    <div className="lista-eco-header">
      <p className="lista-eco-titulo">Ecorregiones de América Latina</p>
    </div>

    <div className="lista-eco-scroll">
      {/* 2. Mapeamos la lista reordenada en lugar de la original */}
      {ecorregionesOrdenadas.map((eco) => (
        <React.Fragment key={eco.id}>
          <div
            id={`eco-${eco.id}`}
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