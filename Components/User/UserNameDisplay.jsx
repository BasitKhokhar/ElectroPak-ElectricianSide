import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
import colors from '../Themes/colors'; // import colors.js

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const UserNameDisplay = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        try {
          const response = await fetch(`${API_BASE_URL}/users/${storedUserId}`);
          if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
    };
    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.primary }]}>
        {userName ? `Welcome, ${userName}!` : "Loading..."}
      </Text>
      <Text style={[styles.text1, { color: colors.text }]}>
        View, accept, and complete user requests in real time. Stay organized and never miss a job
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: "flex-start" },
  text: { fontSize: 24, fontWeight: "bold" },
  text1: { fontSize: 16, marginVertical: 10 },
});

export default UserNameDisplay;
