import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { z } from 'zod';
import type { Recipe } from '@/types';

const recipeSchema = z.object({
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

interface RecipeFormProps {
  onSubmit: (data: z.infer<typeof recipeSchema>) => void;
  initialData?: Recipe;
  isLoading: boolean;
}

export function RecipeForm({ onSubmit, initialData, isLoading }: RecipeFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [category, setCategory] = useState(initialData?.category ?? 'dinner');
  const [prepTime, setPrepTime] = useState(initialData?.prepTime ?? 0);
  const [cookTime, setCookTime] = useState(initialData?.cookTime ?? 0);
  const [servings, setServings] = useState(initialData?.servings ?? 1);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '');
  const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients ?? ['']);
  const [instructions, setInstructions] = useState<string[]>(initialData?.instructions ?? ['']);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      title,
      description,
      category: category as 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack',
      prepTime,
      cookTime,
      servings,
      ingredients: ingredients.filter((i) => i.trim() !== ''),
      instructions: instructions.filter((i) => i.trim() !== ''),
      imageUrl: imageUrl || undefined,
    };
    const result = recipeSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }
    setErrors({});
    onSubmit(result.data);
  }

  function addIngredient() {
    setIngredients([...ingredients, '']);
  }

  function removeIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function updateIngredient(index: number, value: string) {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  }

  function addInstruction() {
    setInstructions([...instructions, '']);
  }

  function removeInstruction(index: number) {
    setInstructions(instructions.filter((_, i) => i !== index));
  }

  function updateInstruction(index: number, value: string) {
    const updated = [...instructions];
    updated[index] = value;
    setInstructions(updated);
  }

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Recipe title" />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} rows={3} placeholder="A short description of this recipe" />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className={inputClass}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
          <input type="number" value={prepTime} onChange={(e) => setPrepTime(Number(e.target.value))} className={inputClass} min={0} />
          {errors.prepTime && <p className="text-red-500 text-xs mt-1">{errors.prepTime[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (min)</label>
          <input type="number" value={cookTime} onChange={(e) => setCookTime(Number(e.target.value))} className={inputClass} min={0} />
          {errors.cookTime && <p className="text-red-500 text-xs mt-1">{errors.cookTime[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
          <input type="number" value={servings} onChange={(e) => setServings(Number(e.target.value))} className={inputClass} min={1} />
          {errors.servings && <p className="text-red-500 text-xs mt-1">{errors.servings[0]}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} placeholder="https://example.com/image.jpg" />
        {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl[0]}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                className={inputClass}
                placeholder={`Ingredient ${index + 1}`}
              />
              {ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredient(index)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients[0]}</p>}
        <button type="button" onClick={addIngredient} className="mt-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
          <Plus className="w-4 h-4" /> Add ingredient
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
        <div className="space-y-2">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-sm text-gray-400 pt-2 w-6 shrink-0">{index + 1}.</span>
              <textarea
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className={inputClass}
                rows={2}
                placeholder={`Step ${index + 1}`}
              />
              {instructions.length > 1 && (
                <button type="button" onClick={() => removeInstruction(index)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.instructions && <p className="text-red-500 text-xs mt-1">{errors.instructions[0]}</p>}
        <button type="button" onClick={addInstruction} className="mt-2 inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700">
          <Plus className="w-4 h-4" /> Add step
        </button>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          {isLoading ? 'Saving...' : initialData ? 'Update Recipe' : 'Create Recipe'}
        </button>
      </div>
    </form>
  );
}
