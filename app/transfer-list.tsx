import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Header } from '../src/mobile/components/common/Header/Header';
import { TransferList } from '../src/mobile/components/banking/TransferList/TransferList';
import { useBanking } from '../src/mobile/hooks/useBanking';
import { TransferFilter } from '../src/business/entities/Banking';
import { theme } from '../src/mobile/styles/theme';

export default function TransferListScreen() {
  const { transfers, loading, getTransferList, filterTransfers } = useBanking();

  const handleRefresh = async () => {
    await getTransferList();
  };

  const handleFilter = async (filter: TransferFilter) => {
    await filterTransfers(filter);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Transferências"
        showBackButton
        onBackPress={handleBack}
      />
      
      <TransferList
        transfers={transfers}
        loading={loading}
        onRefresh={handleRefresh}
        onFilter={handleFilter}
      />
    </SafeAreaView>
  );
}