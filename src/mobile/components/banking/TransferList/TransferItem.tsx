import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transfer } from '../../../../business/entities/Banking';

interface TransferItemProps {
  transfer: Transfer;
}

export const TransferItem: React.FC<TransferItemProps> = ({ transfer }) => {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.payeeName}>{transfer.payeer.name}</Text>
        <Text style={styles.amount}>
          {formatCurrency(transfer.value, transfer.currency)}
        </Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.document}>
          CPF: {transfer.payeer.document}
        </Text>
        <Text style={styles.date}>
          {formatDate(transfer.date)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  payeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  document: {
    fontSize: 14,
    color: '#666666',
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
});