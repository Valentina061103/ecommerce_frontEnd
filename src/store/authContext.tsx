import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getUserFromToken } from '../services/authService';

// Tipo de datos que va a tener nuestro contenido
interface AuthContextType {
  token: string | null;
  user: Usuario | null;
  loadingUser: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: Usuario | null) => void;
  logout: () => void;
}
interface Usuario {
  nombre: string;
  email: string;
  dni: string;
  rol: string;
}


// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUserState] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loadingUser, setLoadingUser] = useState(true);


  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setUser = (user: Usuario | null) => {
    setUserState(user);
    console.log("Usuario seteado:", user);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };


  const logout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const cargarUsuario = async () => {
      if (token) {
        try {
          const userData = await getUserFromToken();
          setUser(userData);
        } catch (err) {
          console.error('Token inválido, cerrando sesión');
          logout();
        }
      }
      setLoadingUser(false);
    };

    cargarUsuario();
  }, [token]);

  
  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser, logout , loadingUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};


