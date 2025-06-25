import { useState, useEffect } from 'react';
import { Balance, Transfer, TransferRequest } from '../../business/entities/Banking';
import { BankingRepositoryImpl } from '../../business/repositories/impl/BankingRepositoruImpl';
import { GetBalanceUseCase } from '../../business/usecases/banking/GetBalanceUseCase';
import { MakeTransferUseCase } from '../../business/usecases/banking/MakeTransferUseCase';
import { GetTransferListUseCase } from '@/business/usecases/banking/GetTransferLisUseCase';

export const useBanking = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Repositories e Use Cases
  const bankingRepository = new BankingRepositoryImpl();
  const getBalanceUseCase = new GetBalanceUseCase(bankingRepository);
  const makeTransferUseCase = new MakeTransferUseCase(bankingRepository);
  const getTransferListUseCase = new GetTransferListUseCase(bankingRepository);

  const getBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const balanceData = await getBalanceUseCase.execute();
      setBalance(balanceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter saldo');
    } finally {
      setLoading(false);
    }
  };

  const makeTransfer = async (transferData: TransferRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await makeTransferUseCase.execute(transferData);
      console.log("")
      if (result) {
        // Atualizar saldo e lista de transferências após transferência bem-sucedida
        await Promise.all([getBalance(), getTransferList()]);
      }
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar transferência';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getTransferList = async () => {
    setLoading(true);
    setError(null);
    try {
      const transferList = await getTransferListUseCase.execute();
      setTransfers(transferList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter transferências');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await Promise.all([getBalance(), getTransferList()]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  return {
    balance,
    transfers,
    allTransfers: transfers,
    loading,
    error,
    getBalance,
    makeTransfer,
    getTransferList,
    refreshData,
  };
};