import { Document } from '@/types';

// Mock documents data
export const mockedDocuments: Document[] = [
  {
    id: "1",
    title: "Contrato Social",
    description: "Documento de contrato social da empresa",
    category: "documentos_cnpj",
    url: "/dummy-document.pdf",
    createdAt: "2023-01-20T14:30:00Z",
    userId: "1"
  },
  {
    id: "2",
    title: "Cartão CNPJ",
    description: "Cartão de inscrição no Cadastro Nacional da Pessoa Jurídica",
    category: "documentos_cnpj",
    url: "/dummy-document.pdf",
    createdAt: "2023-01-20T14:30:00Z",
    userId: "1"
  },
  {
    id: "3",
    title: "DAS - Janeiro 2024",
    description: "Documento de Arrecadação do Simples Nacional - Janeiro 2024",
    category: "das_simples",
    url: "/dummy-document.pdf",
    createdAt: "2024-02-10T09:00:00Z",
    userId: "1"
  },
  {
    id: "4",
    title: "DAS - Fevereiro 2024",
    description: "Documento de Arrecadação do Simples Nacional - Fevereiro 2024",
    category: "das_simples",
    url: "/dummy-document.pdf",
    createdAt: "2024-03-10T09:00:00Z",
    userId: "1"
  },
  {
    id: "5",
    title: "DAS - Março 2024",
    description: "Documento de Arrecadação do Simples Nacional - Março 2024",
    category: "das_simples",
    url: "/dummy-document.pdf",
    createdAt: "2024-04-10T09:00:00Z",
    userId: "1"
  },
  {
    id: "6",
    title: "Guia INSS - Janeiro 2024",
    description: "Guia de Recolhimento do INSS - Janeiro 2024",
    category: "guia_inss",
    url: "/dummy-document.pdf",
    createdAt: "2024-02-15T11:00:00Z",
    userId: "1"
  },
  {
    id: "7",
    title: "Guia INSS - Fevereiro 2024",
    description: "Guia de Recolhimento do INSS - Fevereiro 2024",
    category: "guia_inss",
    url: "/dummy-document.pdf",
    createdAt: "2024-03-15T11:00:00Z",
    userId: "1"
  },
  {
    id: "8",
    title: "Holerite - Janeiro 2024",
    description: "Holerite do funcionário - Janeiro 2024",
    category: "holerite",
    url: "/dummy-document.pdf",
    createdAt: "2024-02-28T16:00:00Z",
    userId: "1"
  },
  {
    id: "9",
    title: "Holerite - Fevereiro 2024",
    description: "Holerite do funcionário - Fevereiro 2024",
    category: "holerite",
    url: "/dummy-document.pdf",
    createdAt: "2024-03-28T16:00:00Z",
    userId: "1"
  },
  {
    id: "10",
    title: "CND Federal",
    description: "Certidão Negativa de Débitos Federais",
    category: "cnd_federal",
    url: "/dummy-document.pdf",
    createdAt: "2023-05-01T08:00:00Z",
    userId: "1"
  },
  {
    id: "11",
    title: "IRPF 2025",
    description: "Declaração de Imposto de Renda Pessoa Física - Ano Base 2024",
    category: "imposto_renda",
    url: "/dummy-document.pdf",
    createdAt: "2023-06-15T10:00:00Z",
    userId: "1"
  },
  {
    id: "12",
    title: "RG - João da Silva",
    description: "Documento de identidade de João da Silva",
    category: "documentos_pessoais",
    url: "/dummy-document.pdf",
    createdAt: "2023-07-22T18:00:00Z",
    userId: "1"
  },
  {
    id: "13",
    title: "Comprovante de Residência",
    description: "Comprovante de residência atualizado",
    category: "outros_documentos_sub",
    url: "/dummy-document.pdf",
    createdAt: "2023-08-10T12:00:00Z",
    userId: "1"
  },
];
