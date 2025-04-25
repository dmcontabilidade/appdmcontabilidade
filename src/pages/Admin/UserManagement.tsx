
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getAllUsers } from '@/utils/users/demoUsers';
import { UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UsersTable } from '@/components/admin/UsersTable';
import { AddUserDialog } from '@/components/admin/AddUserDialog';
import { EditUserDialog } from '@/components/admin/EditUserDialog';

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { user: loggedUser } = useAuth();
  
  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUsers = () => {
    const loadedUsers = getAllUsers();
    setUsers(loadedUsers);
    console.log('Usuários carregados:', loadedUsers);
  };
  
  const handleEdit = (user: any) => {
    setCurrentUser(user);
    setIsEditDialogOpen(true);
  };
  
  // Verifica se o usuário atual é admin, caso contrário mostra mensagem
  if (!loggedUser || loggedUser.role !== 'admin') {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
        <p className="mb-4">Apenas administradores podem acessar esta página.</p>
        <Button onClick={() => window.history.back()}>Voltar</Button>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>
      
      <UsersTable 
        users={users} 
        onEdit={handleEdit} 
        onDelete={(updatedUsers) => setUsers(updatedUsers)} 
        currentUser={loggedUser}
      />
      
      <AddUserDialog 
        isOpen={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onUserAdded={(updatedUsers) => setUsers(updatedUsers)}
        currentUser={loggedUser}
      />
      
      {currentUser && (
        <EditUserDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={currentUser}
          onUserUpdated={(updatedUsers) => setUsers(updatedUsers)}
          currentUser={loggedUser}
        />
      )}
    </div>
  );
};

export default UserManagement;
