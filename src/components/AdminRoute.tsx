
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Verificar se o usuário atual é o administrador com email específico
  const isMainAdmin = user?.email === 'dmcontabilidadee@gmail.com';
  
  if (!isAdmin() || !isMainAdmin) {
    return (
      <div className="container mx-auto p-8 max-w-4xl">
        <Alert variant="destructive" className="mb-4">
          <Shield className="h-4 w-4" />
          <AlertTitle>Acesso Restrito</AlertTitle>
          <AlertDescription>
            Esta área é restrita ao administrador principal. Você não tem permissão para acessar esta página.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center mt-4">
          <a href="/dashboard" className="text-primary hover:underline">
            Voltar para o Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
