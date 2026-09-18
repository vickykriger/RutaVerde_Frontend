import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { noticias } from '../data/noticias';
import type { Noticia } from '../data/noticias';
import NoticiaModal from './NoticiaModal';
import './PerfilUser.css';

// ── Modal editar perfil ──
interface EditModalProps { onClose: () => void; }

const EditModal: React.FC<EditModalProps> = ({ onClose }) => {
  const { usuario, updateUsuario } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nombre: usuario?.nombre ?? '',
    apellido: usuario?.apellido ?? '',
    usuario: usuario?.usuario ?? '',
    email: usuario?.email ?? '',
    descripcion: usuario?.descripcion ?? '',
    ubicacion: usuario?.ubicacion ?? '',
    primerArbol: usuario?.primerArbol ?? '',
    fotoPerfil: usuario?.fotoPerfil ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, fotoPerfil: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleGuardar = (e: React.FormEvent) => { e.preventDefault(); updateUsuario(form); onClose(); };

  return (
    <div className="pu-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pu-modal" onClick={e => e.stopPropagation()}>
        <div className="pu-modal-header">
          <h2 className="pu-modal-title">Editar perfil</h2>
          <button className="pu-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <form className="pu-modal-form" onSubmit={handleGuardar}>
          <div className="pu-modal-foto-section">
            <div className="pu-modal-foto-preview" onClick={() => fileInputRef.current?.click()} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}>
              {form.fotoPerfil ? <img src={form.fotoPerfil} alt="Foto" /> : (
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
              )}
              <div className="pu-modal-foto-overlay"><span>Cambiar</span></div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFotoChange} />
          </div>
          <div className="pu-modal-row">
            <div className="pu-modal-field"><label>Nombre</label><input name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" /></div>
            <div className="pu-modal-field"><label>Apellido</label><input name="apellido" type="text" value={form.apellido} onChange={handleChange} placeholder="Tu apellido" /></div>
          </div>
          <div className="pu-modal-field"><label>Usuario</label><input name="usuario" type="text" value={form.usuario} onChange={handleChange} placeholder="@tuusuario" /></div>
          <div className="pu-modal-field"><label>Mail</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" /></div>
          <div className="pu-modal-field"><label>Descripción</label><textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Contá algo sobre vos..." rows={3} /></div>
          <div className="pu-modal-field"><label>Ubicación</label><input name="ubicacion" type="text" value={form.ubicacion} onChange={handleChange} placeholder="Ciudad, Provincia" /></div>
          <div className="pu-modal-field"><label>¿Cuándo plantaste tu primer árbol?</label><input name="primerArbol" type="text" value={form.primerArbol} onChange={handleChange} placeholder="Ej: Marzo 2023" /></div>
          <div className="pu-modal-actions">
            <button type="button" className="pu-modal-btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="pu-modal-btn-save">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Modal subir noticia ──
interface SubirNoticiaModalProps { onClose: () => void; }

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

// ── Componente principal ──
const PerfilUser: React.FC = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [modalPerfil, setModalPerfil] = useState(false);
  const [modalNoticia, setModalNoticia] = useState(false);
  const [noticiaAbierta, setNoticiaAbierta] = useState<Noticia | null>(null);

  if (!usuario) return null;

  const nombre = [usuario.nombre, usuario.apellido].filter(Boolean).join(' ');
  const handle = usuario.usuario ? `@${usuario.usuario}` : `@${usuario.nombre.toLowerCase().replace(/\s/g, '')}`;
  const desde = usuario.fechaUnion ?? 'Ruta Verde';

  const handleNoticiaClick = (noti: Noticia) => {
    setNoticiaAbierta(noti);
  };

  const handleNoticiaClose = () => {
    setNoticiaAbierta(null);
    navigate('/newsletter');
  };

  return (
    <div className="pu-page">

      {/* Banner verde */}
      <div className="pu-banner" />

      <div className="pu-body">
        {/* Avatar + botón editar */}
        <div className="pu-top-row">
          <div className="pu-avatar-wrap">
            {usuario.fotoPerfil ? (
              <img src={usuario.fotoPerfil} alt={nombre} className="pu-avatar-img" />
            ) : (
              <div className="pu-avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
          </div>
          <button className="pu-btn-editar" onClick={() => setModalPerfil(true)}>
            Editar Perfil
          </button>
        </div>

        {/* Info */}
        <h1 className="pu-nombre">{nombre}</h1>
        <p className="pu-handle">{handle} · Se unió en {desde}</p>
        {usuario.descripcion && <p className="pu-descripcion">{usuario.descripcion}</p>}
        <div className="pu-meta">
          {usuario.ubicacion && <span className="pu-meta-item">📍 {usuario.ubicacion}</span>}
          {usuario.email && <span className="pu-meta-item">✉️ {usuario.email}</span>}
          {usuario.primerArbol && <span className="pu-meta-item">🌱 Voluntaria desde {usuario.primerArbol}</span>}
        </div>

        {/* ── Subir noticia ── */}
        <div className="pu-section-noticia">
          <div className="pu-section-noticia-header">
            <div>
              <h2 className="pu-section-title">Subir Noticia</h2>
              <p className="pu-section-sub">¡Escribí una noticia para que el resto del mundo vea!</p>
            </div>
            <button className="pu-btn-plus" onClick={() => setModalNoticia(true)} aria-label="Subir noticia">+</button>
          </div>
        </div>

        {/* ── Noticias recomendadas ── */}
        <div className="pu-section-recomendadas">
          <h2 className="pu-section-title">Noticias recomendadas</h2>
          <div className="pu-noticias-grid">
            {noticias.slice(0, 3).map(noti => (
              <article key={noti.id} className="pu-noticia-card" onClick={() => handleNoticiaClick(noti)}>
                <div className="pu-noticia-img-wrap">
                  <img src={noti.imagen} alt={noti.titulo} className="pu-noticia-img" />
                  <span className="pu-noticia-fecha">{noti.fecha}</span>
                </div>
                <div className="pu-noticia-body">
                  <h3 className="pu-noticia-titulo">{noti.titulo}</h3>
                  <p className="pu-noticia-desc">{noti.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Modales */}
      {modalPerfil && <EditModal onClose={() => setModalPerfil(false)} />}
      {modalNoticia && <SubirNoticiaModal onClose={() => setModalNoticia(false)} />}
      {noticiaAbierta && <NoticiaModal noticia={noticiaAbierta} onClose={handleNoticiaClose} />}

      {/* Cerrar sesión */}
      <div className="pu-logout-wrap">
        <button className="pu-btn-logout" onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default PerfilUser;
