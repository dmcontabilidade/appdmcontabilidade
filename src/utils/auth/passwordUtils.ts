
import { getAllUsers } from '@/utils/users/demoUsers';

export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getAllUsers();
    
    const foundUser = users.find((u: any) => u.email === email);
    
    if (!foundUser) {
      throw new Error('Email não encontrado');
    }
    
    // In a real implementation, this would generate a reset token and send an email
    // For this demo, we'll just reset the password to a default value
    const updatedUsers = users.map((u: any) => {
      if (u.email === email) {
        return { ...u, password: '123456' };
      }
      return u;
    });
    
    localStorage.setItem('accountingAppUsers', JSON.stringify(updatedUsers));
    
    return;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

export const resetAdminPassword = async (): Promise<void> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getAllUsers();
    
    // Reset password only for the main admin
    const adminUser = users.find((u: any) => u.email === 'dmcontabilidadee@gmail.com');
    
    if (!adminUser) {
      throw new Error('Administrador principal não encontrado');
    }
    
    // Reset password for the main admin
    const updatedUsers = users.map((u: any) => {
      if (u.email === 'dmcontabilidadee@gmail.com') {
        return { ...u, password: 'dm@100596' };
      }
      return u;
    });
    
    localStorage.setItem('accountingAppUsers', JSON.stringify(updatedUsers));
    
    return;
  } catch (error) {
    console.error('Reset admin password error:', error);
    throw error;
  }
};
