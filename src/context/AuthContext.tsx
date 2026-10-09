import { createContext, useContext, useMemo, useState } from 'react';

// Interfaz alineada exactamente con la tabla "Usuarios" de la BD
export interface Usuario {
  id_usuario: number;
  nombreC: string;
  email: string;
  contrasena?: string;
  fechaR?: string;
  id_rol?: number;
  id_region?: number;
  fotoPerfil?: string;
  [key: string]: any;
}

interface AuthContextValue {
  usuario: Usuario | null;
  isLoggedIn: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
  updateUsuario: (usuario: Partial<Usuario>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'ruta-verde-usuario';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const guardado = window.localStorage.getItem(STORAGE_KEY);
      return guardado ? (JSON.parse(guardado) as Usuario) : null;
    } catch {
      return null;
    }
  });

  const login = (nuevoUsuario: Usuario) => {
    setUsuario(nuevoUsuario);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoUsuario));
  };

  const logout = () => {
    const seguro = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (seguro) {
      setUsuario(null);
      window.localStorage.removeItem(STORAGE_KEY);
      console.log("Sesión cerrada correctamente");
    } else {
      console.log("Acción cancelada");
    }
  };

  const updateUsuario = (datos: Partial<Usuario>) => {
    setUsuario((prev) => {
      const siguiente = prev ? { ...prev, ...datos } : (datos as Usuario);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(siguiente));
      return siguiente;
    });
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      usuario,
      isLoggedIn: Boolean(usuario),
      login,
      logout,
      updateUsuario,
    }),
    [usuario],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
}