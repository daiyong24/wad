import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TabNavigator } from '../App'; 
import ProfileScreen from './ProfileScreen'; 
import OtherScreen from './OtherScreen'; 

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={{ marginVertical: 10 }}
      >
        <Text style={{ fontSize: 18 }}>🏠 Main Tabs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{ marginVertical: 10 }}
      >
        <Text style={{ fontSize: 18 }}>👤 Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Other')}
        style={{ marginVertical: 10 }}
      >
        <Text style={{ fontSize: 18 }}>⭐ Other Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => alert('Logging out...')}
        style={{ marginVertical: 10 }}
      >
        <Text style={{ fontSize: 18, color: 'red' }}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Reusable Drawer Icon Button
const DrawerHeaderRight = (navigation) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <MaterialCommunityIcons
      name="menu"
      size={30}
      color="black"
      style={{ marginRight: 15 }}
    />
  </TouchableOpacity>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        drawerPosition: 'right',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={({ navigation }) => ({
        headerTitle: 'Profile',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        ),
        headerRight: () => DrawerHeaderRight(navigation),
      })}
      />
      <Drawer.Screen
        name="Other"
        component={OtherScreen}
        options={({ navigation }) => ({
          headerTitle: 'Other Page',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
          ),
          headerRight: () => DrawerHeaderRight(navigation),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
