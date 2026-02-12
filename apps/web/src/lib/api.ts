const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }
    return response.json();
  }

  get<T>(endpoint: string) {
    return this.fetch<T>(endpoint);
  }
  post<T>(endpoint: string, data: unknown) {
    return this.fetch<T>(endpoint, { method: 'POST', body: JSON.stringify(data) });
  }
  put<T>(endpoint: string, data: unknown) {
    return this.fetch<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  }
  delete<T>(endpoint: string) {
    return this.fetch<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);
