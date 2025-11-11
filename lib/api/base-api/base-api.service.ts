export class BaseApiService {
  protected baseUrl = '/api';

  protected async request<TResponse>(
    endpoint: string,
    options?: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  protected get<TResponse>(endpoint: string): Promise<TResponse> {
    return this.request<TResponse>(endpoint, { method: 'GET' });
  }

  protected post<TResponse, TBody = unknown>(
    endpoint: string,
    data?: TBody
  ): Promise<TResponse> {
    return this.request<TResponse>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected put<TResponse, TBody = unknown>(
    endpoint: string,
    data?: TBody
  ): Promise<TResponse> {
    return this.request<TResponse>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  protected delete<TResponse>(endpoint: string): Promise<TResponse> {
    return this.request<TResponse>(endpoint, { method: 'DELETE' });
  }
}

export const baseApi = new BaseApiService();
