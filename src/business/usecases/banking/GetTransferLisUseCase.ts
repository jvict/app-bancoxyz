import { Transfer } from "@/business/entities/Banking";
import { IUseCase } from "@/business/interfaces/IUseCase";
import { IBankingRepository } from "@/business/repositories/interefaces/IBankingRepository";

export class GetTransferListUseCase implements IUseCase< void, Transfer[]> {
  constructor(private bankingRepository: IBankingRepository) { }
  async execute(): Promise<Transfer[]> {
    try {
      const transfers = await this.bankingRepository.getTransferList();


      return transfers;
    } catch (error) {
      throw new Error("Method not implemented.");
    }

  }
}