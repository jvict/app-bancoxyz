import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonText, LoadingIndicator, StyledButton } from './Button.styles';


export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingIndicator size="small" color="white" />
      ) : (
        <ButtonText variant={variant} size={size}>
          {title}
        </ButtonText>
      )}
    </StyledButton>
  );
};