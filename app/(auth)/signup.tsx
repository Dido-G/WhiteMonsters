import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signupUser } from '../../services/authService';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await signupUser({ username, password });
      Alert.alert('Success', 'Account created! Please login.');
      router.push('/login');
    } catch (error: any) {
      Alert.alert('Sign up failed', error.message || 'Unknown error');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#397F54', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: '#F9FAF8', width: 320, borderRadius: 24, padding: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', marginBottom: 24 }}>Sign Up</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 16 }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 24 }}
        />

        <TouchableOpacity onPress={handleSignUp} style={{ backgroundColor: '#397F54', borderRadius: 12, paddingVertical: 16 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
