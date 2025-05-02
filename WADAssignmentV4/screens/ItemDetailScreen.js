import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItemDetailScreen({ route }) {
  const { item } = route.params;
  const [qty, setQty] = useState(1);

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <View style={styles.counter}>
        <TouchableOpacity onPress={() => qty > 1 && setQty(qty - 1)} style={styles.btn}><Text style={styles.btnText}>-</Text></TouchableOpacity>
        <Text style={styles.qty}>{qty}</Text>
        <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.btn}><Text style={styles.btnText}>+</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => {/* add to cart logic */}}>
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24 },
  image: { width: 200, height: 160, borderRadius: 8 },
  name: { fontSize: 24, marginTop: 16 },
  price: { fontSize: 18, color: '#888', marginTop: 8 },
  counter: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  btn: { padding: 12, backgroundColor: '#eee', borderRadius: 4 },
  btnText: { fontSize: 18 },
  qty: { marginHorizontal: 16, fontSize: 18 },
  addButton: { marginTop: 24, backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 36, borderRadius: 6 },
  addText: { color: '#fff', fontSize: 16 }
});
