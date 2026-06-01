import React from 'react';
import './Noticia.css';

interface NoticiaProps {
  imagen: string;
  titulo: string;
  enlace: string;
}

const Noticia: React.FC<NoticiaProps> = ({ imagen, titulo, enlace }) => {
  return (
    <article className="noticia-card">
      <div className="noticia-image-container">
        <img src={imagen} alt={titulo} className="noticia-image" />
      </div>
      <div className="noticia-content">
        <h3 className="noticia-title">{titulo}</h3>
        <a href={enlace} className="noticia-link">
          Leer más <span className="arrow">→</span>
        </a>
      </div>
    </article>
  );
};

export default Noticia;