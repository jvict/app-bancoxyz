import { User, LoginRequest, CreateUserRequest, AuthResponse } from '../../entities/User';

export interface IAuthRepository {
  login(credentials: LoginRequest): Promise<AuthResponse>;
}