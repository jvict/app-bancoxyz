import { Balance, TransferRequest, TransferResponse, Transfer } from "@/business/entities/Banking";
import { IBankingRepository } from "../interefaces/IBankingRepository";
import { ApiService } from "@/business/services/api/ApiService";

export class BankingRepositoryImpl implements IBankingRepository {
    private apiService: ApiService;

    constructor() {
        this.apiService = ApiService.getInstance();
    }


    async getBalance(): Promise<Balance> {
        const response = await fetch(
            'https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer fake-jwt-token',
                    'Content-Type': 'application/json',
                },
            });

        if (!response.ok) {
            throw new Error(`Erro ao obter saldo: ${response.status}`);
        }

        return await response.json();
    }
    async makeTransfer(transferData: TransferRequest): Promise<TransferResponse> {
        const response = await fetch(
            'https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer fake-jwt-token',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transferData)
            });

        if (!response.ok) {
            throw new Error(`Erro ao obter saldo: ${response.status}`);
        }

        return await response.json();
    }
    async getTransferList(): Promise<Transfer[]> {
        const response = await fetch(
            'https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer fake-jwt-token',
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao obter saldo: ${response.status}`);
        }

        return await response.json();
    }
}