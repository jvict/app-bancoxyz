import { Balance } from "@/business/entities/Banking";
import { IUseCase } from "@/business/interfaces/IUseCase";
import { IBankingRepository } from "@/business/repositories/interefaces/IBankingRepository";

export class GetBalanceUseCase implements IUseCase<void, Balance> {
    constructor(private bankingRepository : IBankingRepository){}
    async execute(): Promise<Balance> {
        try {
            return await this.bankingRepository.getBalance();
        } catch (error) {
            throw new Error("Não foi possível obter o saldo da conta");
        }
        
    }
}