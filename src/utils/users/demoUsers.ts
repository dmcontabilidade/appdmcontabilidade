// Dados de usuário de demonstração para o sistema
export const DEMO_USERS = [
  {
    id: '3',
    email: 'dmcontabilidadee@gmail.com',
    password: 'dm@100596',
    name: 'Administrador DM',
    role: 'admin' as const,
    dueDate: new Date().toISOString(),
    monthlyFee: 0,
  }
];

// Function to initialize user data if it doesn't exist
export const initializeUserData = () => {
  if (!localStorage.getItem('accountingAppUsers')) {
    localStorage.setItem('accountingAppUsers', JSON.stringify(DEMO_USERS));
    console.log('Dados de usuário de demonstração inicializados:', DEMO_USERS);
  }
  return JSON.parse(localStorage.getItem('accountingAppUsers') || '[]');
};

// Function to reset user data to demo data
export const resetToDemoUsers = () => {
  localStorage.setItem('accountingAppUsers', JSON.stringify(DEMO_USERS));
  console.log('Dados de usuário redefinidos para demonstração:', DEMO_USERS);
  return DEMO_USERS;
};

// Function to get all users
export const getAllUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem('accountingAppUsers') || '[]');
    // Se não houver usuários, vamos garantir que pelo menos o admin existe
    if (!users.length) {
      console.log('Nenhum usuário encontrado, garantindo que admin existe');
      return ensureAdminUserExists();
    }
    return users;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    // Em caso de erro, garantir que pelo menos o admin existe
    return ensureAdminUserExists();
  }
};

// Function to ensure the admin user exists
export const ensureAdminUserExists = () => {
  try {
    const users = getAllUsers();
    const adminUser = users.find((u: any) => u.email === 'dmcontabilidadee@gmail.com');
    
    if (!adminUser) {
      console.log('Administrador principal não encontrado, adicionando administrador');
      const updatedUsers = [...users, DEMO_USERS[0]];
      localStorage.setItem('accountingAppUsers', JSON.stringify(updatedUsers));
      return updatedUsers;
    }
    
    return users;
  } catch (error) {
    console.error('Erro ao verificar administrador:', error);
    return resetToDemoUsers();
  }
};

// Add a new function to save a new user (only admin can do this)
export const saveNewUser = (user: any, currentUser: any) => {
  try {
    // Verificar se o usuário atual é administrador
    if (currentUser?.role !== 'admin') {
      console.error('Apenas administradores podem criar novos usuários');
      throw new Error('Acesso negado: Apenas administradores podem criar novos usuários');
    }
    
    // Obter os dados mais atualizados dos usuários
    const currentUsers = getAllUsers();
    console.log('Usuários atuais antes de salvar:', currentUsers);
    
    // Check if user with same email already exists
    const existingUserIndex = currentUsers.findIndex((u: any) => u.email === user.email);
    if (existingUserIndex >= 0) {
      console.warn('Usuário com este email já existe:', user.email);
      throw new Error('Um usuário com este email já existe');
    }
    
    // Criar cópia do objeto para evitar mutações indesejadas
    const userToSave = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      dueDate: user.dueDate || new Date().toISOString(),
      monthlyFee: user.monthlyFee || 0
    };
    
    // Garantir que estamos adicionando ao array existente
    const updatedUsers = [...currentUsers, userToSave];
    
    // Salvar no localStorage
    localStorage.setItem('accountingAppUsers', JSON.stringify(updatedUsers));
    
    console.log('Novo usuário salvo com sucesso:', userToSave);
    console.log('Usuários atualizados:', updatedUsers);
    console.log('Total de usuários após adicionar:', updatedUsers.length);
    
    return updatedUsers;
  } catch (error) {
    console.error('Erro ao salvar novo usuário:', error);
    throw error;
  }
};

// Add a new function to update an existing user
export const updateExistingUser = (updatedUser: any, currentUser: any) => {
  try {
    // Verificar se o usuário atual é administrador
    if (currentUser?.role !== 'admin') {
      console.error('Apenas administradores podem atualizar usuários');
      throw new Error('Acesso negado: Apenas administradores podem atualizar usuários');
    }
    
    const currentUsers = getAllUsers();
    console.log('Atualizando usuário:', updatedUser);
    console.log('Usuários atuais antes de atualizar:', currentUsers);
    
    const updatedUsers = currentUsers.map((user: any) => 
      user.id === updatedUser.id ? updatedUser : user
    );
    
    localStorage.setItem('accountingAppUsers', JSON.stringify(updatedUsers));
    console.log('Usuário atualizado com sucesso:', updatedUser);
    console.log('Usuários após atualização:', updatedUsers);
    return updatedUsers;
  } catch (error) {
    console.error('Erro ao atualizar usuário existente:', error);
    throw error; // Repassar erro para tratamento adequado no componente
  }
};

// Add a new function to delete a user
export const deleteUser = (userId: string, currentUser: any) => {
  try {
    // Verificar se o usuário atual é administrador
    if (currentUser?.role !== 'admin') {
      console.error('Apenas administradores podem excluir usuários');
      throw new Error('Acesso negado: Apenas administradores podem excluir usuários');
    }
    
    // Não permite excluir o usuário principal admin
    const userToDelete = getAllUsers().find((u: any) => u.id === userId);
    if (userToDelete?.email === 'dmcontabilidadee@gmail.com') {
      console.error('O administrador principal não pode ser excluído');
      throw new Error('O administrador principal não pode ser excluído');
    }
    
    const currentUsers = getAllUsers();
    console.log('Excluindo usuário ID:', userId);
    console.log('Usuários atuais antes de excluir:', currentUsers);
    
    const filteredUsers = currentUsers.filter((user: any) => user.id !== userId);
    localStorage.setItem('accountingAppUsers', JSON.stringify(filteredUsers));
    console.log('Usuário excluído com sucesso:', userId);
    console.log('Usuários após exclusão:', filteredUsers);
    return filteredUsers;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error; // Repassar erro para tratamento adequado no componente
  }
};
