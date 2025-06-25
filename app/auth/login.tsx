import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../../src/mobile/hooks/useAuth';
import { LoginRequest } from '../../src/business/entities/User';
import { LoginForm } from '@/mobile/components/forms/LoginForm/LoginForm';


export default function LoginScreen() {
  const { login, loading } = useAuth();

  const handleLogin = async (credentials: LoginRequest) => {
    await login(credentials);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
      />
    </SafeAreaView>
  );
}