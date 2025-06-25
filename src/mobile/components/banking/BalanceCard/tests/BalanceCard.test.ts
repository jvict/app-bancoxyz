import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { BalanceCard } from '../BalanceCard.js';
import { Balance } from '../../../../../business/entities/Banking.js';

// Mock styled-components theme
const mockTheme = {
  colors: {
    primary: '#007AFF',
    surface: '#FFFFFF',
    background: '#F5F5F5',
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h2: { fontSize: 24, fontWeight: 'bold' },
    body: { fontSize: 16 },
    caption: { fontSize: 12 },
  },
  borderRadius: {
    md: 8,
  },
};

jest.mock('styled-components/native', () => ({
  ThemeProvider: ({ children }: any) => children,
}));

describe('BalanceCard', () => {
  const mockBalance: Balance = {
    currency: 'BRL',
    accountBalance: 1500.75,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render balance correctly', () => {
    const { getByText } = render(
      <BalanceCard balance={mockBalance} />
    );

    expect(getByText('Saldo Atual')).toBeTruthy();
    expect(getByText('BRL')).toBeTruthy();
  });

  it('should show loading state', () => {
    const { getByText } = render(
      <BalanceCard balance={null} loading={true} />
    );

    expect(getByText('Carregando...')).toBeTruthy();
  });

  it('should show error state when balance is null and not loading', () => {
    const { getByText } = render(
      <BalanceCard balance={null} loading={false} />
    );

    expect(getByText('Erro ao carregar saldo')).toBeTruthy();
  });

  it('should call onRefresh when refresh button is pressed', () => {
    const mockOnRefresh = jest.fn();
    const { getByText } = render(
      <BalanceCard 
        balance={mockBalance} 
        onRefresh={mockOnRefresh} 
      />
    );

    const refreshButton = getByText('🔄 Atualizar');
    fireEvent.press(refreshButton);

    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it('should not render refresh button when onRefresh is not provided', () => {
    const { queryByText } = render(
      <BalanceCard balance={mockBalance} />
    );

    expect(queryByText('🔄 Atualizar')).toBeNull();
  });

  it('should disable refresh button when loading', () => {
    const mockOnRefresh = jest.fn();
    const { getByText } = render(
      <BalanceCard 
        balance={mockBalance} 
        onRefresh={mockOnRefresh}
        loading={true}
      />
    );

    const refreshButton = getByText('🔄 Atualizar');
    expect(refreshButton.props.accessibilityState?.disabled).toBe(true);
  });
});