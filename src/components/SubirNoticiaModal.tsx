import React, { useState, useRef } from 'react';

interface SubirNoticiaModalProps {
  onClose: () => void;
}

const SubirNoticiaModal: React.FC<SubirNoticiaModalProps> = ({ onClose }) => {
  const fotoInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ titulo: '', contenido: '', foto: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, foto: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handlePublicar = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <div className="pu-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pu-modal pu-modal-noticia" onClick={e => e.stopPropagation()}>
        <div className="pu-modal-header">
          <h2 className="pu-modal-title">Subir noticia</h2>
          <button className="pu-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        {enviado ? (
          <div className="pu-noticia-enviada">
            <p className="pu-noticia-enviada-icon">✅</p>
            <p className="pu-noticia-enviada-titulo">¡Noticia enviada!</p>
            <p className="pu-noticia-enviada-sub">Ruta Verde la revisará antes de publicarla en el newsletter general.</p>
            <button className="pu-modal-btn-save" style={{ marginTop: '1.5rem' }} onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <form className="pu-modal-form" onSubmit={handlePublicar}>
            <div className="pu-modal-field">
              <label>Título</label>
              <input name="titulo" type="text" value={form.titulo} onChange={handleChange} placeholder="Título de la noticia" required />
            </div>

            <div className="pu-modal-field">
              <label>Foto de portada</label>
              <div
                className="pu-foto-portada"
                onClick={() => fotoInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && fotoInputRef.current?.click()}
              >
                {form.foto ? (
                  <img src={form.foto} alt="Portada" className="pu-foto-portada-img" />
                ) : (
                  <div className="pu-foto-portada-placeholder">
                    <span>📷</span>
                    <p>Hacé click para elegir una imagen</p>
                  </div>
                )}
              </div>
              <input ref={fotoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFoto} />
            </div>

            <div className="pu-modal-field">
              <label>Contenido</label>
              <textarea name="contenido" value={form.contenido} onChange={handleChange} placeholder="Escribí el contenido de tu noticia..." rows={7} required />
            </div>

            <div className="pu-publicar-wrap">
              <button type="submit" className="pu-btn-publicar">Publicar</button>
              <p className="pu-publicar-aviso">Una vez la noticia fue enviada, deberá ser aprobada por Ruta Verde para aparecer en el newsletter general.</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubirNoticiaModal;