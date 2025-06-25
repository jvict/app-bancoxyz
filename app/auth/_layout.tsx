import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../src/mobile/hooks/useAuth';
import { Loading } from '../../src/mobile/components/common/Loading/Loading';

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading text="Carregando..." />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}