import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddToCartScreen() {
  const navigation = useNavigation();
  const userId = 1; // simple hard-coded for assignment
  const [items, setItems] = useState(null);

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = () => {
    fetch(`http://10.0.2.2:5000/orders/items?user_id=${userId}`)
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  };

  const changeQty = (id, qty) => {
    if (qty < 1) return;
    fetch(`http://10.0.2.2:5000/orders/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty }),
    }).then(fetchCart);
  };

  const removeItem = (id) => {
    fetch(`http://10.0.2.2:5000/orders/items/${id}`, { method: 'DELETE' })
      .then(fetchCart);
  };

  if (items === null) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={items}
          keyExtractor={i => `${i.id}`}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>×{item.quantity}</Text>
              <TouchableOpacity onPress={() => changeQty(item.id, item.quantity + 1)}>
                <Text style={styles.btnText}>＋</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeQty(item.id, item.quantity - 1)}>
                <Text style={styles.btnText}>－</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text style={styles.delete}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.footerBtn, styles.secondaryBtn]}
          onPress={() => navigation.navigate('OrderScreen')}  // or your menu screen name
        >
          <Text style={styles.footerBtnText}>Add More Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerBtn, styles.primaryBtn]}
          onPress={() => navigation.navigate('CheckoutScreen')}
        >
          <Text style={[styles.footerBtnText, { color: '#fff' }]}>Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 50 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  name: { flex: 1 },
  btnText: { fontSize: 18, paddingHorizontal: 8 },
  delete: { color: 'red', paddingHorizontal: 8 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  footerBtn: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: '#007AFF',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  footerBtnText: {
    fontSize: 16,
  },
});
