import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from '@/components/ui/form';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
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
import { Document, Category, CategoryInfo } from '@/types';
import { getUsers } from '@/utils/auth/authUtils';
import { toast } from 'sonner';
import { FileUp, Trash, Search, FolderTree, Download, FolderSync, Eye } from 'lucide-react';
import { categories } from '@/utils/categories/categoryData';
import { Link } from 'react-router-dom';
import { ensureAdminUserExists } from '@/utils/users/demoUsers';

const mockCategories: Record<string, CategoryInfo> = categories;

const getCategoryOptions = (categoriesObj: Record<string, CategoryInfo>, parentId?: string): CategoryInfo[] => {
  return Object.values(categoriesObj)
    .filter(category => category.parentId === parentId)
    .sort((a, b) => a.title.localeCompare(b.title));
};

const getFlatCategoryOptions = (categoriesObj: Record<string, CategoryInfo>): {id: string, title: string}[] => {
  const result: {id: string, title: string}[] = [];
  
  const topLevel = getCategoryOptions(categoriesObj);
  topLevel.forEach(category => {
    result.push({id: category.id, title: category.title});
    
    const subCategories = getCategoryOptions(categoriesObj, category.id);
    subCategories.forEach(subCategory => {
      result.push({id: subCategory.id, title: `${category.title} > ${subCategory.title}`});
      
      const subSubCategories = getCategoryOptions(categoriesObj, subCategory.id);
      subSubCategories.forEach(subSubCategory => {
        result.push({id: subSubCategory.id, title: `${category.title} > ${subCategory.title} > ${subSubCategory.title}`});
      });
    });
  });
  
  return result;
};

interface DocumentForm {
  title: string;
  description: string;
  category: string;
  userId: string;
  url: string;
}

const DocumentManagement = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isQuickUploadOpen, setIsQuickUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('none');
  const [filterCategory, setFilterCategory] = useState('none');
  const [isDeleteCategoryDocsOpen, setIsDeleteCategoryDocsOpen] = useState(false);
  const [categoryToDeleteDocs, setCategoryToDeleteDocs] = useState<string>('');
  
  const form = useForm<DocumentForm>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      userId: '',
      url: '',
    },
  });
  
  const quickUploadForm = useForm<DocumentForm>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      userId: '',
      url: '',
    },
  });
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    try {
      ensureAdminUserExists();
      const loadedUsers = getUsers();
      console.log('Loaded users for document management:', loadedUsers);
      
      const clientUsers = loadedUsers.filter(u => u.role === 'client');
      console.log('Client users available:', clientUsers.length);
      
      if (clientUsers.length === 0) {
        toast.error('Nenhum usuário cliente encontrado. Por favor, adicione um usuário cliente primeiro.');
      }
      
      setUsers(loadedUsers);
      
      const storedDocuments = localStorage.getItem('accountingAppDocuments');
      if (storedDocuments) {
        try {
          setDocuments(JSON.parse(storedDocuments));
        } catch (error) {
          console.error('Failed to parse stored documents:', error);
          setDocuments([]);
          localStorage.setItem('accountingAppDocuments', JSON.stringify([]));
        }
      } else {
        setDocuments([]);
        localStorage.setItem('accountingAppDocuments', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erro ao carregar dados. Por favor, recarregue a página.');
    }
  };
  
  const onSubmit = (data: DocumentForm) => {
    try {
      const documentUrl = selectedFile 
        ? URL.createObjectURL(selectedFile) 
        : 'https://via.placeholder.com/150';
      
      const newDocument: Document = {
        id: (Math.random() * 1000000).toFixed(0),
        title: data.title,
        description: data.description,
        category: data.category as Category,
        userId: data.userId,
        url: documentUrl,
        createdAt: new Date().toISOString(),
      };
      
      const existingDocuments = localStorage.getItem('accountingAppDocuments');
      let updatedDocuments: Document[] = [];
      
      if (existingDocuments) {
        try {
          updatedDocuments = JSON.parse(existingDocuments);
        } catch (error) {
          console.error('Error parsing existing documents:', error);
          updatedDocuments = [];
        }
      }
      
      updatedDocuments.push(newDocument);
      
      localStorage.setItem('accountingAppDocuments', JSON.stringify(updatedDocuments));
      
      setDocuments(updatedDocuments);
      
      toast.success('Documento adicionado com sucesso!');
      form.reset();
      setSelectedFile(null);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Erro ao adicionar documento. Por favor, tente novamente.');
    }
  };
  
  const onQuickUploadSubmit = (data: DocumentForm) => {
    try {
      const documentUrl = selectedFile 
        ? URL.createObjectURL(selectedFile) 
        : 'https://via.placeholder.com/150';
      
      const newDocument: Document = {
        id: (Math.random() * 1000000).toFixed(0),
        title: data.title,
        description: data.description,
        category: data.category as Category,
        userId: data.userId,
        url: documentUrl,
        createdAt: new Date().toISOString(),
      };
      
      const existingDocuments = localStorage.getItem('accountingAppDocuments');
      let updatedDocuments: Document[] = [];
      
      if (existingDocuments) {
        try {
          updatedDocuments = JSON.parse(existingDocuments);
        } catch (error) {
          console.error('Error parsing existing documents:', error);
          updatedDocuments = [];
        }
      }
      
      updatedDocuments.push(newDocument);
      
      localStorage.setItem('accountingAppDocuments', JSON.stringify(updatedDocuments));
      
      setDocuments(updatedDocuments);
      
      toast.success('Documento adicionado com sucesso!');
      quickUploadForm.reset();
      setSelectedFile(null);
      setIsQuickUploadOpen(false);
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Erro ao adicionar documento. Por favor, tente novamente.');
    }
  };
  
  const handleDelete = (documentId: string) => {
    const filteredDocuments = documents.filter(doc => doc.id !== documentId);
    localStorage.setItem('accountingAppDocuments', JSON.stringify(filteredDocuments));
    setDocuments(filteredDocuments);
    toast.success('Documento excluído com sucesso!');
  };
  
  const handleDeleteCategoryDocuments = () => {
    if (!categoryToDeleteDocs) {
      toast.error('Selecione uma categoria para excluir os documentos');
      return;
    }
    
    const categoryDocs = documents.filter(doc => doc.category === categoryToDeleteDocs as Category);
    
    if (categoryDocs.length === 0) {
      toast.info('Nenhum documento encontrado para esta categoria');
      setIsDeleteCategoryDocsOpen(false);
      return;
    }
    
    const filteredDocuments = documents.filter(doc => doc.category !== categoryToDeleteDocs as Category);
    localStorage.setItem('accountingAppDocuments', JSON.stringify(filteredDocuments));
    setDocuments(filteredDocuments);
    
    const categoryOption = getFlatCategoryOptions(mockCategories)
      .find(cat => cat.id === categoryToDeleteDocs);
    const categoryName = categoryOption ? categoryOption.title : categoryToDeleteDocs;
    
    toast.success(`Todos os documentos da categoria ${categoryName} foram excluídos (${categoryDocs.length} documentos)`);
    setIsDeleteCategoryDocsOpen(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const currentForm = isQuickUploadOpen ? quickUploadForm : form;
      if (!currentForm.getValues('title')) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        currentForm.setValue('title', fileName);
      }
    }
  };
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = filterUser === 'none' ? true : doc.userId === filterUser;
    const matchesCategory = filterCategory === 'none' ? true : doc.category === filterCategory;
    return matchesSearch && matchesUser && matchesCategory;
  });
  
  const flatCategoryOptions = getFlatCategoryOptions(mockCategories);
  
  const hasClientUsers = users.filter(u => u.role === 'client').length > 0;
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Documentos</h1>
        <div className="flex space-x-2">
          <AlertDialog open={isDeleteCategoryDocsOpen} onOpenChange={setIsDeleteCategoryDocsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <FolderSync className="mr-2 h-4 w-4" />
                Excluir por Categoria
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Documentos por Categoria</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Todos os documentos da categoria selecionada serão permanentemente removidos.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <Select
                  value={categoryToDeleteDocs}
                  onValueChange={setCategoryToDeleteDocs}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {flatCategoryOptions.map(option => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteCategoryDocuments}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Excluir Todos os Documentos
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Dialog open={isQuickUploadOpen} onOpenChange={setIsQuickUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Upload Rápido
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Rápido de Documento</DialogTitle>
              </DialogHeader>
              {!hasClientUsers ? (
                <div className="text-center py-4">
                  <p className="text-destructive mb-2">Nenhum usuário cliente encontrado</p>
                  <p className="text-sm text-muted-foreground">
                    Por favor, adicione um usuário cliente na seção de gerenciamento de usuários.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => {
                      setIsQuickUploadOpen(false);
                      navigate('/admin/users');
                    }}
                  >
                    Ir para Gerenciamento de Usuários
                  </Button>
                </div>
              ) : (
                <Form {...quickUploadForm}>
                  <form onSubmit={quickUploadForm.handleSubmit(onQuickUploadSubmit)} className="space-y-4">
                    <FormItem>
                      <FormLabel>Arquivo</FormLabel>
                      <Input 
                        type="file" 
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground">
                          Arquivo selecionado: {selectedFile.name}
                        </p>
                      )}
                    </FormItem>
                    
                    <FormField
                      control={quickUploadForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título do documento" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={quickUploadForm.control}
                      name="userId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usuário</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value || ''}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um usuário" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {users.filter(u => u.role === 'client').map(user => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={quickUploadForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value || ''}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-80">
                              {flatCategoryOptions.map(option => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Adicionar</Button>
                    </DialogFooter>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Adicionar Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Documento</DialogTitle>
              </DialogHeader>
              {!hasClientUsers ? (
                <div className="text-center py-4">
                  <p className="text-destructive mb-2">Nenhum usuário cliente encontrado</p>
                  <p className="text-sm text-muted-foreground">
                    Por favor, adicione um usuário cliente na seção de gerenciamento de usuários.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      navigate('/admin/users');
                    }}
                  >
                    Ir para Gerenciamento de Usuários
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormItem>
                      <FormLabel>Arquivo</FormLabel>
                      <Input 
                        type="file" 
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground">
                          Arquivo selecionado: {selectedFile.name}
                        </p>
                      )}
                    </FormItem>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                              <Input placeholder="Título do documento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value || ''}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um usuário" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {users.filter(u => u.role === 'client').map(user => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Descrição do documento" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value || ''}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-80">
                              {flatCategoryOptions.map(option => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit">Adicionar Documento</Button>
                    </DialogFooter>
                  </form>
                </Form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Filtrar documentos por usuário, categoria ou texto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <Select
                value={filterUser}
                onValueChange={setFilterUser}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Todos os usuários</SelectItem>
                  {users.filter(u => u.role === 'client').map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select
                value={filterCategory}
                onValueChange={setFilterCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  <SelectItem value="none">Todas as categorias</SelectItem>
                  {flatCategoryOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => {
                const user = users.find(u => u.id === doc.userId);
                const category = mockCategories[doc.category];
                const categoryParent = category?.parentId 
                  ? mockCategories[category.parentId]
                  : null;
                const categoryParentParent = categoryParent?.parentId
                  ? mockCategories[categoryParent.parentId]
                  : null;
                
                let categoryPath = [];
                if (categoryParentParent) categoryPath.push(categoryParentParent.title);
                if (categoryParent) categoryPath.push(categoryParent.title);
                if (category) categoryPath.push(category.title);
                
                const categoryString = categoryPath.join(' > ') || doc.category;
                
                return (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.title}</TableCell>
                    <TableCell>{doc.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FolderTree className="w-4 h-4 text-muted-foreground" />
                        <span>{categoryString}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user?.name || 'Usuário desconhecido'}</TableCell>
                    <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <a 
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-primary hover:text-primary/90"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </a>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive/90"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir documento</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o documento "{doc.title}"? Esta ação não pode ser desfeita.
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
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Nenhum documento encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentManagement;
