import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { HomePage } from '@/pages/home';
import { RecipeDetailPage } from '@/pages/recipe-detail';
import { CreateRecipePage } from '@/pages/create-recipe';
import { EditRecipePage } from '@/pages/edit-recipe';
import { AboutPage } from '@/pages/about';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/recipes/new', element: <CreateRecipePage /> },
      { path: '/recipes/:id', element: <RecipeDetailPage /> },
      { path: '/recipes/:id/edit', element: <EditRecipePage /> },
    ],
  },
]);
