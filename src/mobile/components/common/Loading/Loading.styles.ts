import styled from 'styled-components/native';
import { View, Text, ActivityIndicator } from 'react-native';
import { theme } from '../../../styles/theme';

interface ContainerProps {
  overlay: boolean;
}

export const Container = styled(View)<ContainerProps>`
  ${({ overlay } : any) => overlay ? `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  ` : ''}
  
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.lg}px;
`;

export const LoadingIndicator = styled(ActivityIndicator)`
  margin-bottom: ${theme.spacing.md}px;
`;

export const LoadingText = styled(Text)`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text.secondary};
  text-align: center;
`;