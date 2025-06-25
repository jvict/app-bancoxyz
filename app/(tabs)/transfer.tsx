import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Header } from '../../src/mobile/components/common/Header/Header';
import { Button } from '../../src/mobile/components/common/Button/Button';
import { TransferList } from '../../src/mobile/components/banking/TransferList/TransferList';
import { useBanking } from '../../src/mobile/hooks/useBanking';
import { TransferFilter } from '../../src/business/entities/Banking';
import { theme } from '../../src/mobile/styles/theme';

export default function TransfersScreen() {
  const { transfers, loading, getTransferList, filterTransfers } = useBanking();

  const handleRefresh = async () => {
    await getTransferList();
  };

  const handleFilter = async (filter: TransferFilter) => {
    await filterTransfers(filter);
  };

  const navigateToNewTransfer = () => {
    router.push('/transfer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Transferências"
        rightAction={
          <Button
            title="Nova"
            size="small"
            onPress={navigateToNewTransfer}
          />
        }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});