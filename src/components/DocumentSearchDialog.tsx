
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Document, Category } from '@/types';
import { Search, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DocumentSearchDialogProps {
  onClose?: () => void;
}

const DocumentSearchDialog: React.FC<DocumentSearchDialogProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [results, setResults] = useState<Document[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load documents from localStorage
    const storedDocuments = localStorage.getItem('accountingAppDocuments');
    if (storedDocuments) {
      try {
        const parsedDocs = JSON.parse(storedDocuments);
        setDocuments(parsedDocs);
      } catch (error) {
        console.error('Failed to parse stored documents:', error);
        setDocuments([]);
      }
    }
  }, []); 
  
  useEffect(() => {
    // Filter documents based on search term
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    
    const filteredResults = documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setResults(filteredResults);
  }, [searchTerm, documents]);
  
  const handleDocumentClick = (document: Document) => {
    if (onClose) {
      onClose();
    }
    
    // Navigate to the category that contains this document
    navigate(`/documents/${document.category}`);
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Digite para buscar..."
          className="pl-8"
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="max-h-[400px] overflow-y-auto space-y-2 pr-1">
        {results.length > 0 ? (
          results.map(doc => (
            <div 
              key={doc.id}
              onClick={() => handleDocumentClick(doc)}
              className="flex items-start p-3 border rounded-md hover:bg-accent cursor-pointer"
            >
              <FileText className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-sm">{doc.title}</h4>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {format(new Date(doc.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                </div>
              </div>
            </div>
          ))
        ) : (
          searchTerm.trim() !== '' && (
            <div className="text-center p-4 text-muted-foreground">
              Nenhum documento encontrado para "{searchTerm}"
            </div>
          )
        )}
        
        {searchTerm.trim() === '' && (
          <div className="text-center p-4 text-muted-foreground">
            Digite algo para buscar documentos
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentSearchDialog;
