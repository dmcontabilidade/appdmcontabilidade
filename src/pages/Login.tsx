import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { getAllUsers, ensureAdminUserExists } from '@/utils/users/demoUsers';
import { useIsMobile } from '@/hooks/use-mobile';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, isLoading } = useAuth();
  const isMobile = useIsMobile();
  
  // Limpa as credenciais ao carregar a página de login
  useEffect(() => {
    setEmail('');
    setPassword('');
    
    // Set the correct page title
    document.title = 'DM Contabilidade - Login';
    
    // Log dos usuários para depuração
    try {
      const users = getAllUsers();
      console.log('Usuários disponíveis para login:', users);
      
      // Ensure admin user exists
      ensureAdminUserExists();
    } catch (error) {
      console.error('Erro ao obter usuários para debug:', error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    console.log('Tentando fazer login com:', { email, password });
    await login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-dm-50 to-background p-4">
      <div className="animate-fade-up w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/3061f81e-171f-48e8-b8fd-f4e338ed175d.png" 
              alt="DM Contabilidade Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-dm-900`}>DM Contabilidade</h1>
          <p className={`text-muted-foreground mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Faça login para acessar seus documentos</p>
        </div>
        
        <Card className="border border-gold-200 shadow-md">
          <CardHeader>
            <CardTitle className={`text-dm-900 ${isMobile ? 'text-base' : 'text-lg'}`}>Login</CardTitle>
            <CardDescription className={isMobile ? 'text-xs' : 'text-sm'}>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link to="/reset-password" className="text-xs text-gold-600 hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-dm-800 hover:bg-dm-900 text-gold-300"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
