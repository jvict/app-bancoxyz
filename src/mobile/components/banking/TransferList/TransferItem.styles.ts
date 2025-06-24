import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { theme } from '../../../styles/theme';

export const Container = styled(View)`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.lg}px;
  margin: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border-radius: ${theme.borderRadius.md}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

export const PayeerInfo = styled(View)`
  flex: 1;
`;

export const PayeerName = styled(Text)`
  font-size: ${theme.typography.body.fontSize}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const PayeerDocument = styled(Text)`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.text.secondary};
`;

export const TransferDetails = styled(View)`
  align-items: flex-end;
`;

export const Amount = styled(Text)`
  font-size: ${theme.typography.body.fontSize}px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const Date = styled(Text)`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.text.secondary};
`;

export const Currency = styled(Text)`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.text.secondary};
`;