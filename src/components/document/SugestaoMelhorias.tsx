
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Lightbulb, ThumbsUp, Send, ExternalLink } from 'lucide-react';

const SugestaoMelhorias: React.FC = () => {
  const handleSendSuggestion = () => {
    const message = encodeURIComponent("Olá, tenho uma sugestão de melhoria para o portal:");
    window.open(`http://wa.me/5598984684434?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <Card className="border-t-4 border-t-yellow-400">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-[#630000]" />
            <span className="text-[#630000]">Suas ideias são importantes para nós!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            Nossa equipe está sempre buscando melhorar a experiência dos nossos clientes. 
            Tem alguma sugestão para tornar o portal mais útil, eficiente ou fácil de usar? 
            Compartilhe conosco e ajude a construir uma ferramenta cada vez melhor!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="flex flex-col items-center text-center p-4 bg-gold-50 rounded-lg">
              <ThumbsUp className="h-10 w-10 text-[#630000] mb-2" />
              <h4 className="font-medium mb-1">Melhore a experiência</h4>
              <p className="text-xs text-muted-foreground">Suas sugestões nos ajudam a melhorar o portal</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-gold-50 rounded-lg">
              <MessageCircle className="h-10 w-10 text-[#630000] mb-2" />
              <h4 className="font-medium mb-1">Comunicação direta</h4>
              <p className="text-xs text-muted-foreground">Fale conosco diretamente via WhatsApp</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4 bg-gold-50 rounded-lg">
              <Send className="h-10 w-10 text-[#630000] mb-2" />
              <h4 className="font-medium mb-1">Resposta rápida</h4>
              <p className="text-xs text-muted-foreground">Analisaremos sua sugestão o mais rápido possível</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-[#630000] hover:bg-[#4a0000]" 
            onClick={handleSendSuggestion}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Enviar sugestão via WhatsApp
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border-l-4 border-l-yellow-400">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2 text-[#630000]">Como funciona?</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Clique no botão "Enviar sugestão via WhatsApp"</li>
            <li>Você será redirecionado para o WhatsApp da DM Contabilidade</li>
            <li>Detalhe sua sugestão e envie</li>
            <li>Nossa equipe avaliará sua ideia e entrará em contato</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default SugestaoMelhorias;
