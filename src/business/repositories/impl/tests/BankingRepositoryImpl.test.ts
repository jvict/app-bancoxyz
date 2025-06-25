import { BankingRepositoryImpl } from '../BankingRepositoruImpl';
import { ApiService } from '../../../services/api/ApiService';
import { HttpClient, HttpError } from '../../../services/api/HttpClient';
import { Balance, TransferRequest, TransferResponse } from '../../../entities/Banking';

// Mock ApiService
jest.mock('../../../services/api/ApiService');

describe('BankingRepositoryImpl', () => {
  let bankingRepository: BankingRepositoryImpl;
  let mockApiService: jest.Mocked<ApiService>;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      setAuthToken: jest.fn(),
      removeAuthToken: jest.fn(),
    } as any;

    mockApiService = {
      getInstance: jest.fn(),
      getBalanceClient: jest.fn().mockReturnValue(mockHttpClient),
      getTransferClient: jest.fn().mockReturnValue(mockHttpClient),
      getTransferListClient: jest.fn().mockReturnValue(mockHttpClient),
    } as any;

    (ApiService.getInstance as jest.Mock).mockReturnValue(mockApiService);

    bankingRepository = new BankingRepositoryImpl();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    const mockBalance: Balance = {
      currency: 'BRL',
      accountBalance: 1500.75,
    };

    it('should return balance when API call succeeds', async () => {
      mockHttpClient.get.mockResolvedValue({
        data: mockBalance,
        status: 200,
        statusText: 'OK',
      });

      const result = await bankingRepository.getBalance();

      expect(result).toEqual(mockBalance);
      expect(mockHttpClient.get).toHaveBeenCalledWith('/default/balance');
    });

    it('should throw specific error for 401 status', async () => {
      const httpError: HttpError = {
        message: 'Unauthorized',
        status: 401,
      };
      mockHttpClient.get.mockRejectedValue(httpError);

      await expect(bankingRepository.getBalance()).rejects.toThrow(
        'Token de autenticação inválido ou expirado'
      );
    });

    it('should throw generic error for non-HTTP errors', async () => {
      mockHttpClient.get.mockRejectedValue(new Error('Network error'));

      await expect(bankingRepository.getBalance()).rejects.toThrow(
        'Não foi possível obter o saldo da conta'
      );
    });
  });

  describe('makeTransfer', () => {
    const transferRequest: TransferRequest = {
      value: 100.50,
      currency: 'BRL',
      payeerDocument: '12345678901',
      transferDate: '2024-12-31',
    };

    const mockResponse: TransferResponse = {
      status: 'success',
      message: 'Ok, tranferência realizada com sucesso !'
    };

    it('should return success response when transfer succeeds', async () => {
      mockHttpClient.post.mockResolvedValue({
        data: mockResponse,
        status: 200, statusText: 'OK', });

  const result = await bankingRepository.makeTransfer(transferRequest);

  expect(result).toEqual(mockResponse);
  expect(mockHttpClient.post).toHaveBeenCalledWith(
    '/default/transfer',
    transferRequest
  );
});

it('should throw error for 400 status (Bad Request)', async () => {
  const httpError: HttpError = {
    message: 'Bad Request',
    status: 400,
  };
  mockHttpClient.post.mockRejectedValue(httpError);

  await expect(
    bankingRepository.makeTransfer(transferRequest)
  ).rejects.toThrow('Dados de transferência inválidos');

  expect(mockHttpClient.post).toHaveBeenCalledWith(
    '/default/transfer',
    transferRequest
  );
});

it('should throw general error for non-HTTP issues', async () => {
  mockHttpClient.post.mockRejectedValue(new Error('Network error'));

  await expect(
    bankingRepository.makeTransfer(transferRequest)
  ).rejects.toThrow('Não foi possível realizar a transferência');
});
});

describe('getTransferList', () => { const mockTransfers = [ { value: 100.5, date: '2024-01-30', currency: 'BRL', payeer: { name: 'João Silva', document: '12345678901', }, }, { value: 50.25, date: '2024-02-01', currency: 'USD', payeer: { name: 'Maria Santos', document: '98765432100', }, }, ];

it('should return transfer list when the API succeeds', async () => {
  mockHttpClient.get.mockResolvedValue({
    data: mockTransfers,
    status: 200,
    statusText: 'OK',
  });

  const result = await bankingRepository.getTransferList();

  expect(result).toEqual(mockTransfers);
  expect(mockHttpClient.get).toHaveBeenCalledWith('/default/transferList');
});

it('should throw error if the API returns an invalid response format', async () => {
  mockHttpClient.get.mockResolvedValue({
    data: { invalid: 'data' },
    status: 200,
    statusText: 'OK',
  });

  await expect(
    bankingRepository.getTransferList()
  ).rejects.toThrow('Formato de dados inválido recebido do servidor');
});

it('should throw error for non-HTTP issues', async () => {
  mockHttpClient.get.mockRejectedValue(new Error('Network error'));

  await expect(
    bankingRepository.getTransferList()
  ).rejects.toThrow('Não foi possível obter a lista de transferências');
});
}); });