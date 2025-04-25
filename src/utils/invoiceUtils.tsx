
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MonthlyInvoice, InvoiceStatus } from "@/types";

// Re-export the types so they can be imported from this file
export type { MonthlyInvoice, InvoiceStatus };

export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 
  'Maio', 'Junho', 'Julho', 'Agosto', 
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const getStatusBadge = (status: InvoiceStatus) => {
  switch (status) {
    case 'paid':
      return <Badge variant="outline" className="border-green-500 text-green-600 bg-green-100">Pago</Badge>;
    case 'pending':
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600 bg-yellow-100">Pendente</Badge>;
    case 'overdue':
      return <Badge variant="outline" className="border-red-500 text-red-600 bg-red-100">Atrasado</Badge>;
    default:
      return null;
  }
};

// Storage key for saved invoice statuses
const INVOICE_STATUS_STORAGE_KEY = 'accountingAppInvoiceStatuses';

// Function to update invoice status and persist it
export const updateInvoiceStatus = (
  userId: string,
  invoiceId: string,
  newStatus: InvoiceStatus
): boolean => {
  try {
    // Get current saved statuses
    const savedStatuses = JSON.parse(
      localStorage.getItem(INVOICE_STATUS_STORAGE_KEY) || '{}'
    );
    
    // Update or create the entry for this userId
    if (!savedStatuses[userId]) {
      savedStatuses[userId] = {};
    }
    
    // Save the new status for this invoice
    savedStatuses[userId][invoiceId] = newStatus;
    
    // Persist to localStorage
    localStorage.setItem(INVOICE_STATUS_STORAGE_KEY, JSON.stringify(savedStatuses));
    
    return true;
  } catch (error) {
    console.error('Error updating invoice status:', error);
    return false;
  }
};

// Função para gerar faturas baseadas no ID do usuário
export const generateMockInvoices = (userId?: string): MonthlyInvoice[] => {
  if (!userId) return [];
  
  // Busca o usuário específico para obter a data de vencimento e valor de mensalidade
  const users = JSON.parse(localStorage.getItem('accountingAppUsers') || '[]');
  const user = users.find((u: any) => u.id === userId);
  
  // Extrai dia de vencimento e valor da mensalidade do usuário
  const dueDateDay = user?.dueDate 
    ? new Date(user.dueDate).getDate() 
    : 10; // Default: dia 10
  
  const monthlyFee = user?.monthlyFee || 300; // Usa o valor definido ou um valor padrão
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const invoices: MonthlyInvoice[] = [];
  
  // Load saved statuses for this user
  const savedStatuses = JSON.parse(
    localStorage.getItem(INVOICE_STATUS_STORAGE_KEY) || '{}'
  );
  const userStatuses = savedStatuses[userId] || {};
  
  // Gera faturas para todos os meses do ano atual
  for (let month = 0; month < 12; month++) {
    const year = currentYear;
    
    // Create invoice ID
    const invoiceId = `invoice-${userId}-${year}-${month + 1}`;
    
    // Determina o status da fatura
    const invoiceDate = new Date(year, month, dueDateDay);
    const today = new Date();
    
    // Check if there's a saved status for this invoice
    let status: InvoiceStatus;
    if (userStatuses[invoiceId]) {
      status = userStatuses[invoiceId];
    } else {
      // Use default logic if no saved status
      if (invoiceDate < today) {
        status = Math.random() > 0.5 ? 'paid' : 'overdue';
      } else {
        status = 'pending';
      }
    }
    
    invoices.push({
      id: invoiceId,
      month: month + 1,
      year: year,
      amount: monthlyFee,
      dueDate: invoiceDate.toISOString(),
      status: status,
      documentUrl: status === 'paid' ? '#documento-exemplo' : undefined
    });
  }
  
  return invoices;
};
