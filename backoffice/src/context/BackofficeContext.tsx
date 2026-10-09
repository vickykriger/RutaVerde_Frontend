import { createContext, useContext, useState, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { NoticiaBO, AporteBO, UsuarioBO } from '../types'
import { mockNoticias, mockAportes, mockUsuarios } from '../data/mockData'

interface ActividadItem {
  id: number
  texto: string
  fecha: string
  tipo: 'noticia' | 'aporte' | 'usuario'
}

interface BackofficeContextValue {
  noticias: NoticiaBO[]
  aportes: AporteBO[]
  usuarios: UsuarioBO[]
  actividadReciente: ActividadItem[]
  // Noticia actions
  aprobarNoticia: (id: number) => void
  rechazarNoticia: (id: number) => void
  restaurarNoticia: (id: number) => void
  despublicarNoticia: (id: number) => void
  eliminarNoticia: (id: number) => void
  editarNoticia: (id: number, campos: Partial<NoticiaBO>) => void
  // Aporte actions
  aprobarAporte: (id: number) => void
  rechazarAporte: (id: number) => void
  eliminarAporte: (id: number) => void
  // Usuario actions
  toggleActivoUsuario: (id: number) => void
  cambiarRolUsuario: (id: number, nuevoRol: number) => void
  eliminarUsuario: (id: number) => void
}

const BackofficeContext = createContext<BackofficeContextValue | null>(null)

export const BackofficeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [noticias, setNoticias] = useState<NoticiaBO[]>(mockNoticias)
  const [aportes, setAportes] = useState<AporteBO[]>(mockAportes)
  const [usuarios, setUsuarios] = useState<UsuarioBO[]>(mockUsuarios)
  const [actividadReciente, setActividadReciente] = useState<ActividadItem[]>([])

  const addActividad = (texto: string, tipo: ActividadItem['tipo']) => {
    setActividadReciente(prev => [
      { id: Date.now(), texto, fecha: new Date().toLocaleString('es-AR'), tipo },
      ...prev.slice(0, 19),
    ])
  }

  const value = useMemo<BackofficeContextValue>(() => ({
    noticias,
    aportes,
    usuarios,
    actividadReciente,

    aprobarNoticia: (id) => {
      setNoticias(prev => prev.map(n => n.id === id ? { ...n, estado: 'publicada' } : n))
      addActividad(`Noticia #${id} aprobada`, 'noticia')
    },
    rechazarNoticia: (id) => {
      setNoticias(prev => prev.map(n => n.id === id ? { ...n, estado: 'papelera' } : n))
      addActividad(`Noticia #${id} enviada a papelera`, 'noticia')
    },
    restaurarNoticia: (id) => {
      setNoticias(prev => prev.map(n => n.id === id ? { ...n, estado: 'pendiente' } : n))
      addActividad(`Noticia #${id} restaurada`, 'noticia')
    },
    despublicarNoticia: (id) => {
      setNoticias(prev => prev.map(n => n.id === id ? { ...n, estado: 'papelera' } : n))
      addActividad(`Noticia #${id} despublicada`, 'noticia')
    },
    eliminarNoticia: (id) => {
      setNoticias(prev => prev.filter(n => n.id !== id))
      addActividad(`Noticia #${id} eliminada permanentemente`, 'noticia')
    },
    editarNoticia: (id, campos) => {
      setNoticias(prev => prev.map(n => n.id === id ? { ...n, ...campos } : n))
      addActividad(`Noticia #${id} editada`, 'noticia')
    },

    aprobarAporte: (id) => {
      setAportes(prev => prev.map(a => a.id === id ? { ...a, estado: 'aprobado' } : a))
      addActividad(`Aporte #${id} aprobado`, 'aporte')
    },
    rechazarAporte: (id) => {
      setAportes(prev => prev.map(a => a.id === id ? { ...a, estado: 'rechazado' } : a))
      addActividad(`Aporte #${id} rechazado`, 'aporte')
    },
    eliminarAporte: (id) => {
      setAportes(prev => prev.filter(a => a.id !== id))
      addActividad(`Aporte #${id} eliminado`, 'aporte')
    },

    toggleActivoUsuario: (id) => {
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u))
      addActividad(`Usuario #${id} actualizado`, 'usuario')
    },
    cambiarRolUsuario: (id, nuevoRol) => {
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, id_rol: nuevoRol } : u))
      addActividad(`Rol de usuario #${id} cambiado`, 'usuario')
    },
    eliminarUsuario: (id) => {
      setUsuarios(prev => prev.filter(u => u.id !== id))
      addActividad(`Usuario #${id} eliminado`, 'usuario')
    },
  }), [noticias, aportes, usuarios, actividadReciente])

  return (
    <BackofficeContext.Provider value={value}>
      {children}
    </BackofficeContext.Provider>
  )
}

export const useBackoffice = (): BackofficeContextValue => {
  const ctx = useContext(BackofficeContext)
  if (!ctx) throw new Error('useBackoffice must be used within BackofficeProvider')
  return ctx
}
