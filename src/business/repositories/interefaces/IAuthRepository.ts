import { AuthResponse, CreateUserRequest, LoginRequest, User } from "../../entities/User";


export interface IAuthRepository {
  login(credentials: LoginRequest): Promise<AuthResponse>;
  register(userData: CreateUserRequest): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(): Promise<string>;
}