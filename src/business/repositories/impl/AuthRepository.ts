import { User, LoginRequest, CreateUserRequest, AuthResponse } from '../../entities/User';
import { ApiService } from '../../services/api/ApiService';
import { IAuthRepository } from '../interefaces/IAuthRepository';
import { HttpError } from '../../services/api/HttpClient';

export class AuthRepository implements IAuthRepository {
  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.apiService
        .getAuthClient()
        .post<AuthResponse>('/default/login', credentials);
      
      // Configurar token para próximas requisições
      if (response.data.token) {
        await this.apiService.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Erro no login:', error);
      
      if (this.isHttpError(error)) {
        switch (error.status) {
          case 400:
            throw new Error('Dados de login inválidos');
          case 401:
            throw new Error('Email ou senha incorretos');
          case 403:
            throw new Error('Acesso negado');
          case 500:
            throw new Error('Erro interno do servidor');
          default:
            throw new Error(`Erro no login: ${error.message}`);
        }
      }
      
      throw new Error('Não foi possível realizar o login');
    }
  }

  async register(userData: CreateUserRequest): Promise<AuthResponse> {
    try {
      const response = await this.apiService
        .getAuthClient()
        .post<AuthResponse>('/default/register', userData);
      
      // Configurar token para próximas requisições
      if (response.data.token) {
        await this.apiService.setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Erro no registro:', error);
      
      if (this.isHttpError(error)) {
        switch (error.status) {
          case 400:
            throw new Error('Dados de registro inválidos');
          case 409:
            throw new Error('Email já está em uso');
          case 500:
            throw new Error('Erro interno do servidor');
          default:
            throw new Error(`Erro no registro: ${error.message}`);
        }
      }
      
      throw new Error('Não foi possível criar a conta');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiService
        .getAuthClient()
        .post('/default/logout');
    } catch (error) {
      console.error('Erro no logout:', error);
      // Não lançar erro para logout, apenas logar
    } finally {
      // Sempre remover o token localmente
      await this.apiService.removeAuthToken();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.apiService
        .getAuthClient()
        .get<User>('/default/me');
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await this.apiService
        .getAuthClient()
        .post<{ token: string }>('/default/refresh');
      
      const newToken = response.data.token;
      
      // Atualizar token em todos os clientes
      await this.apiService.setAuthToken(newToken);
      
      return newToken;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      
      if (this.isHttpError(error)) {
        switch (error.status) {
          case 401:
            throw new Error('Token de renovação inválido');
          case 403:
            throw new Error('Renovação não autorizada');
          default:
            throw new Error(`Erro na renovação: ${error.message}`);
        }
      }
      
      throw new Error('Não foi possível renovar o token');
    }
  }

  private isHttpError(error: any): error is HttpError {
    return error && typeof error.status === 'number' && typeof error.message === 'string';
  }
}