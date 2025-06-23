import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../styles/theme';

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.background};
`;

export const Form = styled(View)`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.xl}px;
  border-radius: ${theme.borderRadius.lg}px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Title = styled(Text)`
  font-size: ${theme.typography.h1.fontSize}px;
  font-weight: ${theme.typography.h1.fontWeight};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const LinkContainer = styled(View)`
  margin-top: ${theme.spacing.lg}px;
  align-items: center;
`;

export const LinkText = styled(Text)`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.primary};
  font-weight: 600;
`;