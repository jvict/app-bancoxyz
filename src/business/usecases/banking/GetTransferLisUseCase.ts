import { Transfer, TransferFilter } from "@/business/entities/Banking";
import { IUseCase } from "@/business/interfaces/IUseCase";
import { IBankingRepository } from "@/business/repositories/interefaces/IBankingRepository";

export class GetTransferListUseCase implements IUseCase<TransferFilter | void, Transfer[]>{
    constructor(private bankingRepository : IBankingRepository) {}
    async execute(filters: TransferFilter ): Promise<Transfer[]> {
        try {
            const transfers = await this.bankingRepository.getTransferList();

            if(!filters){
                return transfers
            }

            return this.applyFilters(transfers,filters)
        } catch (error) {
            throw new Error("Method not implemented.");
        }
        
    }
    private applyFilters(transfers: Transfer[], filter: TransferFilter): Transfer[] {
    return transfers.filter(transfer => {
      // Filtro por nome do destinatário
      if (filter.payeerName) {
        const nameMatch = transfer.payeer.name
          .toLowerCase()
          .includes(filter.payeerName.toLowerCase());
        if (!nameMatch) return false;
      }

      // Filtro por valor mínimo
      if (filter.minValue && transfer.value < filter.minValue) {
        return false;
      }

      // Filtro por valor máximo
      if (filter.maxValue && transfer.value > filter.maxValue) {
        return false;
      }

      // Filtro por data inicial
      if (filter.startDate) {
        const transferDate = new Date(transfer.date);
        const startDate = new Date(filter.startDate);
        if (transferDate < startDate) return false;
      }

      // Filtro por data final
      if (filter.endDate) {
        const transferDate = new Date(transfer.date);
        const endDate = new Date(filter.endDate);
        if (transferDate > endDate) return false;
      }

      return true;
    });
  }
    
}