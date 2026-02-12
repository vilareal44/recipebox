import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Recipe } from '@/types';

export function useRecipes(category?: string) {
  return useQuery({
    queryKey: ['recipes', { category }],
    queryFn: () => {
      const params = category ? `?category=${category}` : '';
      return api.get<Recipe[]>(`/recipes${params}`);
    },
  });
}

export function useRecipe(id: number) {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => api.get<Recipe>(`/recipes/${id}`),
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'imageUrl'> & { imageUrl?: string }) =>
      api.post<Recipe>('/recipes', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>>) =>
      api.put<Recipe>(`/recipes/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete<{ success: boolean }>(`/recipes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}
