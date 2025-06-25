import { Balance, TransferRequest, TransferResponse, Transfer } from "@/business/entities/Banking";
import { IBankingRepository } from "../interefaces/IBankingRepository";
import { ApiService } from "@/business/services/api/ApiService";
import { HttpError } from "@/business/services/api/HttpClient";

export class BankingRepositoryImpl implements IBankingRepository {
  private apiService: ApiService;

  constructor() {
    this.apiService = ApiService.getInstance();
  }

  async getBalance(): Promise<Balance> {
    try {
      const response = await this.apiService
        .getBalanceClient()
        .get<Balance>('/default/balance');
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter saldo:', error);
      
      if (this.isHttpError(error)) {
        switch (error.status) {
          case 401:
            throw new Error('Token de autenticação inválido ou expirado');
          case 403:
            throw new Error('Acesso não autorizado');
          case 500:
            throw new Error('Erro interno do servidor');
          default:
            throw new Error(`Erro ao obter saldo: ${error.message}`);
        }
      }
      
      throw new Error('Não foi possível obter o saldo da conta');
    }
  }

  async makeTransfer(transferData: TransferRequest): Promise<TransferResponse> {
    try {
      const response = await this.apiService
        .getTransferClient()
        .post<TransferResponse>('/default/transfer', transferData);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer transferência:', error);
      
      if (this.isHttpError(error)) {
        switch (error.status) {
          case 400:
            throw new Error('Dados de transferência inválidos');
          case 401:
            throw new Error('Token de autenticação inválido ou expirado');
          case 403:
            throw new Error('Operação não autorizada');
          case 500:
            throw new Error('Erro interno do servidor');
          default:
            throw new Error(`Erro na transferência: ${error.message}`);
        }
      }
      
      throw new Error('Não foi possível realizar a transferência');
    }
  }

  async getTransferList(): Promise<Transfer[]> {
    try {
      const response = await this.apiService
        .getTransferListClient()
        .get<TransferResponse[]>('/default/transferList');
      
      // Validar estrutura dos dados
      const transfers = Array.isArray(response.data) ? response.data : response.data.transfers;
      
      if (!Array.isArray(transfers as any)) {
        throw new Error('Formato de dados inválido recebido do servidor');
      }
      
      // Validar cada transferência
      const validatedTransfers = transfers.map((transfer : any , index :any) => {
        if (!transfer || typeof transfer !== 'object') {
          throw new Error(`Dados de transferência inválidos no índice ${index}`);
        }
        
        if (typeof transfer.value !== 'number' || transfer.value < 0) {
          throw new Error(`Valor inválido na transferência ${index}`);
        }
        
        if (!transfer.date || typeof transfer.date !== 'string') {
          throw new Error(`Data inválida na transferência ${index}`);
        }
        
        if (!transfer.payeer || typeof transfer.payeer !== 'object') {
          throw new Error(`Dados do destinatário inválidos na transferência ${index}`);
        }
        
        if (!transfer.payeer.name || !transfer.payeer.document) {
          throw new Error(`Nome ou documento do destinatário ausente na transferência ${index}`);
        }
        
        return {
          value: transfer.value,
          date: transfer.date,
          currency: transfer.currency || 'BRL',
          payeer: {
            document: transfer.payeer.document,
            name: transfer.payeer.name,
          },
        } as Transfer;
      });
      
      return validatedTransfers;
    } catch (error) {
      console.error('Erro ao obter lista de transferências:', error);
      
      if (this.isHttpError(error)) {
        switch (error.status) {
          case 401:
            throw new Error('Token de autenticação inválido ou expirado');
          case 403:
            throw new Error('Acesso não autorizado');
          case 500:
            throw new Error('Erro interno do servidor');
          default:
            throw new Error(`Erro ao obter transferências: ${error.message}`);
        }
      }
      
      if (error instanceof Error && error.message.includes('Formato de dados inválido')) {
        throw error;
      }
      
      throw new Error('Não foi possível obter a lista de transferências');
    }
  }

  private isHttpError(error: any): error is HttpError {
    return error && typeof error.status === 'number' && typeof error.message === 'string';
  }
}