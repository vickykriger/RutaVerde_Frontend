import Header from '../components/Header';
import ListaEcorregiones from '../components/ListaEcorregiones';
import '../components/MapaPage.css';

export default function Mapa() {
  return (
    <>
      <Header />
      <main className="mapa-page">
        <div className="mapa-layout">
          {/* Lado izquierdo: mapa */}
          <div className="mapa-izquierda">
            <div className="mapa-placeholder">
              {/* Aquí va Mapa.tsx cuando esté disponible */}
              <p className="mapa-placeholder-label">Corredor Biológico Nacional</p>
            </div>
          </div>

          {/* Lado derecho: lista de ecorregiones */}
          <div className="mapa-derecha">
            <ListaEcorregiones />
          </div>
        </div>
      </main>

    </>
  );
}
