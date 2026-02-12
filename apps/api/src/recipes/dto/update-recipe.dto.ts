import { createRecipeSchema } from './create-recipe.dto';

export const updateRecipeSchema = createRecipeSchema.partial();

export type UpdateRecipeDto = typeof updateRecipeSchema._output;
