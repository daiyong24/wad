//LenaNote: Double asterisk ('**') the comment mean something needs to be changed

import React, { useState }from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, 
  KeyboardAvoidingView, Platform ,ScrollView, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function ForgotPassword() {
 const navigation = useNavigation();

  const [email, setEmail] = useState(''); //Initialize email
  
  const [errors, setErrors] = useState({}) ; //Handle Errors
  

  //User account validation
  const validate = () => { 
    const newErrors = {};

      // Email validation
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
          newErrors.email = 'Please enter a valid email';
        }

        // Update error state
        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0; // Return true if no errors
      }; 

 
      return (

        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
              
              <Image
                source={require('../assets/burger.png')}
                style={styles.logo}
               />

              <Text style={styles.title}>Forgot Password</Text>
              
              
            
            {/*Container:Email */}

            <View style={styles.signUpContainer}>
              <Icon name="mail-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
      
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={{ height: 40 }} />
           
           {/*After Submit,navigate to OTP page */}
           <Pressable 
              style={styles.bigButton}
              onPress={() => {
                if (validate()) { 
                  Alert.alert(
                    "Reset email sent",
                    "Please check your email.",
                    [
                      { text: "OK", //User click on 'OK' then navigate to OTP page}
                        onPress:() => navigation.navigate('ResetPassword') } //Navigate to OTP page
                    ] 
                  )
                  
                }
              }}
            >
                  <Text style={styles.buttonText}>Submit</Text>
            </Pressable>

            <View style={{ height: 20 }} />
           
          </ScrollView>
        </KeyboardAvoidingView>
      );
}  





const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     // backgroundColor: 'rgb(0,0,0)', //**Background color
      paddingHorizontal: 20,
    },

    containerText:{
      color: 'black',
      fontSize: 50,
      fontWeight: 'bold',
    },
  
   bigButton: {
      backgroundColor: 'blue',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 10,
    },
  
    buttonText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
  
  
  smallButton:{
    width: '100%', 
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  
    smallButtonText:{
      fontSize: 14, 
      color: 'blue',
    },
  
  
    title: {
      fontSize: 32,
      marginBottom: 50,
      fontWeight: 'bold',
      color: 'black',
    },
  
    subtitle: {
      fontSize: 12,
      marginBottom: 10,
      fontWeight: 'light',
      color: 'black',
    },
  
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#1E90FF',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  
    buttonText: {
      color: '#fff',
      fontSize: 20,
    },

    signUpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      minHeight: 50,
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
  
    icon: {
      marginRight: 10,
    },
  
    input: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      fontSize: 16,
      color: 'black',   
    },
  
    errorText: {
      color: 'red',
      fontSize: 14,
      marginBottom: 10,
    },

    logo: {
      height: 200,
      width: 250,
      resizeMode: 'contain',
      marginBottom: 10,
  
    },
  
   });