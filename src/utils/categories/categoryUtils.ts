
import { CategoryInfo, Category } from '@/types';
import { categories } from './categoryData';

export const getSubcategories = (categoryId: Category): CategoryInfo[] => {
  return Object.values(categories).filter(
    (category) => category.parentId === categoryId
  );
};

export const getParentInfo = (categoryId: Category): { 
  parentLink: string; 
  parentName: string;
  parentId?: Category;
} => {
  const currentCategory = categories[categoryId];
  
  // Default is to go back to dashboard
  let parentLink = "/dashboard";
  let parentName = "Dashboard";
  let parentId = undefined;
  
  // If category has a parent, set parent info
  if (currentCategory && currentCategory.parentId) {
    const parentCategory = categories[currentCategory.parentId];
    if (parentCategory) {
      parentLink = `/documents/${currentCategory.parentId}`;
      parentName = parentCategory.title;
      parentId = currentCategory.parentId;
    }
  }
  
  return { parentLink, parentName, parentId };
};
