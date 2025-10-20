import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { login } from "../../services/authService"; // your backend API call

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true);
    try {
      const data = await login(username, password); // pass as separate arguments
      console.log("Logged in:", data);

      // Optionally save token to SecureStore here

      router.replace("/"); // Navigate to main app
    } catch (error: any) {
      Alert.alert("Login failed", error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#397F54", justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "#F9FAF8", width: 320, borderRadius: 24, padding: 24, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "600", marginBottom: 24 }}>Welcome</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ backgroundColor: "white", borderRadius: 12, padding: 12, marginBottom: 16 }}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ backgroundColor: "white", borderRadius: 12, padding: 12, marginBottom: 24 }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{ backgroundColor: "#397F54", borderRadius: 12, paddingVertical: 16, marginBottom: 16 }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>
            {loading ? "Logging in..." : "Log in"}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={{ fontWeight: "600" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
