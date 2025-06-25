import React, { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Transfer } from '../../../../business/entities/Banking';
import { TransferItem } from './TransferItem';
import { 
  Container, 
  Header, 
  Title, 
  EmptyState,
  EmptyStateText
} from './TransferList.styles';

export interface TransferListProps {
  transfers: Transfer[];
  loading?: boolean;
  onRefresh?: () => void;
}

export const TransferList: React.FC<TransferListProps> = ({
  transfers,
  loading = false,
  onRefresh,
}) => {
  const renderTransferItem: ListRenderItem<Transfer> = ({ item }) => (
    <TransferItem transfer={item} />
  );

  const renderEmptyComponent = () => (
    <EmptyState>
      <EmptyStateText>
        {loading ? 'Carregando transferências...' : 'Nenhuma transferência encontrada'}
      </EmptyStateText>
    </EmptyState>
  );

  return (
    <Container>
      <Header>
        <Title>Transferências</Title>
      </Header>

      <FlatList
        data={transfers}
        renderItem={renderTransferItem}
        keyExtractor={(item, index) => `${item.payeer.document}-${index}`}
        ListEmptyComponent={renderEmptyComponent}
        onRefresh={onRefresh}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};