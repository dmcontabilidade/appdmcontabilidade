
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User } from '@/types';
import { toast } from 'sonner';
import { initializeUserData, ensureAdminUserExists } from '@/utils/users/demoUsers';
import { getUsers } from '@/utils/auth/authUtils';
import { performLogin } from '@/utils/auth/loginUtils';
import { resetUserPassword, resetAdminPassword } from '@/utils/auth/passwordUtils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider initializing...');
    // Initialize users in localStorage if not already there
    initializeUserData();
    
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('accountingAppUser');
    console.log('Stored user found:', !!storedUser);
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('accountingAppUser');
      }
    }
    
    // Always ensure we have the admin user
    const users = ensureAdminUserExists();
    console.log('Users after initialization:', users.length);
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const loggedInUser = await performLogin(email, password);
      
      // Atualizar estado e localStorage
      setUser(loggedInUser);
      localStorage.setItem('accountingAppUser', JSON.stringify(loggedInUser));
      
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer login');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accountingAppUser');
    navigate('/');
    toast.info('Logout realizado com sucesso');
  };
  
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      await resetUserPassword(email);
      toast.success('Senha redefinida com sucesso! A nova senha é: 123456');
      navigate('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao redefinir senha');
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetAdminPasswords = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await resetAdminPassword();
      toast.success('Senha do administrador redefinida com sucesso! A nova senha é: dm@100596');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao redefinir senha do administrador');
      console.error('Reset admin password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        isAdmin,
        resetPassword,
        resetAdminPasswords,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
