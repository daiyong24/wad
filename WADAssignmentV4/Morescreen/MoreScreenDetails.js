import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyAccountScreen from './MyAccountScreen';
import AboutUsScreen from './AboutUsScreen';
import FeedbackScreen from './FeedbackScreen';
import LogoutScreen from './LogoutScreen';
import { createStackNavigator } from '@react-navigation/stack';


const MoreMainScreen =({navigation}) =>{
   
    const moreLists=[
        {
            title: 'My Account',
            icon: 'account-circle',
            screen: 'MyAccountScreen',
        },
        {
            title:'About Us',
            icon: 'info',
            screen: 'AboutUsScreen',
        },
        {
            title:'Feeback',
            icon: 'feedback',
            screen: 'FeedbackScreen',
        },
        {
            title: 'Log Out',
            icon: 'logout',
            screen: 'LogoutScreen',
          },
    ]

    return(
        <View style={styles.container}>
        <View style={styles.headerSpacer}/>
        <ScrollView style={styles.container}>
            {moreLists.map((item,index) =>(
                <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={()=> navigation.navigate(item.screen)}>
                    <Icon name={item.icon} size={34} color='#FFD700' style={styles.icon}/>
                    <Text style={styles.menuText}>{item.title}</Text>
                    <Icon name="chevron-right" size={24} color='#999'/>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    
    );
};
const Stack= createStackNavigator();

const MoreScreenDetails = () => {
    return(
        <Stack.Navigator screenOptions ={{ headerShown:false}}>
            <Stack.Screen name="MoreMainScreen" component={MoreMainScreen} />
            <Stack.Screen name="MyAccountScreen" component={MyAccountScreen}/>
            <Stack.Screen name="AboutUsScreen" component={AboutUsScreen}/>
            <Stack.Screen name="FeedbackScreen" component={FeedbackScreen}/>
            <Stack.Screen name="LogoutScreen" component={LogoutScreen}/>
        </Stack.Navigator>
    );
};

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',

    },
      menuContainer: {
        flex: 1,
        paddingHorizontal: 16,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      icon: {
        marginRight: 16,
      },
      menuText: {
        color: '#000000',
        flex: 1,
        fontSize: 18,
      },
      headerSpacer:{
            height:100,
      },

})
export default MoreScreenDetails;