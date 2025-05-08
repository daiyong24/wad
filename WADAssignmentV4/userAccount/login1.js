import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Login1() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        You have successfully logged out
      </Text>
      {/* TODO: put your actual login inputs/buttons here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',  // or your app’s bg color
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 24,
  },
});
