import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  { id: 'Promotion', title: 'Promotion', image: require('../assets/promo.png') },
  { id: 'Burger',    title: 'Burger',    image: require('../assets/burger.png') },
  { id: 'Noodle',    title: 'Noodle',    image: require('../assets/noodle.png') },
  { id: 'Pizza',     title: 'Pizza',     image: require('../assets/Pizza.png') },
  { id: 'Dessert',   title: 'Dessert',   image: require('../assets/Dessert.png') },
  { id: 'Beverage',  title: 'Beverage',  image: require('../assets/Beverage.png') },
];

export default function OrderScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            onPress={() => navigation.navigate(cat.id)}
          >
            <Image source={cat.image} style={styles.icon} />
            <Text style={styles.label}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Add-to-Cart button */}
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
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  card: {
    width: 300,
    height: 140,
    margin: 8,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 150,
    height: 100,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD700',    // or your theme color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,                // Android shadow
    shadowColor: '#000',         // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
