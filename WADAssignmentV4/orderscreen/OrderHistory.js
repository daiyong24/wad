import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

export default function OrderHistoryScreen() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1;  // Assuming user ID is 1 for now

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/orders/history?user_id=${userId}`);
        const data = await response.json();
        setOrderHistory(data.order_history);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {orderHistory.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.order_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderText}>Order ID: {item.order_id}</Text>
              <Text style={styles.orderText}>Status: {item.status}</Text>
              <Text style={styles.orderText}>Total Price: RM {item.total_price}</Text>
              <Text style={styles.orderText}>Created At: {item.created_at}</Text>
              {item.completed_at && <Text style={styles.orderText}>Completed At: {item.completed_at}</Text>}
              <Text style={styles.itemsText}>Items:</Text>
              {item.items.map((itemDetail, index) => (
                <Text key={index} style={styles.orderText}>
                  - {itemDetail.quantity} x Item {itemDetail.menu_id} at RM {itemDetail.price_at_order}
                </Text>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCard: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemsText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
