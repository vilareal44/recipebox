import { z } from 'zod';

export const createRecipeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(1000),
  category: z.enum(['breakfast', 'lunch', 'dinner', 'dessert', 'snack']),
  prepTime: z.number().int().min(0).max(1440),
  cookTime: z.number().int().min(0).max(1440),
  servings: z.number().int().min(1).max(100),
  ingredients: z.array(z.string().min(1)).min(1, 'At least one ingredient is required'),
  instructions: z.array(z.string().min(1)).min(1, 'At least one instruction is required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
