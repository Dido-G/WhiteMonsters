import React from "react";
import { Stack, Slot, usePathname, router } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";



export default function Layout() {
  const pathname = usePathname();

  const navigate = (path: string) => {
    router.push(path as any);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Page content */}
      <Slot />

      {/* Custom Bottom Navigation */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigate("/home")}>
          <Ionicons
            name="home"
            size={26}
            color={pathname === "/home" ? "#1A5D3B" : "#9E9E9E"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate("/news")}>
          <Ionicons
            name="newspaper-outline"
            size={26}
            color={pathname === "/news" ? "#1A5D3B" : "#9E9E9E"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate("/profile")}>
          <Ionicons
            name="person-outline"
            size={26}
            color={pathname === "/profile" ? "#1A5D3B" : "#9E9E9E"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
