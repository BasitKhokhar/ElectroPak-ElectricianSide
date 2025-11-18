// import React, { useState, useEffect } from "react";
// import { View,Image, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import SignupScreen from "./Components/Authentication/Signup";
// import LoginScreen from "./Components/Authentication/Login";
// import HomeScreen from "./Components/Home";
// import ProductsScreen from "./Components/Products/ProductsScreen";
// import CartScreen from "./Components/Cart/CartScreen";
// import CheckoutScreen from "./Components/Cart/CheckoutScreen";
// import PaymentScreen from "./Components/Cart/PaymentScreen";
// import Categories from "./Components/Categories/BookingsScreen";
// import Subcategories from "./Components/Categories/Subcategories";
// import Products from "./Components/Categories/Products";
// import SearchScreen from "./Components/Products/SearchScreen";  
// import SplashScreen from "./Components/SplashScreens/SplashScreen";
// import SplashScreen1 from "./Components/SplashScreens/SplashScreen1";
// import SplashScreen2 from "./Components/SplashScreens/SplashScreen2";
// import UserDetailsScreen from "./Components/Cart/UserDetailsScreen";
// import UserScreen from "./Components/User/UserScreen";
// import AccountDetailScreen from "./Components/User/AccountDetailScreen";
// import CustomerSupportScreen from "./Components/User/CustomerSupportScreen";
// import Services from "./Components/Services/Services";
// import LogoutScreen from "./Components/User/LogoutScreen";
// import AddTechnicianScreen from "./Components/Services/AddTechnicianScreen";
// import FAQ from "./Components/User/FAQ";
// import updatedProfile from "./Components/User/updateProfile";
// import 'react-native-gesture-handler';
// import logoImage from "./assets/logo2.png";
// import colors from "./Components/Themes/colors";
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const MainLayout = ({ navigation, children, cartCount, currentScreen }) => {

//   return (
//     <View style={styles.container}>
//       {/* Header with Search Bar */}
//       <View style={styles.header}>
//         <Image source={logoImage} style={styles.logo} />
//         <TouchableOpacity
//           style={styles.searchBar}
       
//         >
//           {/* <Text style={styles.searchText}>Search...</Text> */}
//           <Icon name="search" size={20} color="#555" style={styles.searchIcon} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.body}>{children}</View>

//       {/* Footer Navigation */}
//       <View style={styles.footer}>
//         {[
//           { name: "Home", icon: "home" },
//           { name: "Add Profile", icon: "add" },
//           { name: "Profile", icon: "person" },
//         ].map(({ name, icon }) => (
//           <TouchableOpacity
//             key={name}
//             style={styles.footerButton}
//             onPress={() => navigation.navigate(name)}
//           >
//             <Icon
//               name={icon}
//               size={24}
//               color={currentScreen === name ? "#ffd700" : "gray"}
//             />
//             {name === "Cart" && cartCount > 0 && (
//               <View style={styles.cartBadge}>
//                 <Text style={styles.cartCount}>{cartCount}</Text>
//               </View>
//             )}
//             <Text
//               style={[
//                 styles.footerText,
//                 { color: currentScreen === name ? "#ffd700" : "gray" },
//               ]}
//             >
//               {name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const BottomTabs = ({ cartCount }) => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { display: "none" },
//       }}
//     >
//       <Tab.Screen name="Home">
//         {({ navigation }) => (
//           <MainLayout navigation={navigation} cartCount={cartCount} currentScreen="Home">
//             <HomeScreen />
//           </MainLayout>
//         )}
//       </Tab.Screen>
//       <Tab.Screen name="Add Profile">
//         {({ navigation }) => (
//           <MainLayout navigation={navigation} cartCount={cartCount} currentScreen="Add Profile">
//             <AddTechnicianScreen />
//           </MainLayout>
//         )}
//       </Tab.Screen>
//       <Tab.Screen name="Profile">
//         {({ navigation }) => (
//           <MainLayout navigation={navigation} cartCount={cartCount} currentScreen="Profile">
//             <UserScreen />
//           </MainLayout>
//         )}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// };

// const App = () => {


//   const [userId, setUserId] = useState(null);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     if (userId) {
//       const interval = setInterval(() => fetchCartCount(userId), 5000);
//       return () => clearInterval(interval);
//     }
//   }, [userId]);

//   const fetchCartCount = async (id) => {
//     try {
//       const response = await fetch(`http://192.168.100.5:5004/cart/${id}`);
//       const data = await response.json();
//       setCartCount(data.length);
//     } catch (error) {
//       console.error("Error fetching cart count:", error);
//     }
//   };

//   const [isSplash1Visible, setIsSplash1Visible] = useState(true);
//   const [isSplash2Visible, setIsSplash2Visible] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsSplash1Visible(false);
//       setIsSplash2Visible(true);
//     }, 5000);
//   }, []);

//   if (isSplash1Visible) {
//     return <SplashScreen1 />;
//   }

//   if (isSplash2Visible) {
//     return <SplashScreen2 onNext={() => setIsSplash2Visible(false)} />;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName={userId ? "Main" : "Login"}>
//         <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" options={{ headerShown: false }}>
//           {(props) => <LoginScreen {...props} setUserId={setUserId} />}
//         </Stack.Screen>
//         <Stack.Screen name="Main" options={{ headerShown: false }}>
//           {(props) => <BottomTabs {...props} cartCount={cartCount} />}
//         </Stack.Screen>
//         <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
//         {/* <Stack.Screen name="AddressScreen" component={AddressScreen} /> */}
//         <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
//         <Stack.Screen name="Profile" component={UserScreen} options={{ title: "Profile" }} />
//         <Stack.Screen name="Categories" component={Categories} />
//         <Stack.Screen name="Subcategories" component={Subcategories} />
//         <Stack.Screen name="Products" component={Products} />
//         <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: "Search Products" }} />
//         <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
//         <Stack.Screen name="User" component={UserScreen} />
//         <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
//         <Stack.Screen name="updateProfile" component={updatedProfile} />
//         <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
//         <Stack.Screen name="Faq" component={FAQ} />
//         <Stack.Screen name="AddTechnicianScreen" component={AddTechnicianScreen} />
//         <Stack.Screen name="Logout" component={LogoutScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
// const styles = StyleSheet.create({
//   container: { flex: 1, },
//   header: {
//     backgroundColor: "black",
//     padding: 20,
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   logo: { width: 130, height: 50, resizeMode: "contain" },
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     height: 40,
//     borderRadius:50
//     // width: "10%",
//   },
//   searchText: { flex: 1, color: "#555" },
//   searchIcon: {  },
//   body: { flex: 1, padding: 0 ,backgroundColor:'#2C2C2C'},
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "black",
//     paddingVertical: 15,
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   footerButton: { alignItems: "center" },
//   footerText: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
//   cartBadge: {
//     position: "absolute",
//     top: -5,
//     right: -10,
//     backgroundColor: "red",
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//   },
//   cartCount: { color: "white", fontWeight: "bold" },
// });
import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

import SignupScreen from "./Components/Authentication/Signup";
import LoginScreen from "./Components/Authentication/Login";
import HomeScreen from "./Components/Home";
import AddTechnicianScreen from "./Components/Services/AddTechnicianScreen";
import UserScreen from "./Components/User/UserScreen";
import CheckoutScreen from "./Components/Cart/CheckoutScreen";
import PaymentScreen from "./Components/Cart/PaymentScreen";
import Subcategories from "./Components/Categories/Subcategories";
import Products from "./Components/Categories/Products";
import SearchScreen from "./Components/Products/SearchScreen";
import SplashScreen1 from "./Components/SplashScreens/SplashScreen1";
import UserDetailsScreen from "./Components/Cart/UserDetailsScreen";
import AccountDetailScreen from "./Components/User/AccountDetailScreen";
import CustomerSupportScreen from "./Components/User/CustomerSupportScreen";
import updatedProfile from "./Components/User/updateProfile";
import FAQ from "./Components/User/FAQ";
import LogoutScreen from "./Components/User/LogoutScreen";

import 'react-native-gesture-handler';
import logoImage from "./assets/logo2.png";
import colors from "./Components/Themes/colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Main Layout without cart
const MainLayout = ({ navigation, children, currentScreen }) => {
  return (
    <View style={[styles.container, { backgroundColor: colors.bodybackground }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Image source={logoImage} style={styles.logo} />
        {/* <TouchableOpacity style={[styles.searchBar, { backgroundColor: colors.cardsbackground }]}>
          <Icon name="search" size={20} color={colors.mutedText} />
        </TouchableOpacity> */}
      </View>

      <View style={styles.body}>{children}</View>

      <View style={[styles.footer, { backgroundColor: colors.primary }]}>
        {[
          { name: "Home", icon: "home" },
          { name: "Add Profile", icon: "add" },
          { name: "Profile", icon: "person" },
        ].map(({ name, icon }) => (
          <TouchableOpacity
            key={name}
            style={styles.footerButton}
            onPress={() => navigation.navigate(name)}
          >
            <Icon
              name={icon}
              size={24}
              color={currentScreen === name ? colors.cardsbackground : colors.border}
            />
            <Text
              style={[
                styles.footerText,
                { color: currentScreen === name ? colors.cardsbackground : colors.border },
              ]}
            >
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Home">
            <HomeScreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Add Profile">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Add Profile">
            <AddTechnicianScreen />
          </MainLayout>
        )}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {({ navigation }) => (
          <MainLayout navigation={navigation} currentScreen="Profile">
            <UserScreen />
          </MainLayout>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: colors.cardsbackground, borderBottomWidth: 1, borderColor: colors.border
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Show splash screen for 2-3 seconds
  useEffect(() => {
    const checkLogin = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };
    checkLogin();

    const timer = setTimeout(() => setIsSplashVisible(false), 2000); // splash duration
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) return <SplashScreen1 />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userId ? "Main" : "Login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setUserId={setUserId} />}
        </Stack.Screen>
        <Stack.Screen name="Main" component={BottomTabs} />
        {/* <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} /> */}
        <Stack.Screen name="Profile" component={UserScreen} />
        {/* <Stack.Screen name="Subcategories" component={Subcategories} /> */}
        {/* <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} /> */}
        <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
        <Stack.Screen name="AccountDetail" component={AccountDetailScreen} options={{ title: "Update Account Details", ...commonHeaderOptions, }} />
        <Stack.Screen name="updateProfile" component={updatedProfile} options={{ title: "Update Profile", ...commonHeaderOptions, }}/>
        {/* <Stack.Screen name="CustomerSupport" component={CustomerSupportScreen} />
        <Stack.Screen name="Faq" component={FAQ} /> */}
        <Stack.Screen name="AddTechnicianScreen" component={AddTechnicianScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: { width: 130, height: 50, resizeMode: "contain" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 50,
    height: 40,
  },
  body: { flex: 1, padding: 0 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerButton: { alignItems: "center" },
  footerText: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
});

