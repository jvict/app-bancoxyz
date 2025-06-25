import { useState, useEffect } from 'react';
import { Balance, Transfer, TransferRequest, TransferFilter } from '../../business/entities/Banking';
import { BankingRepositoryImpl } from '../../business/repositories/impl/BankingRepositoruImpl';
import { GetBalanceUseCase } from '../../business/usecases/banking/GetBalanceUseCase';
import { MakeTransferUseCase } from '../../business/usecases/banking/MakeTransferUseCase';
import { GetTransferListUseCase } from '@/business/usecases/banking/GetTransferLisUseCase';

export const useBanking = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([]);
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
      if (result.status === 'success') {
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
      setFilteredTransfers(transferList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao obter transferências');
    } finally {
      setLoading(false);
    }
  };

  const filterTransfers = async (filter: TransferFilter) => {
    try {
      const filtered = await getTransferListUseCase.execute(filter);
      setFilteredTransfers(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao filtrar transferências');
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
    transfers: filteredTransfers,
    allTransfers: transfers,
    loading,
    error,
    getBalance,
    makeTransfer,
    getTransferList,
    filterTransfers,
    refreshData,
  };
};