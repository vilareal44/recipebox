import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import type { Recipe } from '@/types';

const categoryColors: Record<string, string> = {
  breakfast: 'bg-amber-100 text-amber-800',
  lunch: 'bg-green-100 text-green-800',
  dinner: 'bg-blue-100 text-blue-800',
  dessert: 'bg-pink-100 text-pink-800',
  snack: 'bg-orange-100 text-orange-800',
};

const categoryPlaceholders: Record<string, string> = {
  breakfast: 'bg-amber-200',
  lunch: 'bg-green-200',
  dinner: 'bg-blue-200',
  dessert: 'bg-pink-200',
  snack: 'bg-orange-200',
};

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      {recipe.imageUrl ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className={`w-full h-48 ${categoryPlaceholders[recipe.category]} flex items-center justify-center`}>
          <span className="text-4xl opacity-50">
            {recipe.category === 'breakfast' ? '🍳' :
             recipe.category === 'lunch' ? '🥗' :
             recipe.category === 'dinner' ? '🍽️' :
             recipe.category === 'dessert' ? '🍰' : '🍿'}
          </span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[recipe.category]}`}>
            {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{recipe.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{recipe.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {recipe.prepTime + recipe.cookTime}m
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {recipe.servings}
          </span>
        </div>
      </div>
    </Link>
  );
}
