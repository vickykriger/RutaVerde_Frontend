import React from 'react';
import './InicioNews.css';

const InicioNews: React.FC = () => {
  return (
    <section className="inicio-news">
      <div className="inicio-news-container">
        <div className="inicio-news-content">
          <h1 className="inicio-news-title">"Biocorredor Tahalú avanza en la Red Verde SER — Chacarita"</h1>
          <p className="inicio-news-description">
            El corredor biológico avanza en la región chaqueña con más de 200 nuevas plantas nativas.
          </p>
          <p className="inicio-news-meta">Marzo 2025 · 4 min de lectura</p>
          <button className="btn-leer-nota">Leer nota →</button>
        </div>
      </div>
    </section>
  );
};

export default InicioNews;
