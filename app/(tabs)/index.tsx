import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const environments = [
    { id: "1", name: "Living Room", health: "good" },
    { id: "2", name: "Balcony", health: "medium" },
    { id: "3", name: "Bedroom", health: "low" },
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.welcome}>Good morning, Vanko 🌱</Text>
      <Text style={styles.subtitle}>Your plant environments</Text>

      {/* Environment cards */}
      <FlatList
        data={environments}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Ionicons name="leaf-outline" size={28} color={getHealthColor(item.health)} />
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View
              style={[styles.healthBar, { backgroundColor: getHealthColor(item.health) }]}
            />
          </View>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.navbar}>
        <Ionicons name="home" size={24} color="#1A5D3B" />
        <Ionicons name="people-outline" size={24} color="#9E9E9E" />
        <Ionicons name="newspaper-outline" size={24} color="#9E9E9E" />
        <Ionicons name="person-outline" size={24} color="#9E9E9E" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4EF",
    padding: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1A5D3B",
  },
  subtitle: {
    fontSize: 16,
    color: "#4F6F52",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A5D3B",
    marginTop: 8,
  },
  healthBar: {
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
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
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
});