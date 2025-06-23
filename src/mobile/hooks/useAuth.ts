import { useState, useEffect, createContext, useContext } from 'react';
import { User, LoginRequest, CreateUserRequest, AuthResponse } from '../../business/entities/User';
import { LoginUseCase } from '../../business/usecases/auth/LoginUseCase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthRepository } from '@/business/repositories/impl/AuthRepository';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: CreateUserRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const authRepository = new AuthRepository();
  const loginUseCase = new LoginUseCase(authRepository);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@auth_token');
      const storedUser = await AsyncStorage.getItem('@auth_user');

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        // Configurar token na API
        const { ApiService } = await import('../../business/services/api/ApiService');
        ApiService.getInstance().setAuthToken(storedToken);
      }
    } catch (error) {
      console.error('Erro ao carregar dados de autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const authResponse = await loginUseCase.execute(credentials);
      
      // Salvar dados no AsyncStorage
      await AsyncStorage.setItem('@auth_token', authResponse.token);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(authResponse.user));
      
      setUser(authResponse.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: CreateUserRequest) => {
    setLoading(true);
    try {
      const authResponse = await authRepository.register(userData);
      
      // Salvar dados no AsyncStorage
      await AsyncStorage.setItem('@auth_token', authResponse.token);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(authResponse.user));
      
      setUser(authResponse.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authRepository.logout();
      
      // Remover dados do AsyncStorage
      await AsyncStorage.removeItem('@auth_token');
      await AsyncStorage.removeItem('@auth_user');
      
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};

export { AuthContext };