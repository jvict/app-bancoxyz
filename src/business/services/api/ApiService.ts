import { HttpClient } from './HttpClient';

export class ApiService {
  private static instance: ApiService;
  private httpClient: HttpClient;

  private constructor() {
    this.httpClient = new HttpClient('https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com');
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  getHttpClient(): HttpClient {
    return this.httpClient;
  }

  setAuthToken(token: string): void {
    this.httpClient.setAuthToken(token);
  }

  removeAuthToken(): void {
    this.httpClient.removeAuthToken();
  }
}