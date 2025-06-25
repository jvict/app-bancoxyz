import styled from 'styled-components/native';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { theme } from '../../../styles/theme';

interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
}

interface ButtonTextProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
}

const getButtonColors = (variant: string, disabled: boolean) => {
  if (disabled) {
    return {
      backgroundColor: theme.colors.text.disabled,
      borderColor: theme.colors.text.disabled,
    };
  }

  switch (variant) {
    case 'primary':
      return {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
      };
    case 'secondary':
      return {
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.secondary,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: theme.colors.primary,
      };
    default:
      return {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
      };
  }
};

const getButtonSize = (size: string) => {
  switch (size) {
    case 'small':
      return {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        minHeight: 36,
      };
    case 'large':
      return {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 56,
      };
    default: // medium
      return {
        paddingVertical: theme.spacing.sm + 2,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 44,
      };
  }
};

const getTextColor = (variant: string, disabled: boolean) => {
  if (disabled) return theme.colors.text.disabled;
  
  switch (variant) {
    case 'outline':
      return theme.colors.primary;
    default:
      return '#FFFFFF';
  }
};

const getTextSize = (size: string) => {
  switch (size) {
    case 'small':
      return theme.typography.caption.fontSize;
    case 'large':
      return theme.typography.body.fontSize + 2;
    default:
      return theme.typography.body.fontSize;
  }
};

export const StyledButton = styled(TouchableOpacity)<StyledButtonProps>`
  ${({ variant, size, fullWidth, disabled } : any) => {
    const colors = getButtonColors(variant, disabled || false);
    const sizing = getButtonSize(size);
    
    return `
      background-color: ${colors.backgroundColor};
      border: 1px solid ${colors.borderColor};
      border-radius: ${theme.borderRadius.md}px;
      padding-vertical: ${sizing.paddingVertical}px;
      padding-horizontal: ${sizing.paddingHorizontal}px;
      min-height: ${sizing.minHeight}px;
      width: ${fullWidth ? '100%' : 'auto'};
      align-items: center;
      justify-content: center;
      opacity: ${disabled ? 0.6 : 1};
    `;
  }}
`;

export const ButtonText = styled(Text)<ButtonTextProps>`
  ${({ variant, size, disabled } : any) => `
    color: ${getTextColor(variant, disabled || false)};
    font-size: ${getTextSize(size)}px;
    font-weight: 600;
    text-align: center;
  `}
`;

export const LoadingIndicator = styled(ActivityIndicator)``;