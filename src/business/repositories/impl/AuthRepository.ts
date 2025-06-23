
import { User, LoginRequest, CreateUserRequest, AuthResponse } from '../../entities/User';
import { ApiService } from '../../services/api/ApiService';
import { IAuthRepository } from '../interefaces/IAuthRepository';

export class AuthRepository implements IAuthRepository {
  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.apiService
      .getHttpClient()
      .post<AuthResponse>('/auth/login', credentials);
    
    return response.data;
  }

  async register(userData: CreateUserRequest): Promise<AuthResponse> {
    const response = await this.apiService
      .getHttpClient()
      .post<AuthResponse>('/auth/register', userData);
    
    return response.data;
  }

  async logout(): Promise<void> {
    await this.apiService
      .getHttpClient()
      .post('/auth/logout');
    
    this.apiService.removeAuthToken();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.apiService
        .getHttpClient()
        .get<User>('/auth/me');
      
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async refreshToken(): Promise<string> {
    const response = await this.apiService
      .getHttpClient()
      .post<{ token: string }>('/auth/refresh');
    
    return response.data.token;
  }
}