import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import colors from "../Themes/colors"; // import colors.js

const LogoutScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remove the saved userId
      await AsyncStorage.removeItem("userId");

      // Reset the navigation stack so user cannot go back
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bodybackground }]}>
      <Text style={[styles.title, { color: colors.text }]}>Logout</Text>
      <Text style={[styles.text, { color: colors.mutedText }]}>
        Are you sure you want to logout?
      </Text>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { color: colors.cardsbackground }]}>
          Confirm Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  logoutButton: {
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 5,
  },
  logoutText: { fontSize: 18, fontWeight: "bold" },
});

export default LogoutScreen;
