
import React from 'react';
import { CategoryInfo } from '@/types';
import CategoryCard from '@/components/CategoryCard';

interface SubcategoriesGridProps {
  subcategories: CategoryInfo[];
}

const SubcategoriesGrid: React.FC<SubcategoriesGridProps> = ({ subcategories }) => {
  if (subcategories.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {subcategories.map((subcategory, index) => (
          <CategoryCard
            key={subcategory.id}
            category={subcategory}
            delay={index}
            isSubcategory={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesGrid;
