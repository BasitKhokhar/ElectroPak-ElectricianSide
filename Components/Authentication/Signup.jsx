// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from "react-native";
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// const SignupScreen = ({ navigation }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [city, setCity] = useState("");
//   const [bgImage, setBgImage] = useState(null);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/loginbg`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.length > 0) {
//           setBgImage(data[0].image_url);
//         }
//       })
//       .catch((err) => console.error("Error fetching background image:", err));
//   }, []);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidPhone = (phone) => /^\d{11}$/.test(phone);

//   const validateInputs = () => {
//     if (!name || !email || !password || !phone || !city) {
//       Alert.alert("Error", "All fields are required!");
//       return false;
//     }
//     if (!isValidEmail(email)) {
//       Alert.alert("Error", "Invalid email format!");
//       return false;
//     }
//     if (!isValidPhone(phone)) {
//       Alert.alert("Error", "Phone number must be exactly 11 digits!");
//       return false;
//     }
//     if (password.length < 8) {
//       Alert.alert("Error", "Password must be at least 8 characters long!");
//       return false;
//     }
//     return true;
//   };

//   const handleSignup = () => {
//     if (!validateInputs()) return;
//     fetch(`${API_BASE_URL}/signup`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password, phone, city }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         Alert.alert("Success", "Signup successful! Please log in.");
//         navigation.navigate("Login");
//       })
//       .catch(() => Alert.alert("Error", "Signup failed"));
//   };

//   return (
//     <ImageBackground source={{ uri: bgImage }} style={styles.backgroundImage}>
//       <View style={styles.container}>
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Sign Up</Text>

//           <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#bbb" />
//           <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" placeholderTextColor="#bbb" />
//           <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry placeholderTextColor="#bbb" />
//           <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" placeholderTextColor="#bbb" />
//           <TextInput placeholder="City" value={city} onChangeText={setCity} style={styles.input} placeholderTextColor="#bbb" />

//           <TouchableOpacity style={styles.button} onPress={handleSignup}>
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//             <Text style={styles.link}>Already have an account? Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   backgroundImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   formContainer: {
//     backgroundColor: "#FFD700",
//     padding: 25,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     borderColor: "#444",
//     shadowColor: "#fff",
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 6,
//     width: "100%",
//     maxWidth: 400,
//   },
//   title: { fontSize: 26, fontWeight: "bold", color: "black", marginBottom: 20, textAlign: "center" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#555",
//     padding: 12,
//     marginVertical: 8,
//     borderRadius: 8,
//     backgroundColor: "#2E2E2E",
//     color: "#fff",
//   },
//   button: {
//     backgroundColor: "black",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
//   link: { color: "black", textAlign: "center", marginTop: 20, fontSize: 14 },
// });

// export default SignupScreen;
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from "react-native";
import Constants from 'expo-constants';
import colors from "../Themes/colors"; // import the colors.js

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/loginbg`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setBgImage(data[0].image_url);
        }
      })
      .catch((err) => console.error("Error fetching background image:", err));
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{11}$/.test(phone);

  const validateInputs = () => {
    if (!name || !email || !password || !phone || !city) {
      Alert.alert("Error", "All fields are required!");
      return false;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Invalid email format!");
      return false;
    }
    if (!isValidPhone(phone)) {
      Alert.alert("Error", "Phone number must be exactly 11 digits!");
      return false;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long!");
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (!validateInputs()) return;
    fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone, city }),
    })
      .then((res) => res.json())
      .then(() => {
        Alert.alert("Success", "Signup successful! Please log in.");
        navigation.navigate("Login");
      })
      .catch(() => Alert.alert("Error", "Signup failed"));
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={[styles.backgroundImage, { backgroundColor: colors.bodybackground }]}>
      <View style={styles.container}>
        <View style={[styles.formContainer, { backgroundColor: colors.cardsbackground, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Sign Up</Text>

          <TextInput
            placeholder="Name"
            placeholderTextColor={colors.mutedText}
            value={name}
            onChangeText={setName}
            style={[styles.input, { backgroundColor: colors.secondary, color: colors.text, borderColor: colors.border }]}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.mutedText}
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { backgroundColor: colors.secondary, color: colors.text, borderColor: colors.border }]}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.mutedText}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { backgroundColor: colors.secondary, color: colors.text, borderColor: colors.border }]}
            secureTextEntry
          />
          <TextInput
            placeholder="Phone"
            placeholderTextColor={colors.mutedText}
            value={phone}
            onChangeText={setPhone}
            style={[styles.input, { backgroundColor: colors.secondary, color: colors.text, borderColor: colors.border }]}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="City"
            placeholderTextColor={colors.mutedText}
            value={city}
            onChangeText={setCity}
            style={[styles.input, { backgroundColor: colors.secondary, color: colors.text, borderColor: colors.border }]}
          />

          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSignup}>
            <Text style={[styles.buttonText, { color: colors.cardsbackground }]}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.link, { color: colors.mutedText }]}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  formContainer: {
    padding: 25,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    width: "100%",
    maxWidth: 400,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  link: { textAlign: "center", marginTop: 20, fontSize: 14 },
});

export default SignupScreen;
