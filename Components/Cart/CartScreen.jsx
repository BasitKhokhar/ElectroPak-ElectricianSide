import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig.extra.API_BASE_URL;
const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('User not logged in');

      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart items');
      
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, [])
  );

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleRemoveFromCart = async (cartId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`${API_BASE_URL}/cart/${userId}/${cartId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove item');
      setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity, user_id: userId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update quantity');
      }
      
      setCartItems(prevCartItems =>
        prevCartItems.map(item =>
          item.cart_id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.cart_id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View style={styles.productDetails}>
                  <Image source={{ uri: item.image_url }} style={styles.image} />
                  <View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Price: {item.price} Rupees</Text>
                    <Text style={styles.itemTotal}>Total: {item.price * item.quantity} Rupees</Text>
                  </View>
                </View>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.cart_id, item.quantity - 1)} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.cart_id, item.quantity + 1)} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => handleRemoveFromCart(item.cart_id)} style={styles.removeButton}>
                  <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      <Text style={styles.totalAmount}>Total: {totalAmount} Rupees</Text>
      
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout', { cartItems, totalAmount })}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#2C2C2C',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color:'#FFD700'
  },
  listContainer: {
    flex: 1,
    maxHeight: 400, 
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#222222',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productDetails: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  itemName: {
    fontWeight: 'bold',
        color:'#E0E0E0'
  },
  itemPrice: {
    fontSize: 14,
    color:'#E0E0E0'
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color:"#E0E0E0"
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:15
  },
  button: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
    color:'#FFD700'
  },
  checkoutButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default CartScreen;
