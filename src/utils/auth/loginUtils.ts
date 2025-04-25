
import { User } from '@/types';
import { toast } from 'sonner';
import { getAllUsers } from '@/utils/users/demoUsers';

export const performLogin = async (
  email: string, 
  password: string
): Promise<User | null> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log('Tentando login com:', { email, password });
    
    // Obter os usuários mais recentes do localStorage
    const users = getAllUsers();
    console.log('Usuários disponíveis para login:', users.length);
    console.log('Emails disponíveis para login:', users.map((u: any) => u.email));
    
    // Verificar se tem algum usuário com o email fornecido
    const userWithEmail = users.find((u: any) => u.email === email);
    if (!userWithEmail) {
      console.log('Usuário com email não encontrado:', email);
      throw new Error('Credenciais inválidas');
    } else {
      console.log('Usuário com email encontrado:', userWithEmail);
      // Verificação de senha
      if (userWithEmail.password !== password) {
        console.log('Senha incorreta. Esperado:', userWithEmail.password, 'Fornecido:', password);
        throw new Error('Credenciais inválidas');
      }
    }
    
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      console.log('Usuário não encontrado ou senha incorreta');
      throw new Error('Credenciais inválidas');
    }
    
    console.log('Login bem-sucedido para usuário:', foundUser.email);
    
    const { password: _, ...userWithoutPassword } = foundUser;
    return userWithoutPassword;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
