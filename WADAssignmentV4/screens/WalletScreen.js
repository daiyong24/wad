import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WalletScreen() {
  const [balance, setBalance] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user balance from API
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = 1;  // Use actual user ID here
      // Fetch user balance
      const balanceResponse = await fetch(`http://10.0.2.2:5000/wallets/balance?user_id=${userId}`);
      const balanceData = await balanceResponse.json();
  
      setBalance(balanceData.balance);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRefresh = () => {
    // Re-fetch the user balance when the Refresh button is pressed
    fetchUserData();
  };

  if (balance === null) return <ActivityIndicator style={styles.loader} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Display User Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance: ${balance}</Text>
      </View>

      {/* Reload Button */}
      <View style={styles.reloadButtonContainer}>
        <TouchableOpacity
          style={styles.reloadButton}
          onPress={() => navigation.navigate('ReloadMethodScreen')}
        >
          <Text style={styles.reloadButtonText}>Reload</Text>
        </TouchableOpacity>
      </View>

      {/* Refresh Button */}
      <View style={styles.refreshButtonContainer}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={handleRefresh}
        >
          <Text style={styles.refreshButtonText}>Refresh Balance</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center', // Adjusting the layout to center the balance and reload button
    alignItems: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  reloadButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  reloadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  refreshButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  refreshButton: {
    backgroundColor: '#FF5722', // Different color for refresh button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
