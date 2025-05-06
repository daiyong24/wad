import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

export default function BankLoginScreen() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();  // Initialize useNavigation hook

  const handleLogin = () => {
    // Handle the login functionality here (optional, depending on authentication)

    console.log('Account Number:', accountNumber);
    console.log('Password:', password);

    // Navigate to AmountSelectionScreen after successful login
    navigation.navigate('AmountSelectionScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bank Account Login</Text>

      {/* Account Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Account Number"
        value={accountNumber}
        onChangeText={(text) => setAccountNumber(text.slice(0, 30))} // Limit to 30 characters
        keyboardType="numeric"
        maxLength={30} // Limit input to 30 characters
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={(text) => setPassword(text.slice(0, 30))} // Limit to 30 characters
        secureTextEntry={true} // Keeps the password hidden
        maxLength={30} // Limit input to 30 characters
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
