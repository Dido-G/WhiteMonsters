import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createPlant, getPlantsByEnvironment } from "services/plantService";

// ===== Types =====
interface Plant {
  id: string;
  name: string;
  lastWatered: string;
  moisture: string;
  light: string;
}

interface Environment {
  id: string;
  name: string;
  plants: Plant[];
}

// ===== Component =====
export default function EnvironmentPage() {
  const router = useRouter();
  const { id, plants } = useLocalSearchParams();

  // Ensure single string values
  const envId = Array.isArray(id) ? id[0] : id;
  const plantsString = Array.isArray(plants) ? plants[0] : plants;
  const initialPlants: Plant[] = plantsString ? JSON.parse(plantsString) : [];

  // ===== State =====
  const [environment, setEnvironment] = useState<Environment | null>({
    id: envId || "",
    name: "Environment Name",
    plants: initialPlants,
  });
  const [plantList, setPlantList] = useState<Plant[]>(initialPlants);
  const [showModal, setShowModal] = useState(false);
  const [newPlantName, setNewPlantName] = useState("");

  // ===== Helpers =====
  const getPlantById = (plantId: string): Plant | null => {
    return plantList.find((p) => p.id === plantId) || null;
  };


useEffect(() => {
  if (envId) {
    getPlantsByEnvironment(envId)
      .then((data) => setPlantList(data))
      .catch((err) => console.error(err));
  }
}, [envId]);


const openPlantPage = (plantId: string) => {
  const plant = getPlantById(plantId);
  if (!plant) return Alert.alert("Plant not found");

  router.push({
    pathname: "/(tabs)/plant/[id]",
    params: {
      id: plant.id,
      envId: environment?.id,
      name: plant.name,
      lastWatered: plant.lastWatered,
      moisture: plant.moisture,
      light: plant.light,
    },
  });
};

  // ===== Add Plant =====
const handleAddPlant = async () => {
  if (!newPlantName.trim()) {
    Alert.alert("Please enter a name!");
    return;
  }
  if (!envId) {
    Alert.alert("Error", "Environment ID missing");
    return;
  }

  try {
    const createdPlant = await createPlant(newPlantName.trim(), envId);

    const newPlant: Plant = {
      id: createdPlant.id,
      name: createdPlant.name,
      lastWatered: createdPlant.last_watered,
      moisture: createdPlant.moisture,
      light: createdPlant.light,
    };

    // ✅ Append new plant directly to plantList
    setPlantList((prev) => [...prev, newPlant]);

    // Optional: keep environment state in sync
    setEnvironment((prev) =>
      prev ? { ...prev, plants: [...prev.plants, newPlant] } : prev
    );

    setShowModal(false);
    setNewPlantName("");
    Alert.alert("Added!", `${newPlant.name} plant added.`);
  } catch (err: any) {
    console.error(err);
    Alert.alert("Error", err.message || "Failed to add plant");
  }
};


  if (!environment) return <Text style={{ margin: 20 }}>Loading...</Text>;

  // ===== Render =====
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#1A5D3B" />
      </TouchableOpacity>

      <Text style={styles.title}>{environment.name}</Text>

      {plantList.length === 0 ? (
        <Text style={styles.emptyText}>No plants yet 🌱</Text>
      ) : (
        <FlatList
          data={plantList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.plantBox}
              onPress={() => openPlantPage(item.id)}
            >
              <Ionicons name="leaf-outline" size={22} color="#1A5D3B" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.plantText}>{item.name}</Text>
                <Text style={styles.plantInfo}>Last watered: {item.lastWatered}</Text>
                <Text style={styles.plantInfo}>
                  Moisture: {item.moisture} | Light: {item.light}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Floating add plant button */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Modal for new plant */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Plant</Text>
            <TextInput
              placeholder="Enter plant name..."
              value={newPlantName}
              onChangeText={setNewPlantName}
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
                onPress={handleAddPlant}
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

// ===== Styles =====
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
  plantText: { fontSize: 18, color: "#1A5D3B", fontWeight: "500" },
  plantInfo: { fontSize: 14, color: "#4F6F52" },
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
