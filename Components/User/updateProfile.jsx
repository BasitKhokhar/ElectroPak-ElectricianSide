// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from "@react-navigation/native";
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// const updatedProfile = () => {
//     const [userId, setUserId] = useState(null);
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [updating, setUpdating] = useState(false);
//     const navigation = useNavigation();
//     // Fetch userId from AsyncStorage
//     useEffect(() => {
//         const getUserId = async () => {
//             try {
//                 const storedUserId = await AsyncStorage.getItem('userId');
//                 if (storedUserId) {
//                     setUserId(storedUserId);
//                     fetchProfile(storedUserId);
//                 } else {
//                     setLoading(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching userId:', error);
//                 setLoading(false);
//             }
//         };

//         getUserId();
//     }, []);
//     console.log("userid in updatedprfile screen", userId)
//     // Fetch Profile
//     const fetchProfile = async (userId) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/technician-profile?userId=${userId}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch profile');
//             }
//             const data = await response.json();
//             setProfile(data);
//         } catch (error) {
//             console.error('Error fetching profile:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Update Profile
//     const updateProfile = async () => {
//         setUpdating(true);
//         try {
//             const response = await fetch(`${API_BASE_URL}/update-technician-profile`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ...profile, userId }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 alert('Profile updated successfully!');
//             } else {
//                 alert(data.error);
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             alert('Something went wrong.');
//         } finally {
//             setUpdating(false);
//         }
//     };

//     if (loading) {
//         return <ActivityIndicator size="large" color="#FFD700" />;
//     }

//     if (!profile) {
//         return <Text style={styles.errorText}>Profile not found</Text>;
//     }

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.heading}>Your Profile Detail</Text>

//             <TextInput style={styles.input} value={profile.name} onChangeText={(text) => setProfile({ ...profile, name: text })} placeholder="Name" />
//             <TextInput style={styles.input} value={profile.phone} onChangeText={(text) => setProfile({ ...profile, phone: text })} placeholder="Phone" />
//             <TextInput style={styles.input} value={profile.email} onChangeText={(text) => setProfile({ ...profile, email: text })} placeholder="Email" />
//             <TextInput style={styles.input} value={profile.address} onChangeText={(text) => setProfile({ ...profile, address: text })} placeholder="Address" />
//             <TextInput style={styles.input} value={profile.shop_address} onChangeText={(text) => setProfile({ ...profile, shop_address: text })} placeholder="Shop Address" />

//             {/* <Button title={updating ? 'Updating...' : 'Update Profile'} onPress={updateProfile} disabled={updating} /> */}
//             <TouchableOpacity
//                 style={[styles.button, updating && styles.buttonDisabled]}
//                 onPress={updateProfile}
//                 disabled={updating}
//             >
//                 <Text style={styles.buttonText}>
//                     {updating ? 'Updating...' : 'Update Profile'}
//                 </Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#121212',
//         flexGrow: 1,
//     },
//     heading: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#FFD700',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     input: {
//         backgroundColor: '#1E1E1E',
//         color: '#FFF',
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 5,
//     },
//     errorText: {
//         textAlign: 'center',
//         color: 'red',
//         marginTop: 20,
//     },
//     button: {
//         backgroundColor: '#FFD700',
//         paddingVertical: 12,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//       },
//       buttonDisabled: {
//         backgroundColor: '#BDBDBD', // Disabled button color
//       },
//       buttonText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#121212',
//       },
// });

// export default updatedProfile;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import { colors } from '../Themes/colors'; // THEME COLORS

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const UpdatedProfile = () => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigation = useNavigation();

  // Fetch userId from AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          fetchProfile(storedUserId);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching userId:', error);
        setLoading(false);
      }
    };
    getUserId();
  }, []);

  console.log("userid in updatedProfile screen", userId);

  // Fetch Profile
  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/technician-profile?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const updateProfile = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/update-technician-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, userId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Something went wrong.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: colors.bodybackground }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!profile) {
    return <Text style={[styles.errorText, { color: colors.error }]}>Profile not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.bodybackground }]}>
      <Text style={[styles.heading, { color: colors.primary }]}>Your Profile Details</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardsbackground, borderColor: colors.border, color: colors.text }]}
          placeholder="Name"
          placeholderTextColor={colors.mutedText}
          value={profile.name}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardsbackground, borderColor: colors.border, color: colors.text }]}
          placeholder="Phone"
          placeholderTextColor={colors.mutedText}
          value={profile.phone}
          onChangeText={(text) => setProfile({ ...profile, phone: text })}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardsbackground, borderColor: colors.border, color: colors.text }]}
          placeholder="Email"
          placeholderTextColor={colors.mutedText}
          value={profile.email}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardsbackground, borderColor: colors.border, color: colors.text }]}
          placeholder="Address"
          placeholderTextColor={colors.mutedText}
          value={profile.address}
          onChangeText={(text) => setProfile({ ...profile, address: text })}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.cardsbackground, borderColor: colors.border, color: colors.text }]}
          placeholder="Shop Address"
          placeholderTextColor={colors.mutedText}
          value={profile.shop_address}
          onChangeText={(text) => setProfile({ ...profile, shop_address: text })}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: updating ? colors.mutedText : colors.primary }]}
          onPress={updateProfile}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Update Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default UpdatedProfile;
