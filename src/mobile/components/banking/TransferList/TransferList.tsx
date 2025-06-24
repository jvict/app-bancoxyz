import React, { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Transfer, TransferFilter } from '../../../../business/entities/Banking';
import { TransferItem } from './TransferItem';
import { TransferFilters } from './TransferFilters';
import { 
  Container, 
  Header, 
  Title, 
  FilterButton,
  FilterButtonText,
  EmptyState,
  EmptyStateText
} from './TransferList.styles';

export interface TransferListProps {
  transfers: Transfer[];
  loading?: boolean;
  onRefresh?: () => void;
  onFilter?: (filter: TransferFilter) => void;
}

export const TransferList: React.FC<TransferListProps> = ({
  transfers,
  loading = false,
  onRefresh,
  onFilter,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<TransferFilter>({});

  const handleFilter = (filter: TransferFilter) => {
    setCurrentFilter(filter);
    setShowFilters(false);
    onFilter?.(filter);
  };

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
        <FilterButton onPress={() => setShowFilters(!showFilters)}>
          <FilterButtonText>🔍 Filtros</FilterButtonText>
        </FilterButton>
      </Header>

      {showFilters && (
        <TransferFilters
          currentFilter={currentFilter}
          onApplyFilter={handleFilter}
          onClose={() => setShowFilters(false)}
        />
      )}

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