import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('token');
      const expiry = await SecureStore.getItemAsync('tokenExpiry');

      if (!token || !expiry || Date.now() > parseInt(expiry)) {
        router.replace('/(auth)/login');
      } else {
        router.replace('/home'); // still logged in
      }

      setCheckingAuth(false);
    };
    checkAuth();
    
  }, []);

  // Always render the stack, do not return null
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
