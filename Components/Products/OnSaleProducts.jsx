import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductModal from "./ProductModal"; // Ensure this is correctly imported

const OnSaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from API
  useEffect(() => {
    fetch("http://192.168.100.4:5004/onsale_products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Retrieve userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
  }, []);

  // Handle "Shop Now" button press
  const openProductModal = (product) => {
    // Format the product before passing it to the modal
    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: product.New_price, // Use New_price as price
      image_url: product.image_url,
      stock: product.stock || "N/A", // Handle empty stock value
      subcategory_id: product.subcategory_id,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };

    setSelectedProduct(formattedProduct);
  };

  // Close the modal
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />;
  }

  return (
    <View style={styles.sliderBackground}>
      <Text style={styles.heading}>Onsale Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {products.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productStock}>Stock: {item.stock}</Text>
            <Text style={styles.productPrice}>Before: {item.price}</Text>
            <Text style={styles.newProductPrice}>Now: {item.New_price}</Text>
            <TouchableOpacity style={styles.shopNowButton} onPress={() => openProductModal(item)}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Product Modal */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeProductModal} userId={userId} />}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { marginTop: 50 },
  sliderBackground: {
    backgroundColor: "#1a1a1a",
    paddingVertical: 10,
  },
  scrollContainer: {
    padding: 10,
    flexDirection: "row",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
    color: "#FFD700",
  },
  productCard: {
    width: 150,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  productImage: { width: 100, height: 100, borderRadius: 5 },
  productName: { fontSize: 14, fontWeight: "bold", marginTop: 5, textAlign: "center", color: "#fff" },
  productStock: { fontSize: 12, color: "#ccc" },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "white", textDecorationLine: "line-through" },
  newProductPrice: { fontSize: 16, fontWeight: "bold", color: "#FFD700" },
  shopNowButton: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OnSaleProducts;
