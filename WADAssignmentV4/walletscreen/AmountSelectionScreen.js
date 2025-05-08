import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AmountSelectionScreen() {
  const [selectedAmount, setSelectedAmount] = useState(null); // Stores selected or custom amount
  const [customAmount, setCustomAmount] = useState(''); // Stores custom amount input
  const [balance, setBalance] = useState(null); // Stores the user's current balance
  const [loading, setLoading] = useState(false); // Loading state while updating the balance
  const navigation = useNavigation();

  const userId = 1; // Assuming the user_id is 1, replace with actual user ID as needed

  // Function to handle quick select amounts
  const handleQuickSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(''); // Clear custom input when selecting a quick amount
  };

  // Function to handle custom amount input, ensuring only numeric values
  const handleCustomAmountChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setCustomAmount(numericText);
    setSelectedAmount(null); // Clear selected quick amount when entering custom value
  };

  // Fetch the user's current balance
  const fetchBalance = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/wallets/balance?user_id=${userId}`);
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  // Handle the reload action
  const handleReload = async () => {
    const reloadAmount = selectedAmount || parseFloat(customAmount);
    if (!reloadAmount || reloadAmount <= 0) return;

    try {
      setLoading(true);

      // Update the balance in the database
      const response = await fetch(`http://10.0.2.2:5000/wallets/reload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, amount: reloadAmount }),
      });

      const data = await response.json();
      if (data.success) {
        // Update the balance on the UI after successful reload
        setBalance((prevBalance) => prevBalance + reloadAmount);

        // Show a success message and navigate back to the Home screen
        Alert.alert(
          'Success',
          'Your balance has been reloaded successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'), // Navigate to Home Screen
            },
          ]
        );
      } else {
        console.error('Error reloading balance');
      }
    } catch (error) {
      console.error('Error reloading balance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance(); // Fetch balance when the screen loads
  }, []);

  if (balance === null) return <ActivityIndicator style={styles.loader} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Amount</Text>

      {/* Quick Selection Buttons */}
      <View style={styles.quickSelectContainer}>
        <TouchableOpacity style={styles.quickSelectButton} onPress={() => handleQuickSelect(10)}>
          <Text style={styles.quickSelectText}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickSelectButton} onPress={() => handleQuickSelect(20)}>
          <Text style={styles.quickSelectText}>20</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickSelectButton} onPress={() => handleQuickSelect(50)}>
          <Text style={styles.quickSelectText}>50</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickSelectButton} onPress={() => handleQuickSelect(100)}>
          <Text style={styles.quickSelectText}>100</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Custom Amount"
        value={customAmount}
        onChangeText={handleCustomAmountChange}
        keyboardType="numeric" // Display numeric keyboard
        maxLength={5} // Limit custom amount input (you can adjust as needed)
      />

      {/* Display the selected amount (or custom input) in the center */}
      <Text style={styles.selectedAmountText}>
        {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : 'No amount selected'}
      </Text>

      {/* Display User Balance */}
      <Text style={styles.balanceText}>Current Balance: ${balance.toFixed(2)}</Text>

      {/* Reload Button */}
      <TouchableOpacity style={styles.reloadButton} onPress={handleReload} disabled={loading}>
        <Text style={styles.reloadButtonText}>{loading ? 'Reloading...' : 'Reload'}</Text>
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
    marginBottom: 20,
  },
  quickSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  quickSelectButton: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  quickSelectText: {
    color: '#fff',
    fontSize: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  selectedAmountText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  reloadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

