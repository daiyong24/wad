import React, {useState,useEffect} from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function OrderScreen() {
  const [mains, setMains] = useState(null);

  useEffect(() => {
    fetch('http://10.0.2.2:5000/api/menu')       // Android emulator host
      .then(r => r.json())
      .then(data => setMains(data.filter(i => i.category==='Main')))
      .catch(() => setMains([]));
  }, []);

  if (mains === null) return <ActivityIndicator style={styles.loader} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mains.map(item => (
        <View key={item.id} style={styles.card}>
          <Image
            source={require('../assets/pasta.png')}  // single fallback image
            style={styles.icon}
          />
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: { flex:1, justifyContent:'center' },
  container: { padding:16, alignItems:'center' },
  card: { flexDirection:'row', marginBottom:12, alignItems:'center' },
  icon: { width:80, height:80, marginRight:12 },
  title: { fontSize:18, fontWeight:'600' },
  price: { fontSize:16, color:'#555' }
});
