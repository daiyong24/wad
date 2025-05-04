import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function PromotionFoodDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [qty, setQty] = useState(1);
  const userId = 1;

  const addToCart = () => {
    fetch('http://10.0.2.2:5000/orders/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, menu_id: item.id, quantity: qty }),
    }).then(() => navigation.navigate('AddToCart'));
  };

  return (
    <SafeAreaView style={{ flex:1, padding:16, alignItems:'center' }}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <View style={{ flexDirection:'row', margin:20 }}>
        <TouchableOpacity onPress={() => setQty(q => Math.max(1, q-1))}><Text>－</Text></TouchableOpacity>
        <Text style={{ marginHorizontal:20 }}>{qty}</Text>
        <TouchableOpacity onPress={() => setQty(q => q+1)}><Text>＋</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={{ color:'#fff' }}>Add to Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize:24, marginVertical:8 },
  price: { fontSize:18, marginBottom:16 },
  button: { backgroundColor:'#28a745', padding:12, borderRadius:4 },
});
