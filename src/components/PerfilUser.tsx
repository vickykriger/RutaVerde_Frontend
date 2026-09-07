import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import './PerfilUser.css';

// ── Actividad mock ──
interface ActividadItem {
  id: number;
  fecha: string;
  titulo: string;
  sub: string;
}

const actividadMock: ActividadItem[] = [
  { id: 1, fecha: '04/8/25', titulo: 'Plantaste una "x"', sub: 'Plantada en la ecorregión "x"' },
  { id: 2, fecha: '04/8/25', titulo: 'Plantaste una "x"', sub: 'Plantada en la ecorregión "x"' },
  { id: 3, fecha: '04/8/25', titulo: 'Plantaste una "x"', sub: 'Plantada en la ecorregión "x"' },
  { id: 4, fecha: '04/8/25', titulo: 'Plantaste una "x"', sub: 'Plantada en la ecorregión "x"' },
  { id: 5, fecha: '04/8/25', titulo: 'Plantaste una "x"', sub: 'Plantada en la ecorregión "x"' },
  { id: 6, fecha: '04/8/25', titulo: 'Plantaste una "x"', sub: 'Plantada en la ecorregión "x"' },
];

// ── Estado vacío ──
const SinInformacion: React.FC = () => (
  <p className="pu-sin-info">Sin información registrada</p>
);

// ── Modal árboles plantados ──
interface ArbolesModalProps {
  onClose: () => void;
}

const ArbolesModal: React.FC<ArbolesModalProps> = ({ onClose }) => {
  const { usuario, updateUsuario } = useAuth();

  const [arboles, setArboles] = useState(usuario?.arbolesPlantados ?? 0);

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    updateUsuario({ arbolesPlantados: arboles });
    onClose();
  };

  return (
    <div className="pu-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Editar árboles plantados">
      <div className="pu-modal" onClick={e => e.stopPropagation()}>
        <div className="pu-modal-header">
          <h2 className="pu-modal-title">Árboles plantados</h2>
          <button className="pu-modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <form className="pu-modal-form" onSubmit={handleGuardar}>
          <div className="pu-modal-field">
            <label htmlFor="arboles-input">¿Cuántos árboles plantaste?</label>
            <input
              id="arboles-input"
              type="number"
              min={0}
              value={arboles}
              onChange={e => setArboles(parseInt(e.target.value, 10) || 0)}
              placeholder="Ej: 42"
            />
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
  const [arbolesModalAbierto, setArbolesModalAbierto] = useState(false);

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

      {/* Estadísticas — solo árboles plantados */}
      <section className="pu-stats">
        <div className="pu-stat-item">
          <span className="pu-stat-num">{usuario.arbolesPlantados ?? 0}</span>
          <span className="pu-stat-label">Árboles plantados</span>
        </div>
        <div className="pu-stat-divider" />
        <div className="pu-stat-center">
          <button
            className="pu-btn-editar-stats"
            onClick={() => setArbolesModalAbierto(true)}
            aria-label="Editar árboles plantados"
          >
            editar
          </button>
        </div>
      </section>

      {/* Tu actividad */}
      <section className="pu-section">
        <h2 className="pu-section-title">Tu actividad</h2>
        {actividadMock.length === 0 ? (
          <SinInformacion />
        ) : (
          <ul className="pu-actividad-list">
            {actividadMock.map(item => (
              <li key={item.id} className="pu-actividad-item">
                <div className="pu-actividad-dot" aria-hidden="true" />
                <div className="pu-actividad-body">
                  <span className="pu-actividad-fecha">{item.fecha}</span>
                  <p className="pu-actividad-titulo">{item.titulo}</p>
                  <p className="pu-actividad-sub">{item.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Cerrar sesión */}
      <div className="pu-logout-wrap">
        <button className="pu-btn-logout" onClick={logout}>Cerrar sesión</button>
      </div>

      {/* Modales */}
      {modalAbierto && <EditModal onClose={() => setModalAbierto(false)} />}
      {arbolesModalAbierto && <ArbolesModal onClose={() => setArbolesModalAbierto(false)} />}
    </div>
  );
};

export default PerfilUser;
