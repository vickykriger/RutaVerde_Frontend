
import React from 'react';
import Noticia from './Noticia';
import './CarruNoti.css';

const CarruNoti: React.FC = () => {
  const noticias = [
    {
      id: 1,
      titulo: 'Nueva ruta en el noreste argentino: el corredor biológico avanza en el Chaco',
      imagen: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop', // Placeholder representativo
      enlace: '#'
    },
    {
      id: 2,
      titulo: 'Biocorredor Paul Groussac crece en El Talar, Tigre',
      imagen: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000&auto=format&fit=crop', // Placeholder representativo
      enlace: '#'
    },
    {
      id: 3,
      titulo: 'Plaza ARA Gral. Belgrano se suma en Necocheca',
      imagen: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1000&auto=format&fit=crop', // Placeholder representativo
      enlace: '#'
    }
  ];

  return (
    <section className="carru-noti">
      <div className="carru-noti-container">
        <h2 className="carru-noti-headline">Últimas noticias</h2>
        <div className="carru-noti-grid">
          {noticias.map((noti) => (
            <Noticia 
              key={noti.id}
              titulo={noti.titulo}
              imagen={noti.imagen}
              enlace={noti.enlace}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarruNoti;