// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Location from 'expo-location';
// import * as ImagePicker from 'expo-image-picker';
// import { storage } from '../firebase';
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import Constants from 'expo-constants';
// const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// const AddTechnicianScreen = () => {
//     const [form, setForm] = useState({
//         user_id: '',
//         name: '',
//         phone: '',
//         email: '',
//         image_url: '',
//         address: '',
//         shop_address: '',
//         latitude: '',
//         longitude: '',
//     });

//     const [image, setImage] = useState(null);
//     const [uploading, setUploading] = useState(false);

//     useEffect(() => {
//         const getUserID = async () => {
//             try {
//                 const userId = await AsyncStorage.getItem('userId');
//                 if (userId) {
//                     setForm(prevState => ({ ...prevState, user_id: userId }));
//                 }
//             } catch (error) {
//                 console.error("Error fetching user_id:", error);
//             }
//         };
//         getUserID();
//     }, []);

//     const handleChange = (key, value) => {
//         setForm(prevState => ({ ...prevState, [key]: value }));
//     };

//     const getCurrentLocation = async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert("Permission Denied", "Allow location access to use this feature.");
//             return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         setForm(prevState => ({
//             ...prevState,
//             latitude: location.coords.latitude.toString(),
//             longitude: location.coords.longitude.toString()
//         }));
//     };

//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             setImage(result.assets[0].uri);
//             uploadImage(result.assets[0].uri);
//         }
//     };

//     const uploadImage = async (uri) => {
//         setUploading(true);
//         try {
//             const response = await fetch(uri);
//             const blob = await response.blob();
//             const filename = `technicians/${Date.now()}.jpg`;
//             const storageRef = ref(storage, filename);

//             await uploadBytes(storageRef, blob);
//             const downloadURL = await getDownloadURL(storageRef);

//             setImage(downloadURL);
//             handleChange('image_url', downloadURL);
//             Alert.alert("Success", "Image uploaded successfully!");
//         } catch (error) {
//             console.error("Error uploading image:", error);
//             Alert.alert("Error", "Image upload failed!");
//         } finally {
//             setUploading(false);
//         }
//     };

//     const handleSubmit = async () => {
//         if (!form.user_id || !form.name || !form.phone || !form.email || !form.address || !form.shop_address) {
//             Alert.alert("Error", "Please fill all required fields.");
//             return;
//         }
//         try {
//             const response = await fetch(`${API_BASE_URL}/add-technician`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(form),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 Alert.alert("Success", "Your profile data is being tested for verification.");
//                 setForm({ user_id: form.user_id, name: '', phone: '', email: '', image_url: '', address: '', shop_address: '', latitude: '', longitude: '' });
//                 setImage(null);
//             } else {
//                 Alert.alert("Error", data.message || "Failed to add technician.");
//             }
//         } catch (error) {
//             console.error("Error submitting data:", error);
//             Alert.alert("Error", "Something went wrong!");
//         }
//     };

//     return (
//         <View style={styles.maincontainer}>
//         <Text style={styles.heading}>Add Profile Details</Text>
//         <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
//             {['name', 'phone', 'email', 'address', 'shop_address', 'latitude', 'longitude'].map((field, index) => (
//                 <TextInput
//                     key={index}
//                     style={styles.input}
//                     placeholder={`Enter ${field.replace('_', ' ')}`}
//                     placeholderTextColor="#bbb"
//                     keyboardType={field.includes('phone') || field.includes('latitude') || field.includes('longitude') ? 'numeric' : 'default'}
//                     value={form[field]}
//                     onChangeText={(text) => handleChange(field, text)}
//                 />
//             ))}
    
//             <TouchableOpacity style={styles.button} onPress={pickImage}>
//                 <Text style={styles.buttonText}>{image ? "Change Image" : "Pick an Image"}</Text>
//             </TouchableOpacity>
//             {image && <Image source={{ uri: image }} style={styles.image} />}
    
//             <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
//                 <Text style={styles.buttonText}>Get Current Location</Text>
//             </TouchableOpacity>
    
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={uploading}>
//                 <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     </View>

//     );
// };

// const styles = StyleSheet.create({
//     maincontainer: {
//         flex: 1,
//         backgroundColor: '#121212',
//         paddingHorizontal: 20,
//     },
//     heading: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginVertical: 10,
//     },
//     container: {
//         paddingTop: 20,
//         paddingBottom: 100, // Ensures last button is fully visible
//         paddingHorizontal: 15,
//     },
//     input: {
//         backgroundColor: '#1e1e1e',
//         color: '#fff',
//         padding: 15,
//         borderRadius: 10,
//         marginBottom: 10,
//         borderWidth: 1,
//         borderColor: '#ffd700',
//         textAlign: 'left',
//     },
//     button: {
//         backgroundColor: '#ffd700',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginBottom: 10,
//         shadowColor: '#ffd700',
//         shadowOffset: { width: 0, height: 5 },
//         shadowOpacity: 0.8,
//         shadowRadius: 10,
//     },
//     submitButton: {
//         backgroundColor: '#ff8c00',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//         marginTop: 10,
//         marginBottom: 30, // Extra bottom margin
//         shadowColor: '#ff8c00',
//         shadowOffset: { width: 0, height: 5 },
//         shadowOpacity: 0.8,
//         shadowRadius: 10,
//     },
//     buttonText: {
//         color: '#121212',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     image: {
//         width: 100,
//         height: 100,
//         alignSelf: 'center',
//         borderRadius: 10,
//         marginTop: 10,
//     },
// });

// export default AddTechnicianScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Constants from 'expo-constants';
import colors from '../Themes/colors'; // import theme colors

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;

const AddTechnicianScreen = () => {
    const [form, setForm] = useState({
        user_id: '',
        name: '',
        phone: '',
        email: '',
        image_url: '',
        address: '',
        shop_address: '',
        latitude: '',
        longitude: '',
    });

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const getUserID = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId) {
                    setForm(prev => ({ ...prev, user_id: userId }));
                }
            } catch (error) {
                console.error("Error fetching user_id:", error);
            }
        };
        getUserID();
    }, []);

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Allow location access to use this feature.");
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setForm(prev => ({
            ...prev,
            latitude: location.coords.latitude.toString(),
            longitude: location.coords.longitude.toString()
        }));
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        setUploading(true);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = `technicians/${Date.now()}.jpg`;
            const storageRef = ref(storage, filename);

            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);

            setImage(downloadURL);
            handleChange('image_url', downloadURL);
            Alert.alert("Success", "Image uploaded successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            Alert.alert("Error", "Image upload failed!");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!form.user_id || !form.name || !form.phone || !form.email || !form.address || !form.shop_address) {
            Alert.alert("Error", "Please fill all required fields.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/add-technician`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Your profile data is being tested for verification.");
                setForm({ user_id: form.user_id, name: '', phone: '', email: '', image_url: '', address: '', shop_address: '', latitude: '', longitude: '' });
                setImage(null);
            } else {
                Alert.alert("Error", data.message || "Failed to add technician.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            Alert.alert("Error", "Something went wrong!");
        }
    };

    return (
        <View style={[styles.maincontainer, { backgroundColor: colors.bodybackground }]}>
            <Text style={[styles.heading, { color: colors.primary }]}>Add Technician Profile</Text>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={[styles.card, { backgroundColor: colors.cardsbackground }]}>
                    {['name', 'phone', 'email', 'address', 'shop_address', 'latitude', 'longitude'].map((field, index) => (
                        <TextInput
                            key={index}
                            style={[styles.input, { borderColor: colors.primary, color: colors.text, backgroundColor: colors.secondary }]}
                            placeholder={`Enter ${field.replace('_', ' ')}`}
                            placeholderTextColor={colors.mutedText}
                            keyboardType={field.includes('phone') || field.includes('latitude') || field.includes('longitude') ? 'numeric' : 'default'}
                            value={form[field]}
                            onChangeText={(text) => handleChange(field, text)}
                        />
                    ))}

                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={pickImage}>
                        <Text style={styles.buttonText}>{image ? "Change Image" : "Pick an Image"}</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.image} />}

                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={getCurrentLocation}>
                        <Text style={styles.buttonText}>Get Current Location</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.primary }]} onPress={handleSubmit} disabled={uploading}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    container: {
        paddingTop: 20,
        paddingBottom: 100,
        paddingHorizontal: 5,
    },
    card: {
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    submitButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 15,
    },
});

export default AddTechnicianScreen;
