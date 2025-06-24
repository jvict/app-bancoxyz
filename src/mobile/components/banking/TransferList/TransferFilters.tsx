import React, { useState } from 'react';
import { TransferFilter } from '../../../../business/entities/Banking';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import {
  Container,
  Header,
  Title,
  CloseButton,
  CloseButtonText,
  FilterRow,
  FilterGroup,
  ButtonGroup
} from './TransferFilters.styles';

export interface TransferFiltersProps {
  currentFilter: TransferFilter;
  onApplyFilter: (filter: TransferFilter) => void;
  onClose: () => void;
}

export const TransferFilters: React.FC<TransferFiltersProps> = ({
  currentFilter,
  onApplyFilter,
  onClose,
}) => {
  const [filter, setFilter] = useState<TransferFilter>(currentFilter);

  const updateFilter = (field: keyof TransferFilter) => (value: string) => {
    setFilter(prev => ({ ...prev, [field]: value || undefined }));
  };

  const handleApply = () => {
    onApplyFilter(filter);
  };

  const handleClear = () => {
    const emptyFilter: TransferFilter = {};
    setFilter(emptyFilter);
    onApplyFilter(emptyFilter);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Container>
      <Header>
        <Title>Filtros</Title>
        <CloseButton onPress={onClose}>
          <CloseButtonText>✕</CloseButtonText>
        </CloseButton>
      </Header>

      <FilterGroup>
        <Input
          label="Nome do Destinatário"
          value={filter.payeerName || ''}
          onChangeText={updateFilter('payeerName')}
          placeholder="Digite o nome"
        />
      </FilterGroup>

      <FilterGroup>
        <FilterRow>
          <Input
            label="Valor Mínimo"
            value={filter.minValue?.toString() || ''}
            onChangeText={updateFilter('minValue')}
            keyboardType="numeric"
            placeholder="0,00"
            style={{ flex: 1, marginRight: 8 }}
          />
          <Input
            label="Valor Máximo"
            value={filter.maxValue?.toString() || ''}
            onChangeText={updateFilter('maxValue')}
            keyboardType="numeric"
            placeholder="0,00"
            style={{ flex: 1, marginLeft: 8 }}
          />
        </FilterRow>
      </FilterGroup>

      <FilterGroup>
        <FilterRow>
          <Input
            label="Data Inicial"
            value={filter.startDate || ''}
            onChangeText={updateFilter('startDate')}
            placeholder={getTodayDate()}
            style={{ flex: 1, marginRight: 8 }}
          />
          <Input
            label="Data Final"
            value={filter.endDate || ''}
            onChangeText={updateFilter('endDate')}
            placeholder={getTodayDate()}
            style={{ flex: 1, marginLeft: 8 }}
          />
        </FilterRow>
      </FilterGroup>

      <ButtonGroup>
        <Button
          title="Limpar"
          variant="outline"
          onPress={handleClear}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button
          title="Aplicar"
          onPress={handleApply}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </ButtonGroup>
    </Container>
  );
};