import { MakeTransferUseCase } from '../MakeTransferUseCase.js';
import { IBankingRepository } from '../../../repositories/interefaces/IBankingRepository.js';
import { TransferRequest, TransferResponse } from '../../../entities/Banking.js';

describe('MakeTransferUseCase', () => {
  let mockBankingRepository: jest.Mocked<IBankingRepository>;
  let makeTransferUseCase: MakeTransferUseCase;

  beforeEach(() => {
    mockBankingRepository = {
      getBalance: jest.fn(),
      makeTransfer: jest.fn(),
      getTransferList: jest.fn(),
    };
    makeTransferUseCase = new MakeTransferUseCase(mockBankingRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const validTransferRequest: TransferRequest = {
      value: 100.50,
      currency: 'BRL',
      payeerDocument: '12345678901',
      transferDate: '2024-12-31',
    };

    it('should return success response when transfer is valid', async () => {
      // Arrange
      const mockResponse: TransferResponse = { status: 'success', message: 'Ok, Transferencia concluida com sucesso'};
      mockBankingRepository.makeTransfer.mockResolvedValue(mockResponse);

      // Act
      const result = await makeTransferUseCase.execute(validTransferRequest);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mockBankingRepository.makeTransfer).toHaveBeenCalledWith(validTransferRequest);
    });

    it('should throw error when value is zero or negative', async () => {
      // Arrange
      const invalidRequest = { ...validTransferRequest, value: 0 };

      // Act & Assert
      await expect(makeTransferUseCase.execute(invalidRequest)).rejects.toThrow(
        'Valor da transferência deve ser maior que zero'
      );
      expect(mockBankingRepository.makeTransfer).not.toHaveBeenCalled();
    });

    it('should throw error when payeerDocument is empty', async () => {
      // Arrange
      const invalidRequest = { ...validTransferRequest, payeerDocument: '' };

      // Act & Assert
      await expect(makeTransferUseCase.execute(invalidRequest)).rejects.toThrow(
        'Documento do destinatário é obrigatório'
      );
      expect(mockBankingRepository.makeTransfer).not.toHaveBeenCalled();
    });

    it('should throw error when currency is empty', async () => {
      // Arrange
      const invalidRequest = { ...validTransferRequest, currency: '' };

      // Act & Assert
      await expect(makeTransferUseCase.execute(invalidRequest)).rejects.toThrow(
        'Moeda é obrigatória'
      );
      expect(mockBankingRepository.makeTransfer).not.toHaveBeenCalled();
    });

    it('should throw error when date format is invalid', async () => {
      // Arrange
      const invalidRequest = { ...validTransferRequest, transferDate: '31/12/2024' };

      // Act & Assert
      await expect(makeTransferUseCase.execute(invalidRequest)).rejects.toThrow(
        'Data deve estar no formato YYYY-MM-DD'
      );
      expect(mockBankingRepository.makeTransfer).not.toHaveBeenCalled();
    });

    it('should throw error when date is in the past', async () => {
      // Arrange
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const pastDate = yesterday.toISOString().split('T')[0];
      const invalidRequest = { ...validTransferRequest, transferDate: pastDate };

      // Act & Assert
      await expect(makeTransferUseCase.execute(invalidRequest)).rejects.toThrow(
        'Data da transferência não pode ser no passado'
      );
      expect(mockBankingRepository.makeTransfer).not.toHaveBeenCalled();
    });

    it('should accept today as transfer date', async () => {
      // Arrange
      const today = new Date().toISOString().split('T')[0];
      const validRequest = { ...validTransferRequest, transferDate: today };
      const mockResponse: TransferResponse = { status: 'success', message: 'Ok, transferência concluida com sucesso'};
      mockBankingRepository.makeTransfer.mockResolvedValue(mockResponse);

      // Act
      const result = await makeTransferUseCase.execute(validRequest);

      // Assert
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when repository call fails', async () => {
      // Arrange
      mockBankingRepository.makeTransfer.mockRejectedValue(new Error('Repository error'));

      // Act & Assert
      await expect(makeTransferUseCase.execute(validTransferRequest)).rejects.toThrow(
        'Não foi possível realizar a transferência'
      );
      expect(mockBankingRepository.makeTransfer).toHaveBeenCalledWith(validTransferRequest);
    });
  });
});