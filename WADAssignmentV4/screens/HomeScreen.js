import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const items = [
  {
    id: 'Promotion',
    label: 'Promotion',
    image: require('../assets/promo.png'),
  },
  {
    id: 'OrderScreen',
    label: 'Tap to Order',
    image: require('../assets/burger.png'),
  },
  {
    id: 'AboutUsScreen',
    label: 'About us',
    image: require('../assets/noodle.png'),
  },
  {
    id: 'FeedbackScreen',
    label: 'Tell us something',
    image: require('../assets/Pizza.png'),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => handlePress(item.id)}
        >
          <Image
            source={item.image}
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  card: {
    width: '90%',          // almost full width
    height: 150,           // fixed height
    marginVertical: 10,    // space between cards
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});