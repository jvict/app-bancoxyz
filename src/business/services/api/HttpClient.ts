import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export interface HttpError {
  message: string;
  status?: number;
  data?: any;
}

export class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders.Authorization;
  }

  private async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('@auth_token');
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = { ...this.defaultHeaders };
    
    // Se não há token nos headers padrão, tentar recuperar do AsyncStorage
    if (!headers.Authorization) {
      const storedToken = await this.getStoredToken();
      if (storedToken) {
        headers.Authorization = `Bearer ${storedToken}`;
      }
    }
    
    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<HttpResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Obter headers com token atualizado
    const authHeaders = await this.getAuthHeaders();
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as unknown as T;
      }

      if (!response.ok) {
        throw {
          message: `HTTP Error: ${response.status} - ${response.statusText}`,
          status: response.status,
          data,
        } as HttpError;
      }
      return {
        data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      throw {
        message: 'Erro desconhecido na requisição',
        status: 0,
      } as HttpError;
    }
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'GET',
      headers
    });
  }

  async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers
    });
  }

  async put<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers
    });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'DELETE',
      headers
    });
  }
}