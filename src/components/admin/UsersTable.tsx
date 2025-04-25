
import React from 'react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { deleteUser } from '@/utils/users/demoUsers';
import { toast } from 'sonner';

interface UsersTableProps {
  users: any[];
  onEdit: (user: any) => void;
  onDelete: (updatedUsers: any[]) => void;
  currentUser: any;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete, currentUser }) => {
  const handleDelete = (userId: string) => {
    try {
      if (!currentUser || currentUser.role !== 'admin') {
        toast.error('Apenas administradores podem excluir usuários');
        return;
      }
      
      if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
        const filteredUsers = deleteUser(userId, currentUser);
        onDelete(filteredUsers);
        toast.success('Usuário excluído com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao excluir usuário');
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Mensalidade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.role === 'admin' ? 'Administrador' : 'Cliente'}
              </TableCell>
              <TableCell>
                {user.dueDate ? format(new Date(user.dueDate), "dd/MM/yyyy") : 'Não definido'}
              </TableCell>
              <TableCell>
                {user.monthlyFee ? `R$ ${user.monthlyFee.toFixed(2).replace('.', ',')}` : 'R$ 0,00'}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(user)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(user.id)}
                  className="text-destructive hover:text-destructive/90"
                  disabled={user.email === 'dmcontabilidadee@gmail.com'} // Não permite excluir o admin principal
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
