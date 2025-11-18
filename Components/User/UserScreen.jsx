// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// const UserScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [userImage, setUserImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       console.log("User ID in UserScreen is:", storedUserId);
      
//       if (storedUserId) {
//         try {
//           const response = await fetch(`${API_BASE_URL}/users/${storedUserId}`);
//           if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
          
//           const data = await response.json();
//           setUserData(data);

//           // Fetch user image separately
//           const imageResponse = await fetch(`${API_BASE_URL}/user_images/${storedUserId}`);
//           if (imageResponse.ok) {
//             const imageData = await imageResponse.json();
//             setUserImage(imageData.image_url);
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//       setLoading(false);
//     };
//     fetchUserData();
//   }, []);
//  console.log("userimage in userscreen",userImage)
//   return (
//     <View style={styles.container}>
//     {loading ? (
//       <ActivityIndicator size="large" color="#0000ff" />
//     ) : userData ? (
//       <View style={styles.profileContainer}>
//         {/* Profile Header */}
//         <View style={styles.header}>
//         <Text style={styles.title}>{userData.name}</Text>
//           <View style={styles.imageContainer}>
//             {userImage ? (
//               <Image source={{ uri: userImage }} style={styles.profileImage} />
//             ) : (
//               <View style={styles.defaultProfileCircle} />
//             )}
//           </View>
          
//         </View>

//         {/* Sections */}
//         <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("AccountDetail", { userData })}>
//           <Text style={styles.sectionText}>Account Detail</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("updateProfile") }>
//           <Text style={styles.sectionText}>Update Profile</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("CustomerSupport") }>
//           <Text style={styles.sectionText}>Customer Support</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("Faq") }>
//           <Text style={styles.sectionText}>FAQs</Text>
//         </TouchableOpacity>
//         {/* <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("CustomerSupport") }>
//           <Text style={styles.sectionText}>About Owners</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity style={[styles.section, styles.logout]} onPress={() => navigation.navigate("Logout") }>
//           <Text style={styles.sectionText}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     ) : (
//       <Text style={styles.text}>No user data found.</Text>
//     )}
//   </View>
// );
// };

// const styles = StyleSheet.create({
// container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2C2C2C", },
// profileContainer: { width: "100%",height:"100%", padding: 20, backgroundColor: "#2C2C2C", borderRadius: 10, elevation: 5,  },
// header: { flexDirection: "row", alignItems: "center",marginBottom:50, justifyContent: "space-between", width: "100%" },
// title: { fontSize: 26, fontWeight: "bold", color: "#FFD700" },
// section: { width: "100%", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "white", alignItems: "flex-start" },
// sectionText: { fontSize: 18, color: "white" },
// logout: { borderBottomWidth: 0 },
// text: { fontSize: 18, marginVertical: 5, color: "#555" },

// // Profile Image Styles
// imageContainer: { width: 50, height: 50, borderRadius: 50, overflow: "hidden" },
// profileImage: { width: "100%", height: "100%", borderRadius: 50,borderWidth:2,borderColor:'white' },
// defaultProfileCircle: { width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: "#000", backgroundColor: "#fff" },
// });



// export default UserScreen;
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import { colors } from "../Themes/colors"; // Make sure the path is correct

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const UserScreen = () => {
  const [userData, setUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      console.log("User ID in UserScreen is:", storedUserId);
      
      if (storedUserId) {
        try {
          const response = await fetch(`${API_BASE_URL}/users/${storedUserId}`);
          if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
          const data = await response.json();
          setUserData(data);

          // Fetch user image separately
          const imageResponse = await fetch(`${API_BASE_URL}/user_images/${storedUserId}`);
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            setUserImage(imageData.image_url);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  console.log("userimage in userscreen", userImage);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : userData ? (
        <View style={styles.profileContainer}>
          {/* Profile Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{userData.name}</Text>
            <View style={styles.imageContainer}>
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.profileImage} />
              ) : (
                <View style={styles.defaultProfileCircle} />
              )}
            </View>
          </View>

          {/* Sections */}
          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate("AccountDetail", { userData })}
          >
            <Text style={styles.sectionText}>Account Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.section}
            onPress={() => navigation.navigate("updateProfile")}
          >
            <Text style={styles.sectionText}>Update Profile</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={[styles.section, styles.logout]}
            onPress={() => navigation.navigate("Logout")}
          >
            <Text style={styles.sectionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>No user data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bodybackground,
  },
  profileContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: colors.cardsbackground,
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
  },
  section: {
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "flex-start",
  },
  sectionText: {
    fontSize: 18,
    color: colors.text,
  },
  logout: {
    borderBottomWidth: 0,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: colors.mutedText,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  defaultProfileCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.cardsbackground,
  },
});

export default UserScreen;
