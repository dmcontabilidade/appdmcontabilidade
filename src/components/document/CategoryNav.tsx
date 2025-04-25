
import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryInfo } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryNavProps {
  currentCategory: CategoryInfo;
  parentLink: string;
  parentName: string;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ currentCategory, parentLink, parentName }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8 animate-fade-up">
      <div className="flex flex-col gap-2">
        <Link to={parentLink} className="inline-flex w-fit">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={16} />
            Voltar para {parentName}
          </Button>
        </Link>
        <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>{currentCategory.description}</p>
      </div>
    </div>
  );
};

export default CategoryNav;
