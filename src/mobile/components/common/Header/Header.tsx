import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
  Container,
  Title,
  BackButton,
  BackButtonText,
  RightAction,
} from './Header.styles';

export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightAction,
}) => {
  return (
    <Container>
      {showBackButton ? (
        <BackButton onPress={onBackPress}>
          <BackButtonText>← Voltar</BackButtonText>
        </BackButton>
      ) : (
        <BackButton disabled />
      )}
      
      <Title>{title}</Title>
      
      <RightAction>
        {rightAction}
      </RightAction>
    </Container>
  );
};