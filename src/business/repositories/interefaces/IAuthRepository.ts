import { User, LoginRequest, AuthResponse } from '../../entities/User';

export interface IAuthRepository {
  login(credentials: LoginRequest): Promise<AuthResponse>;
}