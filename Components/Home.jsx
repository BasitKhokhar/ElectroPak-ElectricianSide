import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import OnSaleProducts from "./Products/OnSaleProducts";
import TrendingProducts from "./Products/TrendingProducts"
import BookingsScreen from "./Categories/BookingsScreen";
import ImageSlider from "./Sliders/Slider";
import UserNameDisplay from "./User/UserNameDisplay";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    if (navigation) {
      navigation.setOptions({ headerShown: false });
    }
  }, [navigation]);

  const sections = [
    { key: "UserName", component: (
      <View style={{ marginTop: 10, alignItems: "flex-start", paddingHorizontal: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          <UserNameDisplay />
        </Text>
      </View>
    ) },
    // { key: "Slider", component: (
    //   <View style={{ marginTop: 15 }}> 
    //     <ImageSlider />
    //   </View>
    // ) },
    { key: "bookings", component: <BookingsScreen /> },
    // { key: "onsale", component: <OnSaleProducts /> },
    // { key: "trending", component: (
    //   <View style={styles.trendingContainer}>
    //     <TrendingProducts />
    //   </View>
    // ) },
  ];

  return (
    <FlatList
      data={sections}
      renderItem={({ item }) => item.component}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.listContainer} // Ensures everything is spaced properly
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 120, // Adds extra space at the bottom to prevent overlap
  },
  trendingContainer: {
    marginBottom: 0, // Adjusts spacing to move it upwards
    padding: 10,
    backgroundColor: "#2C2C2C", // Optional: Light background to distinguish it
    borderRadius: 10, // Optional: Rounded corners for better UI
    elevation: 3, // Adds a shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default HomeScreen;
