import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../styles/theme';

export const Container = styled(View)`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.xl}px;
  border-radius: ${theme.borderRadius.lg}px;
  margin: ${theme.spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 5;
`;

export const Title = styled(Text)`
  font-size: ${theme.typography.body.fontSize}px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: ${theme.spacing.sm}px;
`;

export const BalanceContainer = styled(View)`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: ${theme.spacing.md}px;
`;

export const BalanceAmount = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  color: #FFFFFF;
  margin-right: ${theme.spacing.sm}px;
`;

export const Currency = styled(Text)`
  font-size: ${theme.typography.caption.fontSize}px;
  color: rgba(255, 255, 255, 0.8);
`;

export const RefreshButton = styled(TouchableOpacity)`
  align-self: flex-end;
  padding: ${theme.spacing.sm}px;
`;

export const RefreshText = styled(Text)`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${theme.typography.caption.fontSize}px;
`;