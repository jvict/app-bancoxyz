import { Balance, Transfer, TransferRequest, TransferResponse } from "@/business/entities/Banking";

export interface IBankingRepository {
    getBalance(): Promise<Balance>;
    makeTransfer (transferData : TransferRequest) : Promise<TransferResponse>;
    getTransferList(): Promise<Transfer[]>;
}