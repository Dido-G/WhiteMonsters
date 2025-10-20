import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";


export default function PlantScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const [plant, setPlant] = useState<any>(null);
    useEffect(() => {
    if (id) {
        const plantId = Number(plant.id);
    }
    }, [id]);

    if (!plant) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{plant.name}</Text>
            <Text>Last Watered: {plant.lastWatered}</Text>
            <Text>Soil Humidity: {plant.soilHumidity}%</Text>
            <Text>Light Level: {plant.lightLevel}</Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#F0F4EF" },
    title: { fontSize: 26, fontWeight: "600", marginBottom: 20, color: "#1A5D3B" },
});
