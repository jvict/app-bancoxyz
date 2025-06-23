import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../styles/theme';

export const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md}px;
  background-color: ${theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
  min-height: 60px;
`;

export const Title = styled(Text)`
  font-size: ${theme.typography.h3.fontSize}px;
  font-weight: ${theme.typography.h3.fontWeight};
  color: ${theme.colors.text.primary};
  text-align: center;
  flex: 1;
`;

export const BackButton = styled(TouchableOpacity)`
  padding: ${theme.spacing.sm}px;
  min-width: 80px;
`;

export const BackButtonText = styled(Text)`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.primary};
  font-weight: 600;
`;

export const RightAction = styled(View)`
  min-width: 80px;
  align-items: flex-end;
`;