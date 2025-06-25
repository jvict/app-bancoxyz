import React from 'react';
import { 
  Container, 
  LoadingIndicator, 
  LoadingText 
} from './Loading.styles';

export interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
  overlay?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  text = 'Carregando...',
  size = 'large',
  overlay = false,
}) => {
  return (
    <Container overlay={overlay}>
      <LoadingIndicator size={size} color="#007AFF" />
      {text && <LoadingText>{text}</LoadingText>}
    </Container>
  );
};