import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../styles/theme';

export const Container = styled(View)`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg}px ${theme.spacing.md}px;
  background-color: ${theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

export const Title = styled(Text)`
  font-size: ${theme.typography.h2.fontSize}px;
  font-weight: ${theme.typography.h2.fontWeight};
  color: ${theme.colors.text.primary};
`;

export const FilterButton = styled(TouchableOpacity)`
  padding: ${theme.spacing.sm}px ${theme.spacing.md}px;
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md}px;
`;

export const FilterButtonText = styled(Text)`
  color: ${theme.colors.primary};
  font-weight: 600;
  font-size: ${theme.typography.caption.fontSize}px;
`;

export const EmptyState = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxl}px;
`;

export const EmptyStateText = styled(Text)`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;