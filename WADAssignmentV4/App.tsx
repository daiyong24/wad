import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import RewardScreen from './screens/RewardScreen';
import SettingScreen from './screens/SettingScreen';
import DrawerNavigator from './screens/Drawer'; // <--- Rename the import (DrawerNavigator)

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
        component={OrderScreen}
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

export default App;
