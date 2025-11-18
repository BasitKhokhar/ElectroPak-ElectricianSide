import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import 'react-native-get-random-values';
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
// Replace with your actual API key
const GOOGLE_MAPS_API_KEY = "AIzaSyCDcc6-Ahg-jMdAA8ziTpc7eXyUgn1vccw";

const Services = () => {
    const navigation = useNavigation();
    const [region, setRegion] = useState(null);
    
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestLocationPermission();
    }, []);

    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission Denied", "Location access is required.");
            return;
        }
        getUserLocation();
    };

    const getUserLocation = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { latitude, longitude } = location.coords;
            console.log("User's Location:", latitude, longitude);
            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });
        } catch (error) {
            console.error("Error getting location:", error);
            Alert.alert("Error", `Could not retrieve location. Reason: ${error.message}`);
        }
    };

    const findTechnicians = async () => {
        if (!region) {
            Alert.alert("Error", "User location not available. Try again.");
            return;
        }
        setLoading(true);
        console.log("📍 region data:", region);
        console.log("📍 Sending User Location to Backend:", region.latitude, region.longitude);

        try {
            const response = await fetch(`${API_BASE_URL}/get-nearest-technicians`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ latitude: region.latitude, longitude: region.longitude })
            });

            const data = await response.json();

            console.log("📡 Response from Backend:", data);

            if (data.technicians && data.technicians.length > 0) {
                setTechnicians(data.technicians);
            } else {
                Alert.alert("No technicians found nearby.");
                setTechnicians([]);
            }
        } catch (error) {
            console.error('❌ Error fetching technicians:', error);
            Alert.alert("Error", "Failed to fetch technicians.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* <GooglePlacesAutocomplete
                placeholder="Search a location..."
                fetchDetails={true}
                onPress={(data, details = null) => {
                    if (details) {
                        const { lat, lng } = details.geometry.location;
                        setRegion({
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        });
                        setSelectedLocation({ latitude: lat, longitude: lng, title: data.description });
                    }
                }}
                query={{ key: GOOGLE_MAPS_API_KEY, language: 'en' }}
                styles={{
                    container: styles.searchContainer,
                    textInput: styles.searchInput,
                    listView: { backgroundColor: '#fff' },
                }}
            /> */}

            {/* <Button title={loading ? "Finding Technicians..." : "Find Technicians"} onPress={findTechnicians} disabled={loading} /> */}
            <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={findTechnicians}
                disabled={loading}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Finding Technicians..." : "Find Technicians"}
                </Text>
            </TouchableOpacity>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={region}
                showsUserLocation={true}
                  followsUserLocation={true} 
            >
                {selectedLocation && (
                    <Marker
                        coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }}
                        title={selectedLocation.title}
                    />
                )}
                {technicians.map((tech) => (
                    <Marker
                        key={tech.id} // Use unique ID from API response
                        coordinate={{ latitude: tech.latitude, longitude: tech.longitude }}
                        title={tech.name}
                        description={tech.phone}

                    />
                ))}
            </MapView>
            <TouchableOpacity
                style={styles.applyButton}
                onPress={() => navigation.navigate('AddTechnicianScreen')} // Navigate to "Products" screen
            >
                <Text style={styles.viewAllText}>Apply for Technician</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { marginTop: 15, height: 500 },
    button:{
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop:15,
        width: "90%",
        alignSelf: 'center',
    },
    applyButton: {
        backgroundColor: "green",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop:10,
        width: "90%",
        alignSelf: 'center',
        // marginVertical: 20

    },
    searchContainer: { position: 'absolute', top: 50, left: 10, right: 10, zIndex: 1 },
    searchInput: { height: 50, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, fontSize: 16 },
});

export default Services;
