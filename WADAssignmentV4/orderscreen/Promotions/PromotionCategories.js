import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function PastaScreen() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <View style={styles.container}>
      {/* Top: Pasta image centered */}
      <Image
        source={require('../../assets/pasta.png')}
        style={styles.image}
      />

      {/* Name and Price */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Deluxe Pasta</Text>
        <Text style={styles.price}>$12.99</Text>
      </View>

      {/* Bottom controls */}
      <View style={styles.bottomContainer}>
        {/* Quantity selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrease} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>–</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={increase} style={styles.qtyButton}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart button */}
        <TouchableOpacity style={styles.addButton} onPress={() => {/* add-to-cart logic */}}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  image: {
    width: 400,
    height: 360,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 1,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#555',
  },
  bottomContainer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 24,
  },
  qtyText: {
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 16,
  },
  addButton: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#ff6347',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
