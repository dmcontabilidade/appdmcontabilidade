
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
};

export type Category = 
  | 'documentos_cnpj' 
  | 'guia_impostos' 
  | 'folha_pagamento' 
  | 'certidoes' 
  | 'mensalidade' 
  | 'outras_solicitacoes'
  | 'simples_nacional'
  | 'lucro_presumido'
  | 'lucro_real'
  | 'parcelamentos'
  | 'das_simples'
  | 'difal'
  | 'guia_inss'
  | 'guia_fgts'
  | 'ferias'
  | 'holerite'
  | 'federal'
  | 'estadual'
  | 'cnd_federal'
  | 'cnd_estadual'
  | 'cnd_municipal'
  | 'cnd_trabalhista'
  | 'outros_documentos'       
  | 'imposto_renda'          
  | 'documentos_pessoais'     
  | 'outros_documentos_sub'   
  | 'cartao_cnpj'             
  | 'contrato_social'         
  | 'inscricao_estadual'      
  | 'sugestao_melhorias'
  | 'gerenciamento_usuarios'    // New admin category
  | 'gerenciamento_documentos'  // New admin category
  | 'gerenciamento_mensalidades';  // New admin category

export type CategoryInfo = {
  id: Category;
  title: string;
  description: string;
  icon: string;
  parentId?: Category;
};

export type Document = {
  id: string;
  title: string;
  description: string;
  category: Category;
  url: string;
  createdAt: string;
  userId: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  resetPassword: (email: string) => Promise<void>;
  resetAdminPasswords: () => Promise<void>;
};

export type UserForm = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client';
  dueDate?: string; // Data de vencimento
  monthlyFee?: number; // Valor da mensalidade
};

export type InvoiceStatus = 'paid' | 'pending' | 'overdue';

export type MonthlyInvoice = {
  id: string;
  month: number;
  year: number;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  documentUrl?: string;
};
