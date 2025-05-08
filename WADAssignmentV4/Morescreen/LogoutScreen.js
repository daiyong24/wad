import React, { useEffect } from 'react';
import { View, Text, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignUp from '../userAccount/SignUp';

const LogoutScreenScreen=()=>{
    const navigation = useNavigation();

    const handleLogout=()=>{
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    onPress:() => navigation.goBack(),
                    style:"cancel"
                },
                {
                    text: "Log Out",
                    onPress:() =>navigation.navigate('userAccount', {screen: 'SignUp'}),
                }
            ]
        );
    };
    useEffect(()=>{
        handleLogout();
    },[]);
    
    return(
        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Text>Logging out...</Text>
        </View>
    
    );
}



export default LogoutScreenScreen;