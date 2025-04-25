
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { getAllUsers } from '@/utils/users/demoUsers';
import { InvoiceStatus, MonthlyInvoice, generateMockInvoices, getStatusBadge, monthNames, updateInvoiceStatus } from '@/utils/invoiceUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminInvoiceActions from '@/components/invoice/AdminInvoiceActions';

const InvoiceManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [userInvoices, setUserInvoices] = useState<MonthlyInvoice[]>([]);
  const { user: currentUser } = useAuth();
  const isMobile = useIsMobile();
  
  // Load users on component mount
  useEffect(() => {
    const loadedUsers = getAllUsers();
    setUsers(loadedUsers.filter(user => user.role === 'client'));
  }, []);
  
  // Load invoices when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const invoices = generateMockInvoices(selectedUser);
      setUserInvoices(invoices);
    } else {
      setUserInvoices([]);
    }
  }, [selectedUser]);
  
  // Filter invoices based on selected year
  const filteredInvoices = userInvoices.filter(
    invoice => invoice.year.toString() === selectedYear
  );
  
  // Get list of available years from invoices
  const availableYears = [...new Set(userInvoices.map(invoice => invoice.year))].sort((a, b) => b - a);
  
  // Handle invoice status change
  const handleStatusChange = (invoiceId: string, newStatus: InvoiceStatus) => {
    if (!selectedUser) return;
    
    // Atualiza o estado local
    const updatedInvoices = userInvoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
    );
    
    setUserInvoices(updatedInvoices);
    
    // Atualiza no armazenamento persistente
    const updated = updateInvoiceStatus(selectedUser, invoiceId, newStatus);
    
    const statusMessage = newStatus === 'paid' ? 'marcada como paga' : 
                         newStatus === 'pending' ? 'marcada como pendente' : 'marcada como atrasada';
    
    if (updated) {
      toast.success(`Mensalidade ${statusMessage} com sucesso.`);
    } else {
      toast.error(`Erro ao atualizar o status da mensalidade.`);
      // Recarrega as faturas para garantir consistência de dados
      const refreshedInvoices = generateMockInvoices(selectedUser);
      setUserInvoices(refreshedInvoices);
    }
  };
  
  // Get user name by ID
  const getUserName = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Usuário desconhecido';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="text-lg">Selecione um cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedUser} 
              onValueChange={setSelectedUser} 
              disabled={users.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {selectedUser && (
          <Card className="w-full md:w-1/3">
            <CardHeader>
              <CardTitle className="text-lg">Selecione o ano</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}
      </div>
      
      {selectedUser && filteredInvoices.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Mensalidades de {getUserName(selectedUser)} - {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mês</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {monthNames[invoice.month - 1]}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        R$ {invoice.amount.toFixed(2).replace('.', ',')}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(invoice.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <AdminInvoiceActions 
                            invoice={invoice}
                            onStatusChange={handleStatusChange}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : selectedUser ? (
        <div className="text-center p-6">
          <p className="text-muted-foreground">Nenhuma mensalidade encontrada para o período selecionado.</p>
        </div>
      ) : (
        <div className="text-center p-6">
          <p className="text-muted-foreground">Selecione um cliente para visualizar suas mensalidades.</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;
