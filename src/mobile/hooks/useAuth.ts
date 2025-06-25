import { useState, useEffect, createContext, useContext } from 'react';
import { User, LoginRequest, CreateUserRequest } from '../../business/entities/User';
import { AuthRepository } from '../../business/repositories/impl/AuthRepository';
import { ApiService } from '../../business/services/api/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: CreateUserRequest) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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
  const apiService = ApiService.getInstance();

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@auth_token');
      const storedUser = await AsyncStorage.getItem('@auth_user');

      console.log('🔍 Carregando dados armazenados...');
      console.log('Token encontrado:', !!storedToken);
      console.log('Usuário encontrado:', !!storedUser);

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        
        // Configurar token na API
        await apiService.setAuthToken(storedToken);
        
        console.log('✅ Dados de autenticação carregados com sucesso');
      } else {
        console.log('❌ Nenhum dado de autenticação encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar dados de autenticação:', error);
      await clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = async () => {
    console.log('🧹 Limpando dados de autenticação...');
    await AsyncStorage.removeItem('@auth_token');
    await AsyncStorage.removeItem('@auth_user');
    await apiService.removeAuthToken();
    setUser(null);
  };

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      console.log('🔐 Tentando fazer login...');
      const authResponse = await authRepository.login(credentials);
      
      // Salvar dados no AsyncStorage
      await AsyncStorage.setItem('@auth_token', authResponse.token);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(authResponse.user));
      
      setUser(authResponse.user);
      console.log('✅ Login realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: CreateUserRequest) => {
    setLoading(true);
    try {
      console.log('📝 Tentando registrar usuário...');
      const authResponse = await authRepository.register(userData);
      
      // Salvar dados no AsyncStorage
      await AsyncStorage.setItem('@auth_token', authResponse.token);
      await AsyncStorage.setItem('@auth_user', JSON.stringify(authResponse.user));
      
      setUser(authResponse.user);
      console.log('✅ Registro realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      console.log('🚪 Fazendo logout...');
      await authRepository.logout();
      await clearAuthData();
      console.log('✅ Logout realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
      // Mesmo com erro, limpar dados locais
      await clearAuthData();
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