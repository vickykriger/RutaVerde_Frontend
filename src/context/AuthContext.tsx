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

const AUTH_KEY = 'rutaverde_usuario';

// Campos que el usuario puede editar en su perfil local.
// Estos se persisten separados y sobreviven al logout/login.
const CAMPOS_PERFIL_LOCAL: (keyof Usuario)[] = [
  'apellido',
  'usuario',
  'descripcion',
  'ubicacion',
  'fotoPerfil',
  'primerArbol',
  'arbolesPlantados',
];

/** Guarda los campos editables del perfil para un usuario dado. */
function guardarPerfilLocal(id: number, data: Partial<Usuario>) {
  try {
    const key = `rutaverde_perfil_${id}`;
    const actual = cargarPerfilLocal(id);
    localStorage.setItem(key, JSON.stringify({ ...actual, ...data }));
  } catch {
    // localStorage lleno o bloqueado — no crítico
  }
}

/** Recupera los campos editados localmente para un usuario dado. */
function cargarPerfilLocal(id: number): Partial<Usuario> {
  try {
    const raw = localStorage.getItem(`rutaverde_perfil_${id}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Combina los datos del backend con los cambios locales guardados. */
function mergearConLocal(userData: Usuario): Usuario {
  const local = cargarPerfilLocal(userData.id);
  return { ...userData, ...local };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Sincroniza la sesión activa en localStorage (sin los campos del perfil local,
  // que viven en su propia key y no se borran al hacer logout).
  useEffect(() => {
    if (usuario) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [usuario]);

  /**
   * Login: recibe los datos del backend y los mergea con el perfil local
   * guardado para ese id, de modo que foto, descripción, etc. nunca se pierden.
   */
  const login = (userData: Usuario) => {
    const merged = mergearConLocal(userData);
    setUsuario(merged);
  };

  /**
   * Logout: borra la sesión activa pero NO toca el perfil local
   * (`rutaverde_perfil_<id>`), que sobrevive para el próximo login.
   */
  const logout = () => {
    setUsuario(null);
  };

  /**
   * Actualiza campos del usuario en memoria, en la sesión activa
   * y en el perfil local persistente.
   */
  const updateUsuario = (data: Partial<Usuario>) => {
    setUsuario(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      // Persiste solo los campos editables en la key del perfil local
      const camposEditados = CAMPOS_PERFIL_LOCAL.reduce<Partial<Usuario>>((acc, campo) => {
        if (campo in data) acc[campo] = (data as any)[campo];
        return acc;
      }, {});
      if (Object.keys(camposEditados).length > 0) {
        guardarPerfilLocal(prev.id, camposEditados);
      }
      return updated;
    });
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
