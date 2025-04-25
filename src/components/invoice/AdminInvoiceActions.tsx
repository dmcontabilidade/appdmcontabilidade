
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckSquare, AlertCircle, Clock } from 'lucide-react';
import { MonthlyInvoice, InvoiceStatus } from '@/utils/invoiceUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminInvoiceActionsProps {
  invoice: MonthlyInvoice;
  onStatusChange: (invoiceId: string, newStatus: InvoiceStatus) => void;
}

const AdminInvoiceActions: React.FC<AdminInvoiceActionsProps> = ({
  invoice,
  onStatusChange,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full">Alterar Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          {invoice.status !== 'paid' && (
            <DropdownMenuItem 
              className="flex items-center gap-2 text-green-600 hover:bg-green-50 cursor-pointer"
              onClick={() => onStatusChange(invoice.id, 'paid')}
            >
              <CheckSquare size={16} />
              Marcar como Pago
            </DropdownMenuItem>
          )}
          
          {invoice.status !== 'pending' && (
            <DropdownMenuItem 
              className="flex items-center gap-2 text-yellow-600 hover:bg-yellow-50 cursor-pointer"
              onClick={() => onStatusChange(invoice.id, 'pending')}
            >
              <Clock size={16} />
              Marcar como Pendente
            </DropdownMenuItem>
          )}
          
          {invoice.status !== 'overdue' && (
            <DropdownMenuItem 
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 cursor-pointer"
              onClick={() => onStatusChange(invoice.id, 'overdue')}
            >
              <AlertCircle size={16} />
              Marcar como Atrasado
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AdminInvoiceActions;
