import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Container, Form, Title, LinkText, LinkContainer } from './LoginForm.styles';
import { LoginRequest } from '../../../../business/entities/User';

export interface LoginFormProps {
  onSubmit: (credentials: LoginRequest) => Promise<void>;
  onNavigateToRegister: () => void;
  loading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onNavigateToRegister,
  loading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 3) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await onSubmit({ email: email.trim(), password });
    } catch (error) {
      Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao fazer login'
      );
    }
  };

  return (
    <Container>
      <Form>
        <Title>Entrar</Title>
        
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          placeholder="Digite seu email"
        />

        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
          autoComplete="password"
          placeholder="Digite sua senha"
        />

        <Button
          title="Entrar"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
        />

        <LinkContainer>
          <LinkText onPress={onNavigateToRegister}>
            Não tem conta? Cadastre-se
          </LinkText>
        </LinkContainer>
      </Form>
    </Container>
  );
};