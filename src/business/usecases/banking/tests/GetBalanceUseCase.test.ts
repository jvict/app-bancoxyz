import { GetBalanceUseCase } from '../GetBalanceUseCase';
import { IBankingRepository } from '../../../repositories/interefaces/IBankingRepository';
import { Balance } from '../../../entities/Banking';

describe('GetBalanceUseCase', () => {
  let mockBankingRepository: jest.Mocked<IBankingRepository>;
  let getBalanceUseCase: GetBalanceUseCase;

  beforeEach(() => {
    mockBankingRepository = {
      getBalance: jest.fn(),
      makeTransfer: jest.fn(),
      getTransferList: jest.fn(),
    };
    getBalanceUseCase = new GetBalanceUseCase(mockBankingRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should return balance when repository call succeeds', async () => {
      // Arrange
      const mockBalance: Balance = {
        currency: 'BRL',
        accountBalance: 1000.50,
      };
      mockBankingRepository.getBalance.mockResolvedValue(mockBalance);

      // Act
      const result = await getBalanceUseCase.execute();

      // Assert
      expect(result).toEqual(mockBalance);
      expect(mockBankingRepository.getBalance).toHaveBeenCalledTimes(1);
    });

    it('should throw error when repository call fails', async () => {
      // Arrange
      const errorMessage = 'Repository error';
      mockBankingRepository.getBalance.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(getBalanceUseCase.execute()).rejects.toThrow(
        'Não foi possível obter o saldo da conta'
      );
      expect(mockBankingRepository.getBalance).toHaveBeenCalledTimes(1);
    });

    it('should handle network errors', async () => {
      // Arrange
      mockBankingRepository.getBalance.mockRejectedValue(new TypeError('Network error'));

      // Act & Assert
      await expect(getBalanceUseCase.execute()).rejects.toThrow(
        'Não foi possível obter o saldo da conta'
      );
    });
  });
});