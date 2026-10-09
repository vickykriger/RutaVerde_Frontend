import React from 'react'
import './BOSidebar.css'

interface Props {
  seccionActiva: string
  onNavegar: (seccion: string) => void
}

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'noticias', label: 'Noticias', icon: '📰' },
  { key: 'aportes', label: 'Aportes', icon: '🌿' },
  { key: 'usuarios', label: 'Usuarios', icon: '👥' },
  { key: 'configuracion', label: 'Configuración', icon: '⚙️' },
]

const BOSidebar: React.FC<Props> = ({ seccionActiva, onNavegar }) => {
  return (
    <aside className="bo-sidebar">
      <div className="bo-sidebar__logo">
        <span className="bo-sidebar__logo-name">RutaVerde</span>
        <span className="bo-sidebar__logo-sub">Backoffice</span>
      </div>

      <nav className="bo-sidebar__nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`bo-sidebar__nav-item${seccionActiva === item.key ? ' bo-sidebar__nav-item--active' : ''}`}
            onClick={() => onNavegar(item.key)}
          >
            <span className="bo-sidebar__nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="bo-sidebar__footer">
        v1.0 · RutaVerde
      </div>
    </aside>
  )
}

export default BOSidebar
