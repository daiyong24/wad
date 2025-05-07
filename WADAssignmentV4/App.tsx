import React,  { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableNativeFeedback, TouchableOpacity, Text, Image, ScrollView, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import OrderScreen from './screens/OrderScreen';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/Morescreen/MoreScreenDetails';
import DrawerNavigator from './screens/Drawer'; // <--- Rename the import (DrawerNavigator)

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BurgerScreen from './orderscreen/BurgerScreen';
import PromotionScreen from './orderscreen/PromotionScreen';
import NoodleScreen from './orderscreen/NoodleScreen';
import BeverageScreen from './orderscreen/BeverageScreen';
import PizzaScreen from './orderscreen/PizzaScreen';
import DessertScreen from './orderscreen/DessertScreen';
import OrderHistory from './orderscreen/OrderHistory';



import Login from './userAccount/Login';//Import Login page
import SignUp from './userAccount/SignUp';//Import Sign Up page
import OTP from './userAccount/OTP';//Import OTP page
import ForgotPassword from './userAccount/ForgotPassword';//Import ForgotPassword page
import ResetPassword from './userAccount/ResetPassword';//Import ResetPassword page

import PromotionFoodDetailScreen from './orderscreen/DetailsScreen/PromotionFoodDetailScreen';
import CheckoutScreen     from './screens/CheckoutScreen';
import MyAccountScreen     from './screens/Morescreen/MyAccountScreen';

import ReloadMethodScreen from './walletscreen/ReloadMethodScreen';//Import Sign Up page
import BankLoginScreen from './walletscreen/BankLoginScreen';//Import Sign Up page
import CardLoginScreen from './walletscreen/CardLoginScreen';//Import Sign Up page
import AmountSelectionScreen from './walletscreen/AmountSelectionScreen';//Import Sign Up page

// 1) Order Stack
const Stack = createNativeStackNavigator();
function OrderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="OrderHome" component={OrderScreen} options={{}} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} options={{title:'OrderScreen'}} />
      <Stack.Screen name="Promotion" component={PromotionScreen} options={{ title: 'Promotion' }} />
      <Stack.Screen name="Burger" component={BurgerScreen} options={{ title: 'Burger' }} />
      <Stack.Screen name="Noodle" component={NoodleScreen} options={{ title: 'Noodle' }} />
      <Stack.Screen name="Dessert" component={DessertScreen} options={{ title: 'Dessert' }} />
      <Stack.Screen name="Pizza" component={PizzaScreen} options={{ title: 'Pizza' }} />
      <Stack.Screen name="Beverage" component={BeverageScreen} options={{ title: 'Beverage' }} />
      <Stack.Screen name="PromotionFoodDetail" component={PromotionFoodDetailScreen} options={{ title: 'Food Detail' }} />
      <Stack.Screen name="AddToCart" component={require('./screens/AddToCartScreen').default} options={{ title: 'Your Cart' }} />
      <Stack.Screen name="CheckoutScreen"component={CheckoutScreen} options={{ title: 'Checkout' }}/>
      <Stack.Screen name="MyAccountScreen"component={MyAccountScreen} options={{ title: 'MyAccountScreen' }}/>
      <Stack.Screen name="ReloadMethodScreen"component={ReloadMethodScreen} options={{ title: 'Reload Method' }}/>
      <Stack.Screen name="BankLoginScreen"component={BankLoginScreen} options={{ title: 'Bank Login' }}/>
      <Stack.Screen name="CardLoginScreen"component={CardLoginScreen} options={{ title: 'Card Method' }}/>
      <Stack.Screen name="AmountSelectionScreen"component={AmountSelectionScreen} options={{ title: 'Amount Selection' }}/>
      <Stack.Screen name="OrderHistory"component={OrderHistory} options={{ title: 'Order History '}}/>
    </Stack.Navigator>
  );
}



const Tab = createBottomTabNavigator();


// Custom Button for TabBar
const CustomButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,                     // fill the available width
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? 'yellow' : 'transparent',
        paddingVertical: 2,          // tighten up the vertical padding
        marginBottom: 0,             // remove that gap under the tabs
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

// Tab Navigator (Bottom Tabs)
export const TabNavigator = () => { // <--- export it so Drawer can use
  return (
    <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      headerRight: () => 
        route.name !== 'More' ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons 
              name="menu" 
              size={30} 
              color="black" 
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        ) : null,
    })}>
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
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={focused ? 30 : 20}
              color={focused ? 'red' : 'gray'}
            />
          ),
          tabBarButton: (props) => <CustomButton {...props} />,
          headerRight: () => 
            <Image
          source={require('./assets/temp_logo.png')} 
          style={{ width: 150, height: 150, marginRight: 1.5 }}/>     
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false); //Initialize false to simulate status of Login
  
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn?(
      <> 
        <Stack.Screen name="Login">
          {(props) => <Login {...props} onLogin={() => setIsLoggedIn(true)} />} 
        
        </Stack.Screen>

        {/*Sign Up, the input data will be link to Customer database */}
        <Stack.Screen name="SignUp" component={SignUp} />

        {/*OTP page */}
        <Stack.Screen name="OTP" component={OTP} />

        {/*Forgot Password page */}
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        {/*Reset page */}
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      
      </>
    ):(
      //When Login successful,then stack screen on
   <Stack.Screen name="MainApp" component={DrawerNavigator} />
  )}
</Stack.Navigator>
    
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