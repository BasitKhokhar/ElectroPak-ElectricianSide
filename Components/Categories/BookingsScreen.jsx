
import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Platform, ActionSheetIOS 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, PROVIDER_APPLE } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import colors from '../Themes/colors'; 

const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const statuses = ["Yet not Accepted", "Accepted", "Rejected"];

const BookingsScreen = () => {
  const [userId, setUserId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        fetchBookings(storedUserId);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user_id:', error);
      setLoading(false);
    }
  };

  const fetchBookings = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings?userId=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckLocation = (latitude, longitude) => {
    setSelectedLocation({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update-booking-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      fetchBookings(userId);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const showStatusPicker = (bookingId) => {
    setSelectedBookingId(bookingId);

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        { options: [...statuses, 'Cancel'], cancelButtonIndex: statuses.length },
        (buttonIndex) => {
          if (buttonIndex < statuses.length) {
            const newStatus = statuses[buttonIndex];
            setSelectedStatus(newStatus);
            updateStatus(bookingId, newStatus);
          }
        }
      );
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.bookingItem, { backgroundColor: colors.cardsbackground }]}>
      <Text style={[styles.name, { color: colors.primary }]}>Client Name: {item.name}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Email: {item.email}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Phone: {item.phone}</Text>
      <Text style={[styles.text, { color: colors.text }]}>City: {item.city}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Description: {item.description}</Text>
      <Text style={[styles.text, { color: colors.accent }]}>Status: {item.status}</Text>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.primary }]} 
        onPress={() => handleCheckLocation(item.latitude, item.longitude)}
      >
        <Text style={[styles.buttonText, { color: colors.cardsbackground }]}>Check Location</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.statusButton, { backgroundColor: colors.accent }]} 
        onPress={() => showStatusPicker(item.id)}
      >
        <Text style={[styles.statusButtonText, { color: colors.cardsbackground }]}>Update Status</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' && selectedBookingId === item.id && (
        <Picker
          selectedValue={selectedStatus}
          onValueChange={(value) => {
            setSelectedStatus(value);
            updateStatus(item.id, value);
          }}
          style={[styles.picker, { backgroundColor: colors.secondary, color: colors.text }]}
        >
          {statuses.map((status) => (
            <Picker.Item key={status} label={status} value={status} />
          ))}
        </Picker>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.bodybackground }]}>
      <MapView
        provider={PROVIDER_APPLE}
        style={styles.map}
        region={{
          latitude: selectedLocation ? selectedLocation.latitude : 37.78825,
          longitude: selectedLocation ? selectedLocation.longitude : -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} title="Booking Location" />}
      </MapView>

      <Text style={[styles.heading, { color: colors.text }]}>All Booking Requests</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : bookings.length === 0 ? (
        <Text style={[styles.noBookings, { color: colors.accent }]}>No bookings found</Text>
      ) : (
        <FlatList 
          data={bookings} 
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderItem} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  map: { height: 350, width: '100%', borderRadius: 10, overflow: 'hidden', marginBottom: 10 },
  heading: { fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginVertical: 10 },
  bookingItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  text: { fontSize: 14 },
  noBookings: { textAlign: 'center', fontSize: 16, marginTop: 20 },
  button: { padding: 10, borderRadius: 20, marginTop: 10, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
  statusButton: { padding: 10, borderRadius: 20, marginTop: 10, alignItems: 'center' },
  statusButtonText: { fontSize: 16, fontWeight: 'bold' },
  picker: { marginTop: 10, borderRadius: 8 },
});

export default BookingsScreen;
