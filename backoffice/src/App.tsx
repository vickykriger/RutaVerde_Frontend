import React, { useState } from 'react'
import { BackofficeProvider } from './context/BackofficeContext'
import BOSidebar from './components/BOSidebar'
import BOHeader from './components/BOHeader'
import BOLayout from './components/BOLayout'
import Dashboard from './pages/Dashboard'
import Noticias from './pages/Noticias'
import Aportes from './pages/Aportes'
import Usuarios from './pages/Usuarios'
import Configuracion from './pages/Configuracion'
import './App.css'

type Seccion = 'dashboard' | 'noticias' | 'aportes' | 'usuarios' | 'configuracion'

const sectionTitles: Record<Seccion, string> = {
  dashboard: 'Dashboard',
  noticias: 'Noticias',
  aportes: 'Aportes / Baldosas',
  usuarios: 'Usuarios',
  configuracion: 'Configuración',
}

const App: React.FC = () => {
  const [seccion, setSeccion] = useState<Seccion>('dashboard')

  const renderPage = () => {
    switch (seccion) {
      case 'dashboard': return <Dashboard />
      case 'noticias': return <Noticias />
      case 'aportes': return <Aportes />
      case 'usuarios': return <Usuarios />
      case 'configuracion': return <Configuracion />
    }
  }

  return (
    <BackofficeProvider>
      <BOSidebar seccionActiva={seccion} onNavegar={(s) => setSeccion(s as Seccion)} />
      <BOHeader titulo={sectionTitles[seccion]} />
      <BOLayout>
        {renderPage()}
      </BOLayout>
    </BackofficeProvider>
  )
}

export default App
