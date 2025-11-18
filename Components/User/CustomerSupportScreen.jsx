import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomerSupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Support</Text>
      <Text style={styles.text}>For support, contact us at:</Text>
      <Text style={styles.email}>support@Machifyapp.com</Text>
      <Text style={styles.phone}>Phone: +92 3060760549</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2C2C2C", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "white",textAlign:'center' },
  text: { fontSize: 18, marginVertical: 5, color: "#888" },
  email: { fontSize: 18, fontWeight: "bold", color: "#007BFF" },
  phone: { fontSize: 18, fontWeight: "bold", color: "#007BFF" },
});

export default CustomerSupportScreen;
