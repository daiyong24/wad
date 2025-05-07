import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AboutUsScreen = () => {
  const navigation = useNavigation();
  return (

    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000"/>
      </TouchableOpacity>
      <View style={styles.headerSpacer} />
      <Text style={styles.header}>About Us</Text>

      <View style={styles.section}>
        <Icon name="fastfood" size={24} color="#4CAF50" style={styles.icon} />
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          To provide a cashless payment solution to our beloving customers
        </Text>
      </View>

      <View style={styles.section}>
        <Icon name="credit-card" size={24} color="#2196F3" style={styles.icon} />
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionText}>
          • Top Up Money to the wallet{'\n'}
          • Using the wallet money to purchase items{'\n'}
          • When you reach a certain points you can exchange your points for items{'\n'}
        </Text>
      </View>

      <View style={styles.section}>
        <Icon name="group" size={24} color="#FF5722" style={styles.icon} />
        <Text style={styles.sectionTitle}>Our Team</Text>
        <Text style={styles.sectionText}>
          Developed by UTAR software developers.
        </Text>
      </View>

      <View style={styles.section}>
        <Icon name="school" size={24} color="#9C27B0" style={styles.icon} />
        <Text style={styles.sectionTitle}>Benefits from us</Text>
        <Text style={styles.sectionText}>
          ✓ Reduced queue times{'\n'}
          ✓ Better hygiene (contactless payments){'\n'}
          ✓ Vendor transaction transparency{'\n'}
          ✓ Rewards provide to all users
        </Text>
      </View>

      <Text style={styles.footer}>
        Version 1.0 • {new Date().getFullYear()} [Canteen App]
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
    marginLeft: 30,
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginLeft: 30,
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  footer: {
    marginTop: 20,
    color: '#000000',
    fontSize: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
},

  headerSpacer: {
    height: 100,
  },
});

export default AboutUsScreen;