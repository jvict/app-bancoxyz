import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { Header } from '../src/mobile/components/common/Header/Header';
import { TransferForm } from '../src/mobile/components/banking/TransferForm/TransferForm';
import { useBanking } from '../src/mobile/hooks/useBanking';
import { TransferRequest } from '../src/business/entities/Banking';
import { theme } from '../src/mobile/styles/theme';

export default function TransferScreen() {
  const { makeTransfer, loading } = useBanking();

  const handleTransfer = async (transferData: TransferRequest) => {
    try {
      const result = await makeTransfer(transferData);

      if (result.status === 'success') {
        Alert.alert(
          'Sucesso!',
          `${result.message}`,
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
      } else {
      }
    } catch (error) {
      throw new Error('Falha na transferência');

    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Nova Transferência"
        showBackButton
        onBackPress={handleBack}
      />

      <TransferForm
        onSubmit={handleTransfer}
        loading={loading}
      />
    </SafeAreaView>
  );
}