import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function NoodleScreen() {
    const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text>- reward</Text>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddToCart')}>
        <MaterialCommunityIcons name="cart" size={28} color="#fff" />
      </TouchableOpacity>
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
