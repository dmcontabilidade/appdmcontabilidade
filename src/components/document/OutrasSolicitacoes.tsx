
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Headphones, FileText, Receipt } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

const OutrasSolicitacoes: React.FC = () => {
  const handleFaturamentoRequest = () => {
    const message = encodeURIComponent("Olá, solicito um faturamento");
    window.open(`http://wa.me/5598984684434?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <Card className="border-t-4 border-t-yellow-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="text-[#630000]" />
              <span className="text-[#630000]">WhatsApp</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Atendimento rápido e direto pelo nosso WhatsApp corporativo.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#630000] hover:bg-[#4a0000]" onClick={() => window.open('http://wa.me/5598984684434', '_blank')}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Conversar no WhatsApp
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>

        {/* Email Card */}
        <Card className="border-t-4 border-t-yellow-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Mail className="text-[#630000]" />
              <span className="text-[#630000]">Email</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Envie sua solicitação detalhada para nosso email corporativo.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border border-muted text-primary" onClick={() => window.location.href = 'mailto:dmcontabilidadee@gmail.com'}>
              <Mail className="mr-2 h-4 w-4" />
              dmcontabilidadee@gmail.com
            </Button>
          </CardFooter>
        </Card>

        {/* Suporte Telefônico Card */}
        <Card className="border-t-4 border-t-yellow-400">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Headphones className="text-[#630000]" />
              <span className="text-[#630000]">Suporte Telefônico</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Atendimento por telefone de segunda a sexta, das 9h às 18h.
            </p>
          </CardContent>
          <CardFooter className="flex-col items-start">
            <p className="text-xl font-semibold mb-1">(98) 98468-4434</p>
            <p className="text-xs text-muted-foreground">Central de Atendimento</p>
          </CardFooter>
        </Card>
      </div>

      {/* Solicitar Faturamento Card */}
      <Card className="border-l-4 border-l-yellow-400 mt-8">
        <CardContent className="flex items-start gap-4 p-6">
          <div className="bg-[#630000] rounded p-4 flex items-center justify-center">
            <Receipt className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-[#630000]">Solicitar Faturamento</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Precisa de um faturamento especial? Clique no botão abaixo para solicitar diretamente pelo WhatsApp.
            </p>
            <Button 
              className="bg-[#630000] hover:bg-[#4a0000] mt-2" 
              onClick={handleFaturamentoRequest}
            >
              <Receipt className="mr-2 h-4 w-4" />
              Solicitar Faturamento
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documento específico Card */}
      <Card className="border-l-4 border-l-yellow-400 mt-8">
        <CardContent className="flex items-start gap-4 p-6">
          <div className="bg-[#630000] rounded p-4 flex items-center justify-center">
            <FileText className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#630000]">Precisa de um documento específico?</h3>
            <p className="text-sm text-muted-foreground">
              Se você precisa de um documento que não encontrou em nosso portal, entre em contato conosco que
              providenciaremos o mais rápido possível.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutrasSolicitacoes;
