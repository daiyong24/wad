import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

const LogoutScreenScreen = () => {
  const navigation = useNavigation();

  const handleLogout = (screenName) => {
    const Screens = ['Login1'];
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => navigation.goBack(),
          style: "cancel"
        },
        {
          text: "Log Out",
          onPress: () => navigation.navigate(screenName),
        }
      ]
    );
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Logging out...</Text>
    </View>
  );
};

export default LogoutScreenScreen;
