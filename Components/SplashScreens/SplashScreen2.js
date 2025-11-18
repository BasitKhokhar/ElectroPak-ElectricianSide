import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const SplashScreen2 = ({ onNext }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/splash-image2`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setImageUrl(data[0].image_url);
        }
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>
     
      <Text style={styles.title}>Join Mechify & Grow Your Business!"</Text>
      <Text style={styles.description}>
      Connect with car owners, accept repair jobs, and boost your earnings – all from your phone!
      </Text>
      <TouchableOpacity style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Register Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: "black",
  },
  topcontainer:{
    width:"100%",
    height:"60%",
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 0,
    backgroundColor: "gray",
    borderBottomLeftRadius:100,
    borderBottomRightRadius:100
  },
  image: {
    width: "100%",
    height: "100%", // Takes half of the screen
    resizeMode: "cover",
    borderBottomLeftRadius:60,
    borderBottomRightRadius:60,
    // marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
    marginTop:25,
    textAlign: "center",
    paddingHorizontal:20
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginTop:20,
    paddingHorizontal:20
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    width:"85%"
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SplashScreen2;