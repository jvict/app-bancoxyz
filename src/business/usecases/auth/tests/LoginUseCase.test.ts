import { LoginUseCase } from '../LoginUseCase';
import { IAuthRepository } from '../../../repositories/interefaces/IAuthRepository';
import { LoginRequest, AuthResponse } from '../../../entities/User';

describe('LoginUseCase', () => {
  let mockAuthRepository: jest.Mocked<IAuthRepository>;
  let loginUseCase: LoginUseCase;

  beforeEach(() => {
    mockAuthRepository = {
      login: jest.fn(),
    };
    loginUseCase = new LoginUseCase(mockAuthRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const validLoginRequest: LoginRequest = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockAuthResponse: AuthResponse = {
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        createdAt: undefined,
        updatedAt: undefined
      },
      token: 'fake-jwt-token',
    };

    it('should return auth response when login is successful', async () => {
      mockAuthRepository.login.mockResolvedValue(mockAuthResponse);

      const result = await loginUseCase.execute(validLoginRequest);

      expect(result).toEqual(mockAuthResponse);
      expect(mockAuthRepository.login).toHaveBeenCalledWith(validLoginRequest);
    });

    it('should throw error when email is invalid', async () => {
      const invalidRequest = { ...validLoginRequest, email: 'invalid-email' };

      await expect(loginUseCase.execute(invalidRequest)).rejects.toThrow(
        'Email inválido'
      );
      expect(mockAuthRepository.login).not.toHaveBeenCalled();
    });

    it('should throw error when password is too short', async () => {
      const invalidRequest = { ...validLoginRequest, password: '123' };

      await expect(loginUseCase.execute(invalidRequest)).rejects.toThrow(
        'Senha deve ter pelo menos 6 caracteres'
      );
      expect(mockAuthRepository.login).not.toHaveBeenCalled();
    });

    it('should throw error when email is empty', async () => {
      const invalidRequest = { ...validLoginRequest, email: '' };

      await expect(loginUseCase.execute(invalidRequest)).rejects.toThrow(
        'Email é obrigatório'
      );
    });

    it('should throw error when password is empty', async () => {
      const invalidRequest = { ...validLoginRequest, password: '' };

      await expect(loginUseCase.execute(invalidRequest)).rejects.toThrow(
        'Senha é obrigatória'
      );
    });

    it('should throw error when repository throws error', async () => {
      mockAuthRepository.login.mockRejectedValue(new Error('Network error'));

      await expect(loginUseCase.execute(validLoginRequest)).rejects.toThrow(
        'Não foi possível realizar o login'
      );
    });
  });
});