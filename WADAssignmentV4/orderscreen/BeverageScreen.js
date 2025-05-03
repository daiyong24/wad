import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BeverageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Promotions</Text>
      {/* Render your promos here */}
      <Text>- Beverage</Text>
      <Text>- 20% off all Noodles</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
