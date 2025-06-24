import styled from 'styled-components/native';
import { View, Text, TextInput } from 'react-native';
import { theme } from '../../../styles/theme';

export const Container = styled(View)`
  flex: 1;
  padding: ${theme.spacing.md}px;
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
  font-size: ${theme.typography.h2.fontSize}px;
  font-weight: ${theme.typography.h2.fontWeight};
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl}px;
`;

export const SectionTitle = styled(Text)`
  font-size: ${theme.typography.h3.fontSize}px;
  font-weight: ${theme.typography.h3.fontWeight};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
  margin-top: ${theme.spacing.lg}px;
`;

export const DatePickerContainer = styled(View)`
  margin-bottom: ${theme.spacing.md}px;
`;

export const DatePickerLabel = styled(Text)`
  font-size: ${theme.typography.caption.fontSize}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

interface DateInputProps {
  hasError: boolean;
}

export const DateInput = styled(TextInput)<DateInputProps>`
  border: 1px solid ${({ hasError } : any) => 
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.md}px;
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text.primary};
  min-height: 44px;
`;