import { useParams, useNavigate } from 'react-router-dom';
import { useRecipe, useUpdateRecipe } from '@/hooks/use-recipes';
import { RecipeForm } from '@/components/recipe-form';
import { toast } from 'sonner';

export function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading: isFetching } = useRecipe(Number(id));
  const updateRecipe = useUpdateRecipe();

  if (isFetching) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-96 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center py-16 text-gray-500">Recipe not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Recipe</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <RecipeForm
          initialData={recipe}
          isLoading={updateRecipe.isPending}
          onSubmit={(data) => {
            updateRecipe.mutate(
              { id: recipe.id, ...data },
              {
                onSuccess: () => {
                  toast.success('Recipe updated successfully!');
                  navigate(`/recipes/${recipe.id}`);
                },
              },
            );
          }}
        />
      </div>
    </div>
  );
}
