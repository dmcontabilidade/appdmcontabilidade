
import React, { useState, useEffect } from 'react';
import { CircleDollarSign } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import InvoiceCard from './invoice/InvoiceCard';
import { MonthlyInvoice, InvoiceStatus, monthNames, generateMockInvoices, updateInvoiceStatus } from '@/utils/invoiceUtils';

interface MonthlyInvoicesProps {
  userId?: string;
}

const MonthlyInvoices: React.FC<MonthlyInvoicesProps> = ({ userId }) => {
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  
  // Get the actual user ID - either from props or from the logged-in user
  const actualUserId = userId || user?.id;
  
  // Use the user ID to generate invoices with the correct due date
  const [invoices, setInvoices] = useState<MonthlyInvoice[]>(() => 
    generateMockInvoices(actualUserId)
  );

  // Function to handle payment status change
  const handlePaymentStatusChange = (invoiceId: string, newStatus: InvoiceStatus) => {
    if (!actualUserId) return;
    
    // Update the invoice status locally
    const updatedInvoices = invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
    );
    
    setInvoices(updatedInvoices);
    
    // Update in persistent storage
    updateInvoiceStatus(actualUserId, invoiceId, newStatus);
    
    // Show success notification
    const statusMessage = newStatus === 'paid' ? 'marcada como paga' : 
                         newStatus === 'pending' ? 'marcada como pendente' : 'marcada como atrasada';
    
    // Use only 'default' or 'destructive' variants for toast
    const toastVariant = newStatus === 'paid' 
      ? 'default' 
      : newStatus === 'pending' 
        ? 'default' 
        : 'destructive';
    
    toast({
      title: "Status atualizado",
      description: `A mensalidade foi ${statusMessage} com sucesso.`,
      variant: toastVariant,
    });
  };

  // Filter invoices based on selected year
  const filteredInvoices = invoices.filter(
    invoice => invoice.year.toString() === selectedYear
  );

  // Get list of available years from invoices
  const availableYears = [...new Set(invoices.map(invoice => invoice.year))].sort((a, b) => b - a);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CircleDollarSign className="text-accounting-500" size={24} />
          Mensalidades
        </h2>
        
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-36">
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {monthNames.map((month, index) => {
          const invoice = filteredInvoices.find(inv => inv.month === index + 1);
          
          return (
            <InvoiceCard
              key={month}
              month={month}
              monthIndex={index}
              invoice={invoice}
              isAdmin={isAdmin()}
              onStatusChange={handlePaymentStatusChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyInvoices;
