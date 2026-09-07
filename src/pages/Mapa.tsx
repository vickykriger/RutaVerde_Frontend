import React, { useState } from 'react';
import Header from '../components/Header';
import MapaComponente from '../components/Mapa';
import ListaEcorregiones from '../components/ListaEcorregiones';
import type { Ecorregion } from '../data/ecorregiones';
import '../components/MapaPage.css';

export default function Mapa() {
  const [regionSeleccionada, setRegionSeleccionada] = useState<Ecorregion | null>(null);

  return (
    <>
      <Header />
      <main className="mapa-page">
        <div className="mapa-layout">
          {/* Lado izquierdo: mapa */}
          <div className="mapa-izquierda">
            <div className="mapa-placeholder">
              <MapaComponente onSeleccionarRegion={setRegionSeleccionada} />
            </div>
          </div>

          {/* Lado derecho: lista de ecorregiones */}
          <div className="mapa-derecha">
            <ListaEcorregiones regionSeleccionada={regionSeleccionada} />
          </div>
        </div>
      </main>
    </>
  );
}