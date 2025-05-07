import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const userId = 1; // This would be dynamic based on the logged-in user
  const [items, setItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [balance, setBalance] = useState(0); // Store balance to display it
  const [loading, setLoading] = useState(false); // Loading state while fetching data

  useEffect(() => {
    fetchCart();
    fetchBalance();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:5000/orders/items?user_id=${userId}`);
      const data = await res.json();
      setItems(data);
      setTotalPrice(data.reduce((sum, i) => sum + i.price * i.quantity, 0));
    } catch {
      setItems([]);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:5000/wallets/balance?user_id=${userId}`);
      const data = await res.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handlePay = async () => {
    if (balance < totalPrice) {
      // If balance is insufficient, show an alert
      Alert.alert('Insufficient Balance', 'You do not have enough funds to complete the payment.');
      return;
    }

    setLoading(true);

    // If the user has enough balance, process the payment and create an order
    try {
      const orderRes = await fetch('http://10.0.2.2:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          total_products: items.length,
          total_price: totalPrice,
        }),
      });
      const order = await orderRes.json();

      // Insert order items
      await Promise.all(
        items.map((item) =>
          fetch('http://10.0.2.2:5000/order_items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order_id: order.id,
              menu_id: item.id,
              quantity: item.quantity,
              price_at_order: item.price,
            }),
          })
        )
      );

      // Deduct the balance from the wallet
      await fetch(`http://10.0.2.2:5000/wallets/${userId}/deduct`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice }),
      });

      // Show success message and navigate to the Home screen
      Alert.alert('Payment Successful', `Your payment of RM${totalPrice.toFixed(2)} was successful!`, [
        { text: 'OK', onPress: () => navigation.navigate('OrderScreen') },
      ]);
    } catch (error) {
      console.error('Payment Error:', error);
      Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items === null) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Order</Text>

      {/* Display Wallet Balance in Top Right Corner */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance: RM{balance.toFixed(2)}</Text>
      </View>

      {items.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          style={styles.list}
          ListFooterComponent={
            <View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>RM{totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.payBtn} onPress={handlePay} disabled={loading}>
                <Text style={styles.payBtnText}>{loading ? 'Processing...' : `Pay RM${totalPrice.toFixed(2)}`}</Text>
              </TouchableOpacity>
            </View>
          }
          renderItem={({ item }) => {
            const lineTotal = item.price * item.quantity;
            return (
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>
                  RM{item.price.toFixed(2)} × {item.quantity}
                </Text>
                <Text style={styles.lineTotal}>RM{lineTotal.toFixed(2)}</Text>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { color:'#000000',fontSize: 30, marginBottom: 16 ,fontWeight: 'bold'},
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  list: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  name: { flex: 2, fontSize: 16 },
  detail: { flex: 1, textAlign: 'center', fontSize: 16 },
  lineTotal: { flex: 1, textAlign: 'right', fontSize: 16 },
  totalRow: {
    borderTopWidth: 1,
    borderColor: '#000000',
    marginTop: 16,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: { color: '#000000',fontSize: 18, fontWeight: 'bold' },
  totalValue: { color: '#000000',fontSize: 18, fontWeight: 'bold' },
  payBtn: {
    marginTop: 12,
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  payBtnText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  balanceContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  balanceText: {
    color:'#f20a0e',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
