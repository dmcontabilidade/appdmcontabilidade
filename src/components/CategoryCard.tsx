import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryInfo } from '@/types';
import { FileText, Users, CheckCircle, DollarSign, MailQuestion, File, Briefcase, Calculator, Building, CreditCard, FileCheck, FileDigit, Award, Landmark, LibraryBig, BadgeCheck, Calendar, Receipt, ExternalLink, Files, Folder, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: CategoryInfo;
  delay: number;
  isSubcategory?: boolean;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'file':
      return <File className="h-8 w-8" />;
    case 'files':
      return <Files className="h-8 w-8" />;
    case 'file-text':
      return <FileText className="h-8 w-8" />;
    case 'users':
      return <Users className="h-8 w-8" />;
    case 'check-circle':
      return <CheckCircle className="h-8 w-8" />;
    case 'dollar-sign':
      return <DollarSign className="h-8 w-8" />;
    case 'mail-question':
      return <MailQuestion className="h-8 w-8" />;
    case 'calculator':
      return <Calculator className="h-8 w-8" />;
    case 'briefcase':
      return <Briefcase className="h-8 w-8" />;
    case 'building':
      return <Building className="h-8 w-8" />;
    case 'credit-card':
      return <CreditCard className="h-8 w-8" />;
    case 'file-check':
      return <FileCheck className="h-8 w-8" />;
    case 'file-digit':
      return <FileDigit className="h-8 w-8" />;
    case 'award':
      return <Award className="h-8 w-8" />;
    case 'landmark':
      return <Landmark className="h-8 w-8" />;
    case 'library-big':
      return <LibraryBig className="h-8 w-8" />;
    case 'badge-check':
      return <BadgeCheck className="h-8 w-8" />;
    case 'calendar':
      return <Calendar className="h-8 w-8" />;
    case 'receipt':
      return <Receipt className="h-8 w-8" />;
    case 'id-card':
      return <CreditCard className="h-8 w-8" />;
    case 'folder':
      return <Folder className="h-8 w-8" />;
    case 'message-circle':
      return <MessageCircle className="h-8 w-8" />;
    default:
      return <File className="h-8 w-8" />;
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, delay, isSubcategory = false }) => {
  if (category.id === 'cnd_federal') {
    return (
      <a
        href="https://solucoes.receita.fazenda.gov.br/servicos/certidaointernet/pj/emitir"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "glass rounded-xl p-5 hover-lift pulse-on-hover",
          "flex flex-col items-center text-center",
          "border border-gold-200 shadow-sm",
          "animate-fade-up",
          isSubcategory ? "bg-dm-50/60" : ""
        )}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-3 text-dm-800", 
          isSubcategory ? "bg-gold-50" : "bg-gold-100"
        )}>
          {getIcon(category.icon)}
        </div>
        
        <h3 className="text-lg font-medium mb-1 text-dm-900 flex items-center gap-1">
          {category.title}
          <ExternalLink className="h-4 w-4 inline-block" />
        </h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </a>
    );
  }
  
  if (category.id === 'cnd_estadual') {
    return (
      <a
        href="https://sistemas1.sefaz.ma.gov.br/certidoes/jsp/emissaoCertidaoNegativa/emissaoCertidaoNegativa.jsf"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "glass rounded-xl p-5 hover-lift pulse-on-hover",
          "flex flex-col items-center text-center",
          "border border-gold-200 shadow-sm",
          "animate-fade-up",
          isSubcategory ? "bg-dm-50/60" : ""
        )}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-3 text-dm-800", 
          isSubcategory ? "bg-gold-50" : "bg-gold-100"
        )}>
          {getIcon(category.icon)}
        </div>
        
        <h3 className="text-lg font-medium mb-1 text-dm-900 flex items-center gap-1">
          {category.title}
          <ExternalLink className="h-4 w-4 inline-block" />
        </h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </a>
    );
  }
  
  if (category.id === 'cnd_trabalhista') {
    return (
      <a
        href="https://cndt-certidao.tst.jus.br/inicio.faces"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "glass rounded-xl p-5 hover-lift pulse-on-hover",
          "flex flex-col items-center text-center",
          "border border-gold-200 shadow-sm",
          "animate-fade-up",
          isSubcategory ? "bg-dm-50/60" : ""
        )}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-3 text-dm-800", 
          isSubcategory ? "bg-gold-50" : "bg-gold-100"
        )}>
          {getIcon(category.icon)}
        </div>
        
        <h3 className="text-lg font-medium mb-1 text-dm-900 flex items-center gap-1">
          {category.title}
          <ExternalLink className="h-4 w-4 inline-block" />
        </h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </a>
    );
  }
  
  if (category.id === 'cnd_municipal') {
    const prefilledMessage = encodeURIComponent("Olá, gostaria de solicitar uma Certidão Negativa de Débitos Municipais.");
    
    return (
      <a
        href={`http://wa.me/5598984684434?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "glass rounded-xl p-5 hover-lift pulse-on-hover",
          "flex flex-col items-center text-center",
          "border border-gold-200 shadow-sm",
          "animate-fade-up",
          isSubcategory ? "bg-dm-50/60" : ""
        )}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-3 text-dm-800", 
          isSubcategory ? "bg-gold-50" : "bg-gold-100"
        )}>
          {getIcon(category.icon)}
        </div>
        
        <h3 className="text-lg font-medium mb-1 text-dm-900 flex items-center gap-1">
          {category.title}
          <ExternalLink className="h-4 w-4 inline-block" />
        </h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </a>
    );
  }
  
  if (category.id === 'sugestao_melhorias') {
    const prefilledMessage = encodeURIComponent("Olá, tenho uma sugestão de melhoria para o portal:");
    
    return (
      <a
        href={`http://wa.me/5598984684434?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "glass rounded-xl p-5 hover-lift pulse-on-hover",
          "flex flex-col items-center text-center",
          "border border-gold-200 shadow-sm",
          "animate-fade-up",
          isSubcategory ? "bg-dm-50/60" : ""
        )}
        style={{ animationDelay: `${delay * 0.1}s` }}
      >
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center mb-3 text-dm-800", 
          isSubcategory ? "bg-gold-50" : "bg-gold-100"
        )}>
          {getIcon(category.icon)}
        </div>
        
        <h3 className="text-lg font-medium mb-1 text-dm-900 flex items-center gap-1">
          {category.title}
          <ExternalLink className="h-4 w-4 inline-block" />
        </h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </a>
    );
  }
  
  return (
    <Link
      to={`/documents/${category.id}`}
      className={cn(
        "glass rounded-xl p-5 hover-lift pulse-on-hover",
        "flex flex-col items-center text-center",
        "border border-gold-200 shadow-sm",
        "animate-fade-up",
        isSubcategory ? "bg-dm-50/60" : ""
      )}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center mb-3 text-dm-800", 
        isSubcategory ? "bg-gold-50" : "bg-gold-100"
      )}>
        {getIcon(category.icon)}
      </div>
      
      <h3 className="text-lg font-medium mb-1 text-dm-900">{category.title}</h3>
      <p className="text-sm text-muted-foreground">{category.description}</p>
    </Link>
  );
};

export default CategoryCard;
