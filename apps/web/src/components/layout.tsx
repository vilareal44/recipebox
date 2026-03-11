import { Link, Outlet } from 'react-router-dom';
import { UtensilsCrossed, Plus } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-amber-600 transition-colors">
            <UtensilsCrossed className="w-6 h-6 text-amber-600" />
            <span className="text-xl font-bold">RecipeBox</span>
          </Link>
          <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="text-sm text-gray-600 hover:text-amber-600 font-medium transition-colors"
          >
            Sobre
          </Link>
          <Link
            to="/contact"
            className="text-sm text-gray-600 hover:text-amber-600 font-medium transition-colors"
          >
            Contato
          </Link>
          <Link
            to="/recipes/new"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Recipe
          </Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
