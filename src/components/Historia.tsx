import React, { useState } from 'react';
import './Historia.css';

const Historia: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const timelineEvents = [
    {
      year: '2023',
      title: 'El inicio de la "Ruta 33"',
      description: 'Alumnos del Instituto América plantan 200 árboles nativos en Rivadavia, dando inicio a uno de los primeros tramos bajo la guía de Red Solidaria.'
    },
    {
      year: '2024',
      title: 'Encuentro en River Plate',
      description: 'Juan Carr convoca a docentes y voluntarios en el Club River Plate para formalizar el proyecto. Se establece la meta de plantar 33 árboles por cada niño que nace.'
    },
    {
      year: '2025',
      title: 'Inauguración Reserva El Potrero',
      description: 'Se inaugura una "baldosa" clave en Gualeguaychú con la plantación de 710 árboles nativos, consolidando el corredor biológico en el litoral argentino.'
    },
    {
      year: '2025',
      title: 'Hackatón FADU - UBA',
      description: '400 estudiantes de diseño de la UBA crean la identidad visual y sistemas de señalización open source para que cualquier persona pueda identificar su "baldosa verde".'
    },
    {
      year: '2026',
      title: 'Expansión Regional (UPSO)',
      description: 'La Universidad Provincial del Sudoeste se suma para georreferenciar cada punto de la ruta en un mapa digital, permitiendo el seguimiento en tiempo real del corredor.'
    }
  ];

  const faqs = [
    {
      question: '¿Qué es Ruta Verde?',
      answer: 'Ruta Verde es una iniciativa ciudadana que busca crear un corredor biológico nacional a través de la plantación de árboles nativos, conectando comunidades y restaurando la biodiversidad local.'
    },
    {
      question: '¿Cómo se qué plantar?',
      answer: 'Dependiendo de tu región, existen diferentes especies nativas que son ideales para mantener el ecosistema. Te recomendamos consultar nuestra guía de especies según la zona geográfica.'
    },
    {
      question: '¿Cómo se donde y como plantar?',
      answer: 'Contamos con un mapa de zonas prioritarias. Para plantar, debes asegurar un espacio con buen drenaje, cavar un pozo del doble del tamaño del terrón y regar abundantemente al finalizar.'
    },
    {
      question: '¿A quién recurro si necesito ayuda?',
      answer: 'Puedes contactar a los coordinadores regionales de Red Solidaria o unirte a los grupos de voluntarios locales a través de nuestras redes sociales.'
    },
    {
      question: '¿Cómo subo mi baldosa?',
      answer: 'Utiliza el formulario de "Subir Baldosa" en nuestra plataforma, adjunta una foto de tu plantación y completa los datos de la especie y ubicación para que aparezca en el mapa nacional.'
    }
  ];

  return (
    <div className="historia-container">
      <section className="section-content">
        <h2 className="section-title">Comienzos</h2>
        <p className="text-paragraph">
          Lorem ipsum dolor sit amet consectetur adipiscing elit vehicula risus, donec venenatis magnis leo egestas habitant metus natoque curae per, mollis gravida luctus penatibus lacinia potenti nisl metus. Conubia donec etiam vivamus urna risus blandit quisque dignissim nam luctus, dictumst justo quis fames non proin nostra nisl. Dapibus aenean urna malesuada quam mus, vestibulum venenatis egestas convallis cursus lobortis, natorque eleifend etiam vitae.
        </p>
        <p className="text-paragraph">
          Varius netus nam ligula dictum condimentum mauris senectus etiam ac, facilisi rutrum cum nibh non in mus et, curabitur quisque at morbi pellentesque id tincidunt nascetur. Fames a purus accumsan at nibh id libero vulputate at tempus inceptos, gravida morbi nulla molestie quam viverra ultricies odio rhoncus interdum. Urna clase tincidunt condimentum diam arcu dignissim vel, pharetra per mollis dictumst scelerisque ac at montes, netus ante sociis venenatis sociosqu phasellus. Gravida fusce donec torquent ad et cras a massa, fames duis eu iaculis rhoncus nullam pretium, vitae blandit sapien suscipit facilisi odio risus.
        </p>
      </section>

      <section className="section-content">
        <h2 className="section-title">Historia</h2>
        <p className="text-paragraph">
          Lorem ipsum dolor sit amet consectetur adipiscing elit vehicula risus, donec venenatis magnis leo egestas habitant metus natoque curae per, mollis gravida luctus penatibus lacinia potenti nisl metus. Conubia donec etiam vivamus urna risus blandit quisque dignissim nam luctus, dictumst justo quis fames non proin nostra nisl. Dapibus aenean urna malesuada quam mus, vestibulum venenatis egestas convallis cursus lobortis, natorque eleifend etiam vitae.
        </p>
        <p className="text-paragraph">
          Varius netus nam ligula dictum condimentum mauris senectus etiam ac, facilisi rutrum cum nibh non in mus et, curabitur quisque at morbi pellentesque id tincidunt nascetur. Fames a purus accumsan at nibh id libero vulputate at tempus inceptos, gravida morbi nulla molestie quam viverra ultricies odio rhoncus interdum. Urna clase tincidunt condimentum diam arcu dignissim vel, pharetra per mollis dictumst scelerisque ac at montes, netus ante sociis venenatis sociosqu phasellus. Gravida fusce donec torquent ad et cras a massa, fames duis eu iaculis rhoncus nullam pretium, vitae blandit sapien suscipit facilisi odio risus.
        </p>
      </section>

      <div className="banner-logo-container">
        <div className="banner-ruta-verde">
          <span className="banner-text">RUTA VERDE</span>
        </div>
      </div>

      <section className="timeline-section">
        <h2 className="section-title">Línea de tiempo</h2>
        <div className="timeline-list">
          {timelineEvents.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">{event.year}</span>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-header">
          <h2 className="faq-title">Preguntas frecuentes</h2>
          <p className="faq-subtitle">Todo lo que necesitás saber sobre Ruta Verde y cómo participar.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question-btn" 
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                <span className="faq-question-text">{faq.question}</span>
                <div className={`faq-icon ${openFaq === index ? 'is-open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </button>
              <div className={`faq-answer ${openFaq === index ? 'is-visible' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Historia;