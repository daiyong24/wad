import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation for navigation

export default function CardLoginScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [cvv, setCvv] = useState('');
  const navigation = useNavigation();  // Hook to access navigation

  // Function to handle login and navigate
  const handleLogin = () => {
    console.log('Card Number:', cardNumber);
    console.log('Cardholder Name:', cardholderName);
    console.log('CVV:', cvv);

    // Navigate to AmountSelectionScreen
    navigation.navigate('AmountSelectionScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Card Login</Text>

      {/* Card Number Input (16 digits) */}
      <TextInput
        style={styles.input}
        placeholder="Enter Card Number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text.slice(0, 16))} // Limit to 16 characters
        keyboardType="numeric"
        maxLength={16} // Limit to 16 characters
        placeholderTextColor="#888"
      />

      {/* Cardholder Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Cardholder Name"
        value={cardholderName}
        onChangeText={setCardholderName}
        maxLength={50} // Limit the length of the name
        placeholderTextColor="#888"
      />

      {/* CVV Input (3 digits) */}
      <TextInput
        style={styles.input}
        placeholder="Enter CVV"
        value={cvv}
        onChangeText={(text) => setCvv(text.slice(0, 3))} // Limit to 3 digits
        keyboardType="numeric"
        maxLength={3} // Limit to 3 characters
        secureTextEntry={true} // Hides CVV input for security
        placeholderTextColor="#888"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
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
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
