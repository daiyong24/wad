import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function ReloadMethodScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Select a Reload Method</Text>

      {/* Bank Account Option */}
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => navigation.navigate('BankLoginScreen')}
      >
        <Text style={styles.methodButtonText}>Bank Account Method</Text>
      </TouchableOpacity>

      {/* Debit Card Option */}
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => navigation.navigate('CardLoginScreen')}
      >
        <Text style={styles.methodButtonText}>Debit Card Method</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  methodButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',  // Adjust the width as needed
    alignItems: 'center',
  },
  methodButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
