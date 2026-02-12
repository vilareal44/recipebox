import { useParams, useNavigate, Link } from 'react-router-dom';
import { useRecipe, useDeleteRecipe } from '@/hooks/use-recipes';
import { ArrowLeft, Clock, Users, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const categoryColors: Record<string, string> = {
  breakfast: 'bg-amber-100 text-amber-800',
  lunch: 'bg-green-100 text-green-800',
  dinner: 'bg-blue-100 text-blue-800',
  dessert: 'bg-pink-100 text-pink-800',
  snack: 'bg-orange-100 text-orange-800',
};

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: recipe, isLoading } = useRecipe(Number(id));
  const deleteRecipe = useDeleteRecipe();

  function handleDelete() {
    if (!recipe) return;
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      deleteRecipe.mutate(recipe.id, {
        onSuccess: () => {
          toast.success('Recipe deleted successfully');
          navigate('/');
        },
      });
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-gray-200 rounded w-24" />
        <div className="h-8 bg-gray-200 rounded w-1/2" />
        <div className="h-64 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-medium text-gray-500">Recipe not found</h2>
        <Link to="/" className="text-amber-600 hover:text-amber-700 mt-2 inline-block">
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to recipes
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {recipe.imageUrl && (
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-72 object-cover" />
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[recipe.category]}`}>
                {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{recipe.title}</h1>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/recipes/${recipe.id}/edit`}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Pencil className="w-4 h-4" /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-red-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{recipe.description}</p>

          <div className="flex gap-6 mb-8 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Prep: {recipe.prepTime}m
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> Cook: {recipe.cookTime}m
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {recipe.servings} servings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h2>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, i) => (
                  <li key={i} className="flex gap-3 text-gray-600">
                    <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
