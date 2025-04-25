
import React from 'react';
import { Button } from '@/components/ui/button';
import { resetToDemoUsers } from '@/utils/users/demoUsers';
import { toast } from 'sonner';
import { RefreshCcw } from 'lucide-react';

const ResetDemoData: React.FC = () => {
  const handleReset = () => {
    resetToDemoUsers();
    toast.success('Dados de demonstração restaurados com sucesso!');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleReset}
      className="flex items-center gap-2"
    >
      <RefreshCcw className="h-4 w-4" />
      Resetar dados demo
    </Button>
  );
};

export default ResetDemoData;
