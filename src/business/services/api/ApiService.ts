import AsyncStorage from '@react-native-async-storage/async-storage';
import { HttpClient } from './HttpClient';

export class ApiService {
  private static instance: ApiService;
  private httpClients: Map<string, HttpClient>;

  private constructor() {
    this.httpClients = new Map();
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  getHttpClient(baseURL: string): HttpClient {
    if (!this.httpClients.has(baseURL)) {
      this.httpClients.set(baseURL, new HttpClient(baseURL));
    }
    return this.httpClients.get(baseURL)!;
  }

  async setAuthToken(token: string): Promise<void> {
    // Salvar token no AsyncStorage
    await AsyncStorage.setItem('@auth_token', token);
    
    // Aplicar token em todos os clientes HTTP
    this.httpClients.forEach(client => {
      client.setAuthToken(token);
    });
  }

  async removeAuthToken(): Promise<void> {
    // Remover token do AsyncStorage
    await AsyncStorage.removeItem('@auth_token');
    
    // Remover token de todos os clientes HTTP
    this.httpClients.forEach(client => {
      client.removeAuthToken();
    });
  }

  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('@auth_token');
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  }

  // Métodos específicos para cada serviço
  getAuthClient(): HttpClient {
    return this.getHttpClient('https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com');
  }

  getBalanceClient(): HttpClient {
    return this.getHttpClient('https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com');
  }

  getTransferClient(): HttpClient {
    return this.getHttpClient('https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com');
  }

  getTransferListClient(): HttpClient {
    return this.getHttpClient('https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com');
  }
}