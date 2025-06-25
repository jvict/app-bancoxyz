import React from 'react';
import { ViewProps } from 'react-native';
import { Container, Title, Content } from './Card.styles';

export interface CardProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
  padding?: 'small' | 'medium' | 'large';
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  padding = 'medium',
  shadow = true,
  ...props
}) => {
  return (
    <Container padding={padding} shadow={shadow} {...props}>
      {title && <Title>{title}</Title>}
      <Content hasTitle={!!title}>
        {children}
      </Content>
    </Container>
  );
};