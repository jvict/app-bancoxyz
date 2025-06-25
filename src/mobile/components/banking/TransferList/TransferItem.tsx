import React, { useEffect } from 'react';
import { Transfer } from '../../../../business/entities/Banking';
import {
  Container,
  PayeerInfo,
  PayeerName,
  PayeerDocument,
  TransferDetails,
  Amount,
  TransferDate, // ← Mudei de "Date" para "TransferDate"
  Currency
} from './TransferItem.styles';

export interface TransferItemProps {
  transfer: Transfer;
}

export const TransferItem: React.FC<TransferItemProps> = ({ transfer }) => {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency === 'BRL' ? 'BRL' : 'USD',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      // Verificar se a data é válida
      if (isNaN(date.getTime())) {
        console.error('Data inválida:', dateString);
        return 'Data inválida';
      }
      
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  };

  return (
    <Container>
      <PayeerInfo>
        <PayeerName>{transfer.payeer.name}</PayeerName>
        <PayeerDocument>{transfer.payeer.document}</PayeerDocument>
      </PayeerInfo>
      
      <TransferDetails>
        <Amount>{formatCurrency(transfer.value, transfer.currency)}</Amount>
        <TransferDate>{formatDate(transfer.date)}</TransferDate> {/* ← Mudei aqui */}
      </TransferDetails>
    </Container>
  );
};