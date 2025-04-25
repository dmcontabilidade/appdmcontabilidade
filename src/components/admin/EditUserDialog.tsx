import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from '@/components/ui/form';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import {
  Popover, PopoverContent, PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserForm } from '@/types';
import { updateExistingUser } from '@/utils/users/demoUsers';
import { toast } from 'sonner';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onUserUpdated: (updatedUsers: any[]) => void;
  currentUser: any;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({ 
  isOpen, 
  onOpenChange,
  user,
  onUserUpdated,
  currentUser
}) => {
  const form = useForm<UserForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'client',
      dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString(),
      monthlyFee: 0,
    },
  });
  
  useEffect(() => {
    if (user) {
      form.setValue('name', user.name);
      form.setValue('email', user.email);
      form.setValue('password', '');
      form.setValue('role', user.role);
      form.setValue('dueDate', user.dueDate || new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString());
      form.setValue('monthlyFee', user.monthlyFee || 0);
    }
  }, [user, form]);
  
  const onSubmit = (data: UserForm) => {
    if (!user) return;
    
    try {
      if (!currentUser || currentUser.role !== 'admin') {
        toast.error('Apenas administradores podem editar usuários');
        return;
      }
      
      const updatedUser = {
        ...user,
        name: data.name,
        email: data.email,
        role: data.role,
        dueDate: data.dueDate,
        monthlyFee: data.monthlyFee,
      };
      
      if (data.password && data.password.trim() !== '') {
        updatedUser.password = data.password;
        console.log('Senha atualizada para:', data.password);
      }
      
      const updatedUsers = updateExistingUser(updatedUser, currentUser);
      onUserUpdated(updatedUsers);
      
      toast.success('Usuário atualizado com sucesso!');
      
      if (data.password && data.password.trim() !== '') {
        toast.info(`Senha atualizada para: ${data.password}`);
      }
      
      form.reset();
      onOpenChange(false);
      
      if (currentUser && currentUser.id === user.id) {
        const { password, ...userWithoutPassword } = updatedUser;
        localStorage.setItem('accountingAppUser', JSON.stringify(userWithoutPassword));
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar usuário');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="email@exemplo.com" 
                      type="email" 
                      {...field} 
                      disabled={user?.email === 'dmcontabilidadee@gmail.com'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha (deixe em branco para manter a atual)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nova senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Usuário</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={user?.email === 'dmcontabilidadee@gmail.com'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="client">Cliente</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Vencimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "dd/MM/yyyy")
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date ? date.toISOString() : undefined)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="monthlyFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor da Mensalidade</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">R$</span>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        className="pl-10"
                        placeholder="0,00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
