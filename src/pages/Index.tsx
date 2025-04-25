import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { File, Shield, Clock, Users, ArrowLeft, MessageSquare } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // WhatsApp phone number and pre-filled message
  const phoneNumber = "5598984684434"; // Using the phone number from other components
  const message = "Olá, gostaria de falar com a equipe do Sistema de Documentos Contábeis";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  const handleDashboardAccess = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
  
  const features = [
    {
      title: 'Documentos Organizados',
      description: 'Seus documentos categorizados e seguros em um só lugar.',
      icon: <File className="h-8 w-8 text-dm-800" />,
    },
    {
      title: 'Acesso Seguro',
      description: 'Ambiente protegido e com controle de acesso personalizado.',
      icon: <Shield className="h-8 w-8 text-dm-800" />,
    },
    {
      title: 'Disponível 24/7',
      description: 'Acesse seus documentos a qualquer hora, em qualquer lugar.',
      icon: <Clock className="h-8 w-8 text-dm-800" />,
    },
    {
      title: 'Suporte Especializado',
      description: 'Equipe de contadores prontos para atender suas necessidades.',
      icon: <Users className="h-8 w-8 text-dm-800" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-dm-950">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-dm-900 to-dm-950 opacity-70"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <div className="w-48 h-48 mx-auto mb-6">
                <img 
                  src="/lovable-uploads/3061f81e-171f-48e8-b8fd-f4e338ed175d.png" 
                  alt="DM Contabilidade Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="inline-block text-gold-400">DM</span>
                <span className="inline-block text-gold-300">&nbsp;Contabilidade</span>
              </h1>
              <p className="text-lg md:text-xl text-gold-100 mb-8">
                Acesse e gerencie seus documentos contábeis com segurança e praticidade
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gold-500 hover:bg-gold-600 text-dm-900 font-semibold w-full sm:w-auto"
                  onClick={handleDashboardAccess}
                >
                  Meu Painel
                </Button>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto bg-dm-800 hover:bg-dm-900 text-gold-300 border-gold-300 flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Fale Conosco
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dm-900">Seu escritório contábil digital</h2>
              <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Proporcionamos a melhor experiência para você gerenciar seus documentos contábeis e financeiros
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass rounded-xl p-6 text-center animate-fade-up hover-lift border border-gold-200"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium mb-2 text-dm-900">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gold-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center glass p-8 rounded-xl animate-fade-up border border-gold-200">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-dm-900">
                Pronto para começar?
              </h2>
              <p className="text-md md:text-lg text-muted-foreground mb-6">
                Acesse agora mesmo o sistema e visualize seus documentos contábeis
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-dm-800 hover:bg-dm-900 text-gold-300 flex items-center gap-2"
                  onClick={handleDashboardAccess}
                >
                  Meu Painel
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-40 h-40 rounded-full overflow-hidden">
                <img 
                  src="/lovable-uploads/3061f81e-171f-48e8-b8fd-f4e338ed175d.png" 
                  alt="DM Contabilidade Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            <div className="text-xs md:text-sm text-muted-foreground">
              © {new Date().getFullYear()} DM Contabilidade. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
