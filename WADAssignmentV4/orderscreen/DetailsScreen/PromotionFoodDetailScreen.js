import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function PromotionFoodDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [qty, setQty] = useState(1);
  const userId = 1;

  // Dynamic image mapping, make sure to add images to this mapping
  const IMAGES = {
    'Margherita Pizza': require('../../assets/MargheritaPizza.png'),
    'Pepperoni Feast': require('../../assets/Pizza.png'),
    'Hawaiian Pizza': require('../../assets/HawaiiPizza.png'),
    //beverage
    'Iced Tea': require('../../assets/IceLemonTea.png'),
    'Fresh Orange Juice': require('../../assets/FreshOrangeJuice.png'),
    'Soda Can': require('../../assets/Soda.png'),
    //burgr
    'Classic Cheeseburger': require('../../assets/classicCheeseburger.png'),
    'Bacon BBQ Burger': require('../../assets/baconBBQBurger.png'),
    'Veggie Delight Burger': require('../../assets/VeggieDelightBurger.png'),
    //dessert
    'Chocolate Brownie': require('../../assets/ChocolateBrownie.png'),
    'Apple Pie': require('../../assets/ApplePie.png'),
    'Ice Cream Sundae': require('../../assets/IcecreamSundae.png'),
    //noodle
    'Meatball Pasta': require('../../assets/MeatballPasta.png'),
    'Seafood Agio Oglio': require('../../assets/SeafoodAgioOglio.png'),
    'Vegetable Lo Mein': require('../../assets/VeggieLoMein.png'),
    //pomotion
    'Weekend Special Combo': require('../../assets/weekendSpecialCombo.png'),
    'Student Meal Deal': require('../../assets/StudentMealDeal.png'),
    'Family Bundle': require('../../assets/familyBundle.png'),
  };

  const addToCart = () => {
    fetch('http://10.0.2.2:5000/orders/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, menu_id: item.id, quantity: qty }),
    }).then(() => navigation.navigate('AddToCart'));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Display Food Image */}
      <Image
        source={IMAGES[item.name] || require('../../assets/pasta.png')}  // Default image if no match
        style={styles.image}
      />

      {/* Display Food Name and Price */}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQty(q => Math.max(1, q - 1))}
        >
          <Text style={styles.quantityText}>－</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>{qty}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQty(q => q + 1)}
        >
          <Text style={styles.quantityText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light background for a clean look
  },
  image: {
    width: '100%',
    height: 300, // Adjust based on your image size
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    color: '#555',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 24,
    color: '#333',
  },
  quantity: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
