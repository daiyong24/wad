import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableNativeFeedback, TouchableOpacity, Text, Image, ScrollView, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import OrderScreen from './screens/OrderScreen';
import HomeScreen from './screens/HomeScreen';
import RewardScreen from './screens/RewardScreen';
import SettingScreen from './screens/SettingScreen';
import DrawerNavigator from './screens/Drawer'; // <--- Rename the import (DrawerNavigator)
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BurgerScreen from './orderscreen/BurgerScreen';
import PromotionScreen from './orderscreen/PromotionScreen';
import NoodleScreen from './orderscreen/NoodleScreen';
import BeverageScreen from './orderscreen/BeverageScreen';
import PizzaScreen from './orderscreen/PizzaScreen';
import DessertScreen from './orderscreen/DessertScreen';

import PromotionCategories from './orderscreen/Promotions/PromotionCategories';

// 1) Order Stack
const Stack = createNativeStackNavigator();
function OrderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="OrderHome" component={OrderScreen} options={{ }} />
      <Stack.Screen name="Promotion" component={PromotionScreen} options={{ title: 'Promotion' }} />
      <Stack.Screen name="Burger" component={BurgerScreen} options={{ title: 'Burger' }} />
      <Stack.Screen name="Noodle" component={NoodleScreen} options={{ title: 'Noodle' }} />
      <Stack.Screen name="Dessert" component={DessertScreen} options={{ title: 'Dessert' }} />
      <Stack.Screen name="Pizza" component={PizzaScreen} options={{ title: 'Pizza' }} />
      <Stack.Screen name="Beverage" component={BeverageScreen} options={{ title: 'Beverage' }} />
      <Stack.Screen name="Pasta" component={PromotionCategories} options={{ title: 'Pasta' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

// Custom Button for TabBar
const CustomButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState?.selected;
  return (
    <View style={{ overflow: 'hidden' }}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{
          width: 100,
          alignItems: 'center',
          backgroundColor: focused ? 'yellow' : 'transparent',
          padding: 10,
          marginBottom: 10
        }}>
          {children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

// Tab Navigator (Bottom Tabs)
export const TabNavigator = () => { // <--- export it so Drawer can use
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={30} color="black" style={{ marginLeft: 15 }}  drawerPosition = 'right'/>
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={focused ? 30 : 20}
              color={focused ? 'red' : 'gray'}
            />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              size={focused ? 30 : 20}
              color={focused ? 'red' : 'gray'}
            />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Reward"
        component={RewardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="gift"
              size={focused ? 30 : 20}
              color={focused ? 'red' : 'gray'}
            />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cog"
              size={focused ? 30 : 20}
              color={focused ? 'red' : 'gray'}
            />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  orderContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  card: {
    width: 140,
    height: 140,
    margin: 8,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: { width: 64, height: 64, marginBottom: 8, resizeMode: 'contain' },
  label: { fontSize: 16, fontWeight: '600' },
  promoContainer: { flex: 1, padding: 24, alignItems: 'flex-start' },
  promoTitle: { fontSize: 24, marginBottom: 16 },
});

export default App;
