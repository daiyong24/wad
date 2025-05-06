import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Map item names to local images
const IMAGES = {
  'Chocolate Brownie': require('../assets/ChocolateBrownie.png'),
  'Apple Pie': require('../assets/ApplePie.png'),
  'Ice Cream Sundae': require('../assets/IcecreamSundae.png'),
  // add more mappings as needed
};

export default function OrderScreen() {
  const [mains, setMains] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://10.0.2.2:5000/api/menu') // Android emulator host
      .then((r) => r.json())
      .then((data) => setMains(data.filter((i) => i.category === 'dessert')))
      .catch(() => setMains([]));
  }, []);

  if (mains === null) return <ActivityIndicator style={styles.loader} />;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {mains.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('PromotionFoodDetail', { item })}
          >
            <Image
              source={IMAGES[item.name] || require('../assets/pasta.png')} // fallback image
              style={styles.icon}
            />
            <View style={styles.cardDetails}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{`$${item.price.toFixed(2)}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddToCart')}
      >
        <MaterialCommunityIcons name="cart" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  container: { padding: 16, alignItems: 'center' },
  card: {
    flexDirection: 'row',
    marginBottom: 18,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
  icon: { width: 80, height: 80, borderRadius: 8, marginRight: 16 },
  cardDetails: { flex: 1 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e91e63', // or your theme color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
