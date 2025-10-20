// (auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login" screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
    </Stack>
  );
}
