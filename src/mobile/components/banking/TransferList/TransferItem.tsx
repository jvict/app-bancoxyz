import React from 'react';
import { Transfer } from '../../../../business/entities/Banking';
// import { FormatUtils } from '../../../utils/formatters';
import {
  Container,
  PayeerInfo,
  PayeerName,
  PayeerDocument,
  TransferDetails,
  Amount,
  Date,
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
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <Container>
      <PayeerInfo>
        <PayeerName>{transfer.payeer.name}</PayeerName>
        <PayeerDocument>{transfer.payeer.document}</PayeerDocument>
      </PayeerInfo>
      
      <TransferDetails>
        <Amount>{formatCurrency(transfer.value, transfer.currency)}</Amount>
        <Date>{formatDate(transfer.date)}</Date>
      </TransferDetails>
    </Container>
  );
};