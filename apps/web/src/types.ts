export interface Recipe {
  id: number;
  title: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
