import { TransferRequest, TransferResponse } from "@/business/entities/Banking";
import { IUseCase } from "@/business/interfaces/IUseCase";
import { IBankingRepository } from "@/business/repositories/interefaces/IBankingRepository";

export class MakeTransferUseCase implements IUseCase<TransferRequest, TransferResponse> {
    constructor(private bankingRepository: IBankingRepository) { }

    async execute(request: TransferRequest): Promise<TransferResponse> {
        this.validateTransferRequest(request);

        try {
            return await this.bankingRepository.makeTransfer(request);
        } catch (error) {
            throw new Error('Não foi possivel realizar a transferência')
        }
    }

    private validateTransferRequest(request: TransferRequest): void {
        if (!request.value || request.value <= 0) {
            throw new Error('Valor da transferência deve ser maior que zero');
        }

        if (!request.payeerDocument || request.payeerDocument.trim().length === 0) {
            throw new Error('Documento do destinatário é obrigatório');
        }

        if (!request.currency || request.currency.trim().length === 0) {
            throw new Error('Moeda é obrigatória');
        }

        if (!request.transferDate) {
            throw new Error('Data da transferência é obrigatória');
        }

        // Validar formato da data (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(request.transferDate)) {
            throw new Error('Data deve estar no formato YYYY-MM-DD');
        }

        // Validar se a data não é no passado
        const transferDate = new Date(request.transferDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (transferDate < today) {
            throw new Error('Data da transferência não pode ser no passado');
        }
    }
}