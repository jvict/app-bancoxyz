import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import { theme } from '../../../styles/theme';

interface ContainerProps {
  padding: 'small' | 'medium' | 'large';
  shadow: boolean;
}

interface ContentProps {
  hasTitle: boolean;
}

const getPadding = (size: string) => {
  switch (size) {
    case 'small':
      return theme.spacing.sm;
    case 'large':
      return theme.spacing.xl;
    default:
      return theme.spacing.lg;
  }
};

export const Container = styled(View)<ContainerProps>`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg}px;
  padding: ${({ padding } : any) => getPadding(padding)}px;
  
  ${({ shadow }: any) => shadow && `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    elevation: 3;
  `}
`;

export const Title = styled(Text)`
  font-size: ${theme.typography.h3.fontSize}px;
  font-weight: ${theme.typography.h3.fontWeight};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md}px;
`;

export const Content = styled(View)<ContentProps>`
  ${({ hasTitle } : any) => hasTitle && `margin-top: ${theme.spacing.sm}px;`}
`;