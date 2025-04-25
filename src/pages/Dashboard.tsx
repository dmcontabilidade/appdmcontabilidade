
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { CategoryInfo } from '@/types';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();

  // Regular user categories
  const regularCategories: CategoryInfo[] = [
    {
      id: 'documentos_cnpj',
      title: 'Documentos CNPJ',
      description: 'Acesse seus documentos de CNPJ e informações cadastrais',
      icon: 'file',
    },
    {
      id: 'guia_impostos',
      title: 'Guia de Impostos',
      description: 'Consulte suas guias de impostos e obrigações fiscais',
      icon: 'file-text',
    },
    {
      id: 'folha_pagamento',
      title: 'Folha de Pagamento',
      description: 'Acesse os documentos relacionados à folha de pagamento',
      icon: 'users',
    },
    {
      id: 'certidoes',
      title: 'Certidões',
      description: 'Visualize suas certidões e documentos de regularidade',
      icon: 'check-circle',
    },
    {
      id: 'mensalidade',
      title: 'Mensalidade',
      description: 'Acompanhe suas mensalidades e pagamentos',
      icon: 'dollar-sign',
    },
    {
      id: 'outras_solicitacoes',
      title: 'Outras Solicitações',
      description: 'Faça solicitações adicionais para o escritório',
      icon: 'mail-question',
    },
    {
      id: 'outros_documentos',
      title: 'Outros Documentos',
      description: 'Acesse outros documentos importantes',
      icon: 'folder',
    },
    {
      id: 'sugestao_melhorias',
      title: 'Sugestão de Melhorias',
      description: 'Envie sugestões para melhorar nosso portal',
      icon: 'message-circle',
    },
  ];

  // Admin-specific categories - directly linked to separate management pages
  const adminCategories: CategoryInfo[] = [
    {
      id: 'gerenciamento_usuarios',
      title: 'Gerenciamento de Usuários',
      description: 'Administre as contas e permissões dos usuários do sistema',
      icon: 'users',
    },
    {
      id: 'gerenciamento_documentos',
      title: 'Gerenciamento de Documentos',
      description: 'Administre os documentos disponíveis no sistema',
      icon: 'file-text',
    },
    {
      id: 'gerenciamento_mensalidades',
      title: 'Gerenciamento de Mensalidades',
      description: 'Administre as mensalidades e pagamentos dos clientes',
      icon: 'circle-dollar-sign',
    },
  ];

  // Choose which categories to display based on user role
  // For admins, we show only admin categories
  const mainCategories = user?.role === 'admin' ? adminCategories : regularCategories;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gold-50 to-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <header className="text-center mb-6 md:mb-10 animate-fade-up">
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-dm-900`}>
            Bem-vindo, {user?.name}
          </h1>
          <p className={`text-muted-foreground mt-2 ${isMobile ? 'text-sm' : ''}`}>
            {user?.role === 'admin' ? 
              'Acesse as ferramentas administrativas do sistema' : 
              'Acesse seus documentos e informações contábeis'}
          </p>
          <div className="mt-4">
            <Button 
              variant="outline" 
              size={isMobile ? "sm" : "default"}
              className="border-gold-300 text-dm-800 hover:bg-gold-100 hover:text-dm-900"
              onClick={logout}
            >
              <LogOut className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} mr-2`} />
              Sair da conta
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {mainCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              delay={index}
            />
          ))}
        </div>
      </main>
      
      <footer className="mt-auto py-4 md:py-6 text-center text-xs md:text-sm text-muted-foreground border-t border-gold-200">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} DM Contabilidade. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
