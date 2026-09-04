import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Usuario {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  usuario?: string;
  descripcion?: string;
  ubicacion?: string;
  fotoPerfil?: string;
  primerArbol?: string;
  publicaciones?: number;
  arbolesPlantados?: number;
  viverosFavoritos?: number;
  fechaUnion?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  isLoggedIn: boolean;
  login: (userData: Usuario) => void;
  logout: () => void;
  updateUsuario: (data: Partial<Usuario>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const stored = localStorage.getItem('rutaverde_usuario');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('rutaverde_usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('rutaverde_usuario');
    }
  }, [usuario]);

  const login = (userData: Usuario) => {
    setUsuario(userData);
  };

  const logout = () => {
    setUsuario(null);
  };

  const updateUsuario = (data: Partial<Usuario>) => {
    setUsuario(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ usuario, isLoggedIn: !!usuario, login, logout, updateUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
