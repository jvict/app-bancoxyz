import { MakeTransferUseCase } from '../MakeTransferUseCase';
import { IBankingRepository } from '../../../repositories/interefaces/IBankingRepository';
import { TransferRequest, TransferResponse } from '../../../entities/Banking';

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
    // Use uma data futura para evitar problemas com validação
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7); // 7 dias no futuro
    const futureDateString = futureDate.toISOString().split('T')[0];
    
    const validTransferRequest: TransferRequest = {
      value: 100.50,
      currency: 'BRL',
      payeerDocument: '12345678901',
      transferDate: futureDateString,
    };

    it('should return success response when transfer is valid', async () => {

      const mockResponse: TransferResponse = { 
        status: 'success', 
        message: 'Ok, Transferencia concluida com sucesso'
      };
      mockBankingRepository.makeTransfer.mockResolvedValue(mockResponse);


      const result = await makeTransferUseCase.execute(validTransferRequest);


      expect(result).toEqual(mockResponse);
      expect(mockBankingRepository.makeTransfer).toHaveBeenCalledWith(validTransferRequest);
    });

    it('should throw error when value is zero or negative', async () => {

      const invalidRequest = { ...validTransferRequest, value: 0 };


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

      const mockDate = new Date('2024-06-25T12:00:00.000Z');
      const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
      (spy as any).now = jest.fn(() => mockDate.getTime());
      
      const todayString = '2024-06-25';
      const validRequest = { ...validTransferRequest, transferDate: todayString };
      const mockResponse: TransferResponse = { 
        status: 'success', 
        message: 'Ok, transferência concluida com sucesso'
      };
      mockBankingRepository.makeTransfer.mockResolvedValue(mockResponse);


      const result = await makeTransferUseCase.execute(validRequest);


      expect(result).toEqual(mockResponse);
      

      spy.mockRestore();
    });

    it('should throw error when repository call fails', async () => {

      mockBankingRepository.makeTransfer.mockRejectedValue(new Error('Repository error'));

      await expect(makeTransferUseCase.execute(validTransferRequest)).rejects.toThrow(
        'Não foi possível realizar a transferência'
      );
      expect(mockBankingRepository.makeTransfer).toHaveBeenCalledWith(validTransferRequest);
    });
  });
});