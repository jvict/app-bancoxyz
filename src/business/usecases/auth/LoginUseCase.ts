import { IUseCase } from '../../interfaces/IUseCase';
import { LoginRequest, AuthResponse } from '../../entities/User';
import { ApiService } from '../../services/api/ApiService';
import { IAuthRepository } from '@/business/repositories/interefaces/IAuthRepository';

export class LoginUseCase implements IUseCase<LoginRequest, AuthResponse> {
  constructor(private authRepository: IAuthRepository) {}

  async execute(request: LoginRequest): Promise<AuthResponse> {
    if (!request.email) {
      throw new Error('Email é obrigatório');
    }

    if (!request.password) {
      throw new Error('Senha é obrigatória');
    }

    if (!this.isValidEmail(request.email)) {
      throw new Error('Email inválido');
    }

    if (request.password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    try {
      const authResponse = await this.authRepository.login(request);
      ApiService.getInstance().setAuthToken(authResponse.token);
      return authResponse;
    } catch (error) {
      throw new Error('Não foi possível realizar o login');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}