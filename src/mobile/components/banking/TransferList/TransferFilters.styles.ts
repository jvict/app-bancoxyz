import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../styles/theme';

export const Container = styled(View)`
  background-color: ${theme.colors.surface};
  margin: ${theme.spacing.md}px;
  padding: ${theme.spacing.lg}px;
  border-radius: ${theme.borderRadius.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Header = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg}px;
`;

export const Title = styled(Text)`
  font-size: ${theme.typography.h3.fontSize}px;
  font-weight: ${theme.typography.h3.fontWeight};
  color: ${theme.colors.text.primary};
`;

export const CloseButton = styled(TouchableOpacity)`
  padding: ${theme.spacing.sm}px;
`;

export const CloseButtonText = styled(Text)`
  font-size: 18px;
  color: ${theme.colors.text.secondary};
`;

export const FilterGroup = styled(View)`
  margin-bottom: ${theme.spacing.md}px;
`;

export const FilterRow = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const ButtonGroup = styled(View)`
  flex-direction: row;
  margin-top: ${theme.spacing.lg}px;
`;