import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function PlantScreen() {
  const { id, name, lastWatered, moisture, light } = useLocalSearchParams<{
    id?: string;
    name?: string;
    lastWatered?: string;
    moisture?: string;
    light?: string;
  }>();

  if (!id) return <Text>Plant not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.label}>Last Watered: {lastWatered ? new Date(lastWatered).toLocaleString() : "Never"}</Text>
      <Text style={styles.label}>Moisture: {moisture ?? "Unknown"}</Text>
      <Text style={styles.label}>Light Level: {light ?? "Unknown"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F0F4EF" },
  title: { fontSize: 28, fontWeight: "700", color: "#1A5D3B", marginBottom: 16 },
  label: { fontSize: 18, color: "#4F6F52", marginBottom: 6 },
});
