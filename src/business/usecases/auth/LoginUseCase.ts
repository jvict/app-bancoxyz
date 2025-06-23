import { IUseCase } from '../../interfaces/IUseCase';
import { LoginRequest, AuthResponse } from '../../entities/User';
import { ApiService } from '../../services/api/ApiService';
import { IAuthRepository } from '@/business/repositories/interefaces/IAuthRepository';

export class LoginUseCase implements IUseCase<LoginRequest, AuthResponse> {
  constructor(private authRepository: IAuthRepository) {}

  async execute(request: LoginRequest): Promise<AuthResponse> {
    // Validação básica
    if (!request.email || !request.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (!this.isValidEmail(request.email)) {
      throw new Error('Email inválido');
    }

    try {
      const authResponse = await this.authRepository.login(request);
      
      // Configurar token para próximas requisições
      ApiService.getInstance().setAuthToken(authResponse.token);
      
      return authResponse;
    } catch (error) {
      throw new Error('Falha na autenticação. Verifique suas credenciais.');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}