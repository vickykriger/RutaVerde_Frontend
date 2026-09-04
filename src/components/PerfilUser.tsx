import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './PerfilUser.css';

// ── Publicaciones y Viveros mock (se reemplazarán por datos reales) ──
const publicacionesMock = [
  { id: 1, titulo: 'Jornada de plantación en Delta de Tigre', lugar: 'Tigre, Buenos Aires', hace: 'hace 3 días', arboles: 28, voluntarios: 12, img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop' },
  { id: 2, titulo: 'Alianza con Escuela N°12 para baldosas verdes', lugar: 'Córdoba Rd. Av. · Hace 1 semana', hace: 'hace 1 semana', arboles: 26, voluntarios: 12, img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=200&fit=crop' },
  { id: 3, titulo: 'Vivero comunitario en Villa La Ñata', lugar: 'Ciudad de Bs. As. · Hace 4 semanas', hace: 'hace 4 semanas', arboles: 60, voluntarios: 8, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=200&fit=crop' },
];

const viverosMock = [
  { id: 1, nombre: 'Vivero Raíces Nativas', lugar: 'Santiago, Buenos Aires', estrellas: 5, reseñas: 48, img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop', arboles: undefined, voluntarios: undefined },
  { id: 2, nombre: 'Alianza con Escuela N°12 para baldosas verdes', lugar: 'Córdoba Rd. Av. · Hace 1 semana', arboles: 26, voluntarios: 12, img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=200&fit=crop', estrellas: undefined, reseñas: undefined },
  { id: 3, nombre: 'Vivero comunitario en Villa La Ñata', lugar: 'Ciudad de Bs. As. · Hace 4 semanas', arboles: 60, voluntarios: 8, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=200&fit=crop', estrellas: undefined, reseñas: undefined },
];

// ── Componente tarjeta de publicación ──
const TarjetaPublicacion: React.FC<{ item: typeof publicacionesMock[0] }> = ({ item }) => (
  <div className="pu-card">
    <img src={item.img} alt={item.titulo} className="pu-card-img" />
    <div className="pu-card-body">
      <p className="pu-card-titulo">{item.titulo}</p>
      <p className="pu-card-lugar">📍 {item.lugar}</p>
      <p className="pu-card-stats">{item.arboles} árboles · {item.voluntarios} voluntarios</p>
    </div>
  </div>
);

// ── Componente tarjeta de vivero ──
interface ViveroItem {
  id: number;
  nombre: string;
  lugar: string;
  img: string;
  estrellas?: number;
  reseñas?: number;
  arboles?: number;
  voluntarios?: number;
}

const TarjetaVivero: React.FC<{ item: ViveroItem }> = ({ item }) => (
  <div className="pu-card">
    <img src={item.img} alt={item.nombre} className="pu-card-img" />
    <div className="pu-card-body">
      <p className="pu-card-titulo">{item.nombre}</p>
      <p className="pu-card-lugar">📍 {item.lugar}</p>
      {item.estrellas && (
        <p className="pu-card-estrellas">
          {'★'.repeat(item.estrellas)}{'☆'.repeat(5 - item.estrellas)}
          <span className="pu-card-resenas"> ({item.reseñas})</span>
          <span className="pu-card-ver"> Ver vivero</span>
        </p>
      )}
      {item.arboles && (
        <p className="pu-card-stats">{item.arboles} árboles · {item.voluntarios} voluntarios</p>
      )}
    </div>
  </div>
);

// ── Modal de edición de perfil ──
interface EditModalProps {
  onClose: () => void;
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, fotoPerfil: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    updateUsuario(form);
    onClose();
  };

  return (
    <div className="pu-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Editar perfil">
      <div className="pu-modal" onClick={e => e.stopPropagation()}>
        <div className="pu-modal-header">
          <h2 className="pu-modal-title">Editar perfil</h2>
          <button className="pu-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <form className="pu-modal-form" onSubmit={handleGuardar}>
          {/* Foto de perfil */}
          <div className="pu-modal-foto-section">
            <div
              className="pu-modal-foto-preview"
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
              aria-label="Cambiar foto de perfil"
            >
              {form.fotoPerfil ? (
                <img src={form.fotoPerfil} alt="Foto de perfil" />
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
              <div className="pu-modal-foto-overlay">
                <span>Cambiar</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFotoChange}
            />
          </div>

          <div className="pu-modal-row">
            <div className="pu-modal-field">
              <label htmlFor="edit-nombre">Nombre</label>
              <input id="edit-nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
            </div>
            <div className="pu-modal-field">
              <label htmlFor="edit-apellido">Apellido</label>
              <input id="edit-apellido" name="apellido" type="text" value={form.apellido} onChange={handleChange} placeholder="Tu apellido" />
            </div>
          </div>

          <div className="pu-modal-field">
            <label htmlFor="edit-usuario">Usuario</label>
            <input id="edit-usuario" name="usuario" type="text" value={form.usuario} onChange={handleChange} placeholder="@tuusuario" />
          </div>

          <div className="pu-modal-field">
            <label htmlFor="edit-email">Mail</label>
            <input id="edit-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
          </div>

          <div className="pu-modal-field">
            <label htmlFor="edit-descripcion">Descripción</label>
            <textarea
              id="edit-descripcion"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Contá algo sobre vos..."
              rows={3}
            />
          </div>

          <div className="pu-modal-field">
            <label htmlFor="edit-ubicacion">Ubicación</label>
            <input id="edit-ubicacion" name="ubicacion" type="text" value={form.ubicacion} onChange={handleChange} placeholder="Ciudad, Provincia" />
          </div>

          <div className="pu-modal-field">
            <label htmlFor="edit-primerArbol">¿Cuándo plantaste tu primer árbol?</label>
            <input id="edit-primerArbol" name="primerArbol" type="text" value={form.primerArbol} onChange={handleChange} placeholder="Ej: Marzo 2023" />
          </div>

          <div className="pu-modal-actions">
            <button type="button" className="pu-modal-btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="pu-modal-btn-save">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Componente principal PerfilUser ──
const PerfilUser: React.FC = () => {
  const { usuario, logout } = useAuth();
  const [modalAbierto, setModalAbierto] = useState(false);

  if (!usuario) return null;

  const nombre = [usuario.nombre, usuario.apellido].filter(Boolean).join(' ');
  const handle = usuario.usuario ? `@${usuario.usuario}` : `@${usuario.nombre.toLowerCase().replace(/\s/g, '')}`;
  const desde = usuario.fechaUnion ?? 'Ruta Verde';

  return (
    <div className="pu-page">
      {/* Tarjeta de perfil */}
      <section className="pu-perfil-card">
        <div className="pu-perfil-inner">
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

          <div className="pu-perfil-info">
            <div className="pu-perfil-top">
              <div>
                <h1 className="pu-nombre">{nombre}</h1>
                <p className="pu-handle">{handle} · Se unió en {desde}</p>
              </div>
              <button className="pu-btn-editar" onClick={() => setModalAbierto(true)}>
                Editar Perfil
              </button>
            </div>

            {usuario.descripcion && (
              <p className="pu-descripcion">{usuario.descripcion}</p>
            )}

            <div className="pu-meta">
              {usuario.ubicacion && (
                <span className="pu-meta-item">📍 {usuario.ubicacion}</span>
              )}
              {usuario.email && (
                <span className="pu-meta-item">✉️ {usuario.email}</span>
              )}
              {usuario.primerArbol && (
                <span className="pu-meta-item">🌱 Voluntaria desde {usuario.primerArbol}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="pu-stats">
        <div className="pu-stat-item">
          <span className="pu-stat-num">{usuario.publicaciones ?? 0}</span>
          <span className="pu-stat-label">Publicaciones</span>
        </div>
        <div className="pu-stat-item">
          <span className="pu-stat-num">{usuario.arbolesPlantados ?? 0}</span>
          <span className="pu-stat-label">Árboles plantados</span>
        </div>
        <div className="pu-stat-item">
          <span className="pu-stat-num">{usuario.viverosFavoritos ?? 0}</span>
          <span className="pu-stat-label">Viveros favoritos</span>
        </div>
      </section>

      {/* Mis publicaciones */}
      <section className="pu-section">
        <h2 className="pu-section-title">Mis publicaciones</h2>
        <p className="pu-section-sub">Las plantaciones que subiste al corredor biológico.</p>
        <div className="pu-grid">
          {publicacionesMock.map(p => <TarjetaPublicacion key={p.id} item={p} />)}
        </div>
      </section>

      {/* Viveros favoritos */}
      <section className="pu-section">
        <h2 className="pu-section-title">Viveros favoritos</h2>
        <p className="pu-section-sub">Los viveros de especies nativas que guardaste.</p>
        <div className="pu-grid">
          {viverosMock.map(v => <TarjetaVivero key={v.id} item={v} />)}
        </div>
      </section>

      {/* Cerrar sesión */}
      <div className="pu-logout-wrap">
        <button className="pu-btn-logout" onClick={logout}>Cerrar sesión</button>
      </div>

      {/* Modal editar */}
      {modalAbierto && <EditModal onClose={() => setModalAbierto(false)} />}
    </div>
  );
};

export default PerfilUser;
