
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { MonthlyInvoice, InvoiceStatus, getStatusBadge } from '@/utils/invoiceUtils';
import UserInvoiceActions from './UserInvoiceActions';
import AdminInvoiceActions from './AdminInvoiceActions';
import { useIsMobile } from '@/hooks/use-mobile';

interface InvoiceCardProps {
  month: string;
  monthIndex: number;
  invoice?: MonthlyInvoice;
  isAdmin: boolean;
  onStatusChange: (invoiceId: string, newStatus: InvoiceStatus) => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ 
  month, 
  monthIndex, 
  invoice, 
  isAdmin, 
  onStatusChange
}) => {
  const isMobile = useIsMobile();
  
  // Format due date to Brazilian format (DD/MM/YYYY)
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const getCardBgColor = () => {
    if (!invoice) return '';
    
    switch (invoice.status) {
      case 'paid':
        return 'border-green-200 bg-green-50/30';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50/30';
      case 'overdue':
        return 'border-red-200 bg-red-50/30';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    if (!invoice) return '';
    
    switch (invoice.status) {
      case 'paid':
        return 'Mensalidade quitada';
      case 'pending':
        return 'Mensalidade pendente';
      case 'overdue':
        return 'Mensalidade em atraso';
      default:
        return '';
    }
  };

  return (
    <Card className={`transition-all ${getCardBgColor()}`}>
      <CardHeader className={`pb-2 ${isMobile ? 'p-3' : ''}`}>
        <div className="flex justify-between items-start">
          <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} flex items-center gap-1`}>
            <Calendar size={isMobile ? 14 : 16} className="text-muted-foreground" />
            {month}
          </CardTitle>
          {invoice && getStatusBadge(invoice.status)}
        </div>
        {invoice && (
          <CardDescription className={isMobile ? 'text-xs' : ''}>
            Vencimento: {formatDueDate(invoice.dueDate)}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className={isMobile ? 'p-3 pt-0' : ''}>
        {invoice ? (
          <div className="space-y-2">
            <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-accounting-600`}>
              R$ {invoice.amount.toFixed(2).replace('.', ',')}
            </p>
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
              {getStatusText()}
            </p>
          </div>
        ) : (
          <div className="py-2">
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
              Não há mensalidade para este mês.
            </p>
          </div>
        )}
      </CardContent>
      
      {invoice && (
        <CardFooter className={`flex flex-col gap-2 pt-0 w-full ${isMobile ? 'p-3' : ''}`}>
          <div className="w-full">
            {/* Regular user actions */}
            {!isAdmin && <UserInvoiceActions invoice={invoice} />}
            
            {/* Admin payment management actions */}
            {isAdmin && (
              <AdminInvoiceActions 
                invoice={invoice} 
                onStatusChange={onStatusChange}
              />
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default InvoiceCard;
