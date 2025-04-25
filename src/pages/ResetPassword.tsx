
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, MessageSquare } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // WhatsApp phone number and pre-filled message
  const phoneNumber = "5531999999999"; // Replace with the actual number
  const message = "Esqueci minha senha, por favor me forneça uma nova senha de acesso";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-dm-50 to-background p-4">
      <div className="animate-fade-up w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/3061f81e-171f-48e8-b8fd-f4e338ed175d.png" 
              alt="DM Contabilidade Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <h1 className="text-2xl font-bold text-dm-900">DM Contabilidade</h1>
          <p className="text-muted-foreground mt-2">Recuperação de senha</p>
        </div>
        
        <Card className="glass animate-scale-in border border-gold-200">
          <CardHeader>
            <CardTitle className="text-dm-900">Recuperar Senha</CardTitle>
            <CardDescription>
              Entre em contato conosco para recuperar sua senha
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Ajuda com sua senha</AlertTitle>
              <AlertDescription>
                Clique no botão abaixo para enviar uma mensagem via WhatsApp solicitando uma nova senha.
              </AlertDescription>
            </Alert>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                type="button"
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Contatar via WhatsApp
              </Button>
            </a>
            
            <Link to="/login" className="text-sm text-gold-600 hover:underline">
              Voltar para o login
            </Link>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Ou envie um e-mail para: contato@dmcontabilidade.com.br</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
