import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EnvironmentPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [plants, setPlants] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlant, setNewPlant] = useState("");

  const addPlant = () => {
    if (!newPlant.trim()) {
      Alert.alert("Please enter a plant name!");
      return;
    }
    setPlants((prev) => [...prev, newPlant.trim()]);
    setNewPlant("");
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#1A5D3B" />
      </TouchableOpacity>
      <Text style={styles.title}>Environment {id}</Text>

      {plants.length === 0 ? (
        <Text style={styles.emptyText}>No plants yet 🌱</Text>
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.plantBox}>
              <Ionicons name="leaf-outline" size={22} color="#1A5D3B" />
              <Text style={styles.plantText}>{item}</Text>
            </View>
          )}
        />
      )}

      {/* Floating add plant button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Modal for new plant name */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Plant</Text>
            <TextInput
              placeholder="Enter plant name..."
              value={newPlant}
              onChangeText={setNewPlant}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#999" }]}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: "#fff" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#1A5D3B" }]}
                onPress={addPlant}
              >
                <Text style={{ color: "#fff" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4EF", padding: 20 },
  title: {
    fontSize: 28,
    color: "#1A5D3B",
    fontWeight: "700",
    alignSelf: "center",
    marginVertical: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#4F6F52",
    marginTop: 20,
    fontSize: 16,
  },
  plantBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  plantText: { fontSize: 18, color: "#1A5D3B", marginLeft: 8 },
  fab: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "#1A5D3B",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "600", color: "#1A5D3B" },
  input: {
    borderWidth: 1,
    borderColor: "#D9E2DA",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
});
