import React, { useState } from 'react';
import Noticia from './Noticia';
import NoticiaModal from './NoticiaModal';
import { noticias } from '../data/noticias';
import type { Noticia as NoticiaType } from '../data/noticias';
import './CarruNoti.css';

const CarruNoti: React.FC = () => {
  const [noticiaAbierta, setNoticiaAbierta] = useState<NoticiaType | null>(null);
  const primeras3 = noticias.slice(0, 3);

  return (
    <>
      <section className="carru-noti">
        <div className="carru-noti-container">
          <h2 className="carru-noti-headline">Noticias</h2>
          <div className="carru-noti-grid">
            {primeras3.map((noti) => (
              <Noticia
                key={noti.id}
                titulo={noti.titulo}
                imagen={noti.imagen}
                enlace="#"
                onClick={() => setNoticiaAbierta(noti)}
              />
            ))}
          </div>
        </div>
      </section>

      {noticiaAbierta && (
        <NoticiaModal
          noticia={noticiaAbierta}
          onClose={() => setNoticiaAbierta(null)}
        />
      )}
    </>
  );
};

export default CarruNoti;
