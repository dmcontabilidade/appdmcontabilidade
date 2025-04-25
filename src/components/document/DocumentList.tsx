import React from 'react';
import { Document } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash, Eye, FileText } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/hooks/useAuth';

interface DocumentListProps {
  documents: Document[];
  onDocumentDelete?: (documentId: string) => void;
  isAdmin?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  documents, 
  onDocumentDelete,
  isAdmin = false 
}) => {
  const { user } = useAuth();

  if (documents.length === 0) {
    return (
      <div className="text-center p-6 bg-accent/20 rounded-lg">
        <p className="text-muted-foreground">Nenhum documento disponível nesta categoria.</p>
      </div>
    );
  }
  
  const handleDelete = (documentId: string) => {
    if (onDocumentDelete && isAdmin) {
      onDocumentDelete(documentId);
    }
  };

  // Filtra documentos para mostrar apenas os do usuário atual se não for admin
  const filteredDocuments = isAdmin ? documents : documents.filter(doc => doc.userId === user?.id);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDocuments.map((doc) => (
        <Card key={doc.id} className="h-full transition-all hover:shadow-md hover:border-accounting-300 relative">
          {isAdmin && onDocumentDelete && (
            <div className="absolute top-2 right-2 z-10">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                    <Trash className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir documento</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleDelete(doc.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-accounting-500" />
                {doc.title}
              </CardTitle>
              <CardDescription>{doc.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Criado em: {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
              </div>
              <div className="mt-4 text-right">
                <Button variant="ghost" size="sm" className="gap-1 text-accounting-600 hover:text-accounting-700">
                  <Eye size={16} />
                  Visualizar
                </Button>
              </div>
            </CardContent>
          </a>
        </Card>
      ))}
    </div>
  );
};

export default DocumentList;
