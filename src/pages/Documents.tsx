import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AdminCategoryRedirect from '@/components/AdminCategoryRedirect';
import OutrasSolicitacoes from '@/components/document/OutrasSolicitacoes';
import SugestaoMelhorias from '@/components/document/SugestaoMelhorias';
import CategoryNav from '@/components/document/CategoryNav';
import SubcategoriesGrid from '@/components/document/SubcategoriesGrid';
import DocumentList from '@/components/document/DocumentList';
import Navbar from '@/components/Navbar';
import { categories } from '@/utils/categories/categoryData';
import { getSubcategories, getParentInfo } from '@/utils/categories/categoryUtils';
import MonthlyInvoices from '@/components/MonthlyInvoices';
import { Category } from '@/types';
import { useAuth } from '@/hooks/useAuth';

const Documents = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { user, isAuthenticated } = useAuth();
  
  // Redireciona para login se não estiver autenticado
  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Carregar documentos do localStorage
  const loadDocuments = () => {
    const storedDocuments = localStorage.getItem('accountingAppDocuments');
    if (!storedDocuments) return [];
    
    try {
      const allDocuments = JSON.parse(storedDocuments);
      // Filtrar documentos pela categoria atual e pelo ID do usuário
      return allDocuments.filter(doc => 
        doc.category === categoryId && 
        doc.userId === user?.id
      );
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
      return [];
    }
  };
  
  if (!categoryId || !categories[categoryId as Category]) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
          <p>A categoria solicitada não foi encontrada.</p>
        </div>
      </>
    );
  }
  
  const category = categories[categoryId as Category];
  const subcategories = getSubcategories(categoryId as Category);
  const { parentLink, parentName } = getParentInfo(categoryId as Category);
  
  // Carregar documentos específicos do usuário para esta categoria
  const userDocuments = loadDocuments();
  
  let content;
  
  if (categoryId === 'outras_solicitacoes') {
    content = <OutrasSolicitacoes />;
  } else if (categoryId === 'sugestao_melhorias') {
    content = <SugestaoMelhorias />;
  } else if (categoryId === 'mensalidade') {
    content = <MonthlyInvoices userId={user?.id} />;
  } else {
    content = (
      <div className="space-y-8">
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Subcategorias</h2>
            <SubcategoriesGrid subcategories={subcategories} />
          </div>
        )}
        
        {userDocuments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Documentos desta categoria</h2>
            <DocumentList 
              documents={userDocuments}
              isAdmin={false} // Garante que usuários normais não podem excluir documentos
            />
          </div>
        )}
        
        {subcategories.length === 0 && userDocuments.length === 0 && (
          <div className="text-center p-6 bg-accent/20 rounded-lg">
            <p className="text-muted-foreground">Nenhum documento disponível nesta categoria.</p>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <AdminCategoryRedirect>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gold-50 to-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <CategoryNav 
            currentCategory={category} 
            parentLink={parentLink} 
            parentName={parentName} 
          />
          
          <div className="mt-6">
            <h1 className="text-2xl md:text-3xl font-bold">{category.title}</h1>
            <p className="text-muted-foreground mt-2">{category.description}</p>
            
            <div className="mt-6">
              {content}
            </div>
          </div>
        </main>
      </div>
    </AdminCategoryRedirect>
  );
};

export default Documents;
