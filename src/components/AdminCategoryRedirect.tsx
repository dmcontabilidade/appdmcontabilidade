
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface AdminCategoryRedirectProps {
  children: React.ReactNode;
}

const AdminCategoryRedirect: React.FC<AdminCategoryRedirectProps> = ({ children }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if this is an admin user accessing specific categories
    if (isAdmin()) {
      if (categoryId === 'mensalidade') {
        navigate('/gerenciamento_mensalidades');
      } else if (categoryId === 'gerenciamento_usuarios') {
        navigate('/gerenciamento_usuarios');
      } else if (categoryId === 'gerenciamento_documentos') {
        navigate('/gerenciamento_documentos');
      } else if (categoryId === 'gerenciamento_mensalidades') {
        navigate('/gerenciamento_mensalidades');
      }
    }
  }, [categoryId, isAdmin, navigate]);
  
  return <>{children}</>;
};

export default AdminCategoryRedirect;
