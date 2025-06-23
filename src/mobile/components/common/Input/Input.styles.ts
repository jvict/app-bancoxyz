import styled from 'styled-components/native';
import { TextInput, Text, View } from 'react-native';
import { theme } from '../../../styles/theme';

interface ContainerProps {
  fullWidth: boolean;
}

interface InputProps {
  hasError: boolean;
}

interface InputContainerProps {
  hasError: boolean;
}

export const Container = styled(View)<ContainerProps>`
  width: ${({ fullWidth } : any) => fullWidth ? '100%' : 'auto'};
  margin-bottom: ${theme.spacing.md}px;
`;

export const Label = styled(Text)`
  font-size: ${theme.typography.caption.fontSize}px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs}px;
`;

export const InputContainer = styled(View)<InputContainerProps>`
  border: 1px solid ${({ hasError } : any) => 
    hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md}px;
  background-color: ${theme.colors.surface};
`;

export const StyledTextInput = styled(TextInput)<InputProps>`
  padding: ${theme.spacing.md}px;
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text.primary};
  min-height: 44px;
`;

export const ErrorText = styled(Text)`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs}px;
`;