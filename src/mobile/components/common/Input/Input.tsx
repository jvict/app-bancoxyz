import React, { forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { Container, ErrorText, InputContainer, Label, StyledTextInput } from './Input.styles';


export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<any, InputProps>(({
  label,
  error,
  fullWidth = true,
  ...props
}, ref) => {
  return (
    <Container fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <InputContainer hasError={!!error}>
        <StyledTextInput
          ref={ref}
          hasError={!!error}
          placeholderTextColor="#8E8E93"
          {...props}
        />
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
});

Input.displayName = 'Input';