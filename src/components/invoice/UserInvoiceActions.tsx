
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { MonthlyInvoice } from '@/utils/invoiceUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface UserInvoiceActionsProps {
  invoice: MonthlyInvoice;
}

const UserInvoiceActions: React.FC<UserInvoiceActionsProps> = ({ invoice }) => {
  const { toast } = useToast();
  
  const copyPixToClipboard = () => {
    navigator.clipboard.writeText('38172155000188');
    toast({
      title: "Chave PIX copiada",
      description: "A chave PIX foi copiada para a área de transferência.",
    });
  };

  return (
    <div className="space-y-3 w-full">
      {invoice.status !== 'paid' && (
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-sm">
            Caso queira pagar por pix, clique no botão para copiar a chave pix
          </AlertDescription>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-full"
            onClick={copyPixToClipboard}
          >
            <Copy size={16} className="mr-1" />
            Copiar chave PIX
          </Button>
        </Alert>
      )}
    </div>
  );
};

export default UserInvoiceActions;
