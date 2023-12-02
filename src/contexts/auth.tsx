import {
  LocalStorageUser,
  USER_LOCAL_STORAGE_KEY,
  getUserStorage,
  removeUserStorage,
  saveUserStorage,
} from '@/services/user-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = LocalStorageUser;

// Definindo um tipo para as funções de autenticação
type AuthContextType = {
  user: User | null;
  login: (loggedInUser: User) => void;
  logout: () => void;
};

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Componente de provedor de autenticação
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userAuthenticated = getUserStorage();
    // get user from banco
    if (userAuthenticated) {
      setUser(userAuthenticated);
    }
  }, []);

  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
    saveUserStorage(loggedInUser);

    window.addEventListener('storage', (event) => {
      if (
        event.key === USER_LOCAL_STORAGE_KEY &&
        event.oldValue !== event.newValue
      ) {
        logout();
      }
    });
  };

  // Função de logout
  const logout = () => {
    // Simplesmente remove o usuário
    setUser(null);
    removeUserStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
