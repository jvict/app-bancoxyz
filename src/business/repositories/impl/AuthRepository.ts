import {LoginRequest, AuthResponse } from '../../entities/User';
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

  private isHttpError(error: any): error is HttpError {
    return error && typeof error.status === 'number' && typeof error.message === 'string';
  }
}