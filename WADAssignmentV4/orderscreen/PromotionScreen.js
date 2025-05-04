import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Map item names to local images
const IMAGES = {
  'Chicken Rice': require('../assets/burger.png'),
  'Fish and Chips': require('../assets/pasta.png'),
  // add more mappings as needed
};

export default function OrderScreen() {
  const [mains, setMains] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://10.0.2.2:5000/api/menu')       // Android emulator host
      .then(r => r.json())
      .then(data => setMains(data.filter(i => i.category === 'Main')))
      .catch(() => setMains([]));
  }, []);

  if (mains === null) return <ActivityIndicator style={styles.loader} />;

  return (
    <View style={{ flex: 1 }}> 
      <ScrollView contentContainerStyle={styles.container}>
        {mains.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('PromotionFoodDetail', { item })}
          >
            <Image
              source={IMAGES[item.name] || require('../assets/pasta.png')}  // fallback image
              style={styles.icon}
            />
            <View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{`$${item.price.toFixed(2)}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddToCart')}>
        <MaterialCommunityIcons name="cart" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  container: { padding: 16, alignItems: 'center' },
  card: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  icon: { width: 80, height: 80, marginRight: 12 },
  title: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 16, color: '#555' },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e91e63',    // or your theme color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,                // Android shadow
    shadowColor: '#000',         // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});