import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { createEnvironment, getEnvironments } from "services/environmentService";

interface Environment {
  id: string;
  name: string;
  health: string;
  fill: number;
  plants: any[];
}

export default function HomeScreen() {
  const router = useRouter();
  const [environments, setEnvironments] = useState<Environment[]>([]);
  

  const [showModal, setShowModal] = useState(false);
  const [newEnvName, setNewEnvName] = useState("");

  const sensorData = [
    { id: "1", icon: "water-outline", label: "Moisture", value: "65%" },
    { id: "2", icon: "sunny-outline", label: "Light", value: "Medium" },
    { id: "3", icon: "thermometer-outline", label: "Temp", value: "22°C" },
    { id: "4", icon: "leaf-outline", label: "Health", value: "Good" },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case "good":
        return "#34A853";
      case "medium":
        return "#F9A825";
      case "low":
        return "#E53935";
      default:
        return "#ccc";
    }
  };

  useEffect(() => {
    const userId = 1; // Example user id
    getEnvironments(userId)
      .then((data) => {
        console.log("Environments fetched successfully:", data);

    // Map backend data to your frontend model
    if (Array.isArray(data)) {
      const mappedEnvs: Environment[] = data.map((env: any) => ({
        id: env.id.toString(),
        name: env.name,
        health: "medium",   // default value
        fill: 0.5,          // default value
        plants: [],         // default empty array
      }));

      setEnvironments(mappedEnvs);
    } else {
      setEnvironments([]);
      console.warn("Fetched environments data is not an array:", data);
    }

      })
      .catch((error) => {
        console.error("Error fetching environments:", error);
      });
  }, []);

  /** ➕ Add environment modal **/
  const openAddModal = () => {
    setShowModal(true);
  };

 const handleAddEnvironment = async () => {
  if (!newEnvName.trim()) {
    Alert.alert("Please enter a name!");
    return;
  }

  try {
    // replace with actual logged-in user later
    const userId = 1;

    // 🔥 Call backend
    const result = await createEnvironment(newEnvName.trim(), userId) as { message?: string; id?: number };

    // The API might return { message, id }
    const newEnv = {
      id: result.id?.toString() || (environments.length + 1).toString(),
      name: newEnvName.trim(),
      health: "medium",
      fill: 0.5,
      plants: [],
    };

    // ✅ Update local state
    setEnvironments([...environments, newEnv]);
    setShowModal(false);
    setNewEnvName("");

    Alert.alert("Created!", `${newEnv.name} environment added.`);
  } catch (error: any) {
    console.error(error);
    Alert.alert("Error", error.message || "Failed to create environment");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Good morning, Vanko 🌱</Text>

      {/* Sensor Boxes */}
      <View style={styles.sensorRow}>
        {sensorData.map((item) => (
          <View key={item.id} style={styles.sensorBox}>
            <Ionicons name={item.icon as any} size={24} color="#1A5D3B" />
            <Text style={styles.sensorLabel}>{item.label}</Text>
            <Text style={styles.sensorValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>Your plant environments</Text>

      {/* Environments */}
      <FlatList
        data={environments}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
                router.push({
                    pathname: "/(tabs)/environment/[id]",
                    params: { id: item.id, plants: JSON.stringify(item.plants) },
                })
            }
          >
            <Ionicons
              name="leaf-outline"
              size={28}
              color={getHealthColor(item.health)}
            />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.healthBarContainer}>
              <View
                style={[
                  styles.healthBarFill,
                  {
                    backgroundColor: getHealthColor(item.health),
                    width: `${item.fill * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.plantCount}>{item.plants.length} plants</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Modal for environment name input */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>New Environment</Text>
            <TextInput
              placeholder="Enter name..."
              style={styles.input}
              value={newEnvName}
              onChangeText={setNewEnvName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: "#fff" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonAdd}
                onPress={handleAddEnvironment}
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

/** STYLES **/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4EF",
    padding: 20,
  },
  welcome: {
    fontSize: 32,
    alignSelf: "center",
    fontWeight: "600",
    marginBottom: "5%",
    marginTop: "3%",
    color: "#1A5D3B",
  },
  subtitle: {
    fontSize: 26,
    alignSelf: "center",
    color: "#4F6F52",
    marginVertical: 10,
  },
  sensorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sensorBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 14,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sensorLabel: { fontSize: 14, color: "#4F6F52", marginTop: 4 },
  sensorValue: { fontSize: 16, fontWeight: "600", color: "#1A5D3B" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "500", color: "#1A5D3B", marginTop: 8 },
  healthBarContainer: {
    height: 6,
    backgroundColor: "#D9E2DA",
    borderRadius: 3,
    marginTop: 8,
  },
  healthBarFill: { height: 6, borderRadius: 3 },
  plantCount: { fontSize: 13, color: "#4F6F52", marginTop: 6 },
  fab: {
    position: "absolute",
    bottom: 70,
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
  modalButtonCancel: {
    backgroundColor: "#999",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  modalButtonAdd: {
    backgroundColor: "#1A5D3B",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
});
