import React from 'react';
import { ScrollView, StyleSheet, Alert, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Header } from '../../src/mobile/components/common/Header/Header';
import { BalanceCard } from '../../src/mobile/components/banking/BalanceCard/BalanceCard';
import { Card } from '../../src/mobile/components/common/Card/Card';

import { Button } from '../../src/mobile/components/common/Button/Button';
import { useAuth } from '../../src/mobile/hooks/useAuth';
import { useBanking } from '../../src/mobile/hooks/useBanking';
import { theme } from '../../src/mobile/styles/theme';

export default function HomeScreen() {
  const { user } = useAuth();
  const { balance, loading, getBalance, error } = useBanking();

  const handleRefreshBalance = async () => {
    try {
      await getBalance();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível atualizar o saldo');
    }
  };

  const navigateToTransfer = () => {
    router.push('/transfer');
  };

  const navigateToTransferList = () => {
    router.push('/transfer-list');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Olá, ${user?.name?.split(' ')[0]}!`} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <BalanceCard
          balance={balance}
          loading={loading}
          onRefresh={handleRefreshBalance}
        />

        {error && (
          <Card title="⚠️ Atenção" padding="medium">
            <Text style={styles.errorText}>{error}</Text>
          </Card>
        )}

        <Card title="Ações Rápidas" padding="large">
          <Button
            title="💸 Nova Transferência"
            onPress={navigateToTransfer}
            fullWidth
            style={{ marginBottom: theme.spacing.md }}
          />
          
          <Button
            title="📋 Ver Transferências"
            variant="outline"
            onPress={navigateToTransferList}
            fullWidth
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.body.fontSize,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  summaryLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
});