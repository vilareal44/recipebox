import { useNavigate } from 'react-router-dom';
import { useCreateRecipe } from '@/hooks/use-recipes';
import { RecipeForm } from '@/components/recipe-form';
import { toast } from 'sonner';

export function CreateRecipePage() {
  const navigate = useNavigate();
  const createRecipe = useCreateRecipe();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Recipe</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <RecipeForm
          isLoading={createRecipe.isPending}
          onSubmit={(data) => {
            createRecipe.mutate(data, {
              onSuccess: (recipe) => {
                toast.success('Recipe created successfully!');
                navigate(`/recipes/${recipe.id}`);
              },
            });
          }}
        />
      </div>
    </div>
  );
}
