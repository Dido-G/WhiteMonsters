import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function NewEnvironment() {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    const newId = Date.now().toString();
    // Later you can save this environment to AsyncStorage or backend
    router.push({ pathname: "/(tabs)/environment/[id]", params: { id: newId, name } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Environment</Text>
      <TextInput
        placeholder="Enter environment name..."
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4EF",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A5D3B",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1A5D3B",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
