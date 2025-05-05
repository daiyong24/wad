//LenaNote: Double asterisk ('**') the comment mean something needs to be changed

import React, { useState }from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, 
  KeyboardAvoidingView, Platform ,ScrollView, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function ResetPassword() {
 const navigation = useNavigation();

  
  const [password, setPassword] = useState(''); //Initialize Password
  const [errors, setErrors] = useState({}) ; //Handle Errors
  const [showPassword, setShowPassword] = useState(false) //Hide/Show password
  

  //User account validation
  const validate = () => { 
    const newErrors = {};


       // Password validation
        if (!password) {
          newErrors.password = 'Password is required';
        } else if (password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
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
                source={require('../assets/temp_logo.png')}
                style={styles.logo}
               />

              <Text style={styles.title}>Reset Password</Text>
              
            {/*Container:Password */}
            
            <View style={styles.signUpContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} //If password is true,password is visible
              />
            

              {/* Show Password */}
                  <Icon 
                    name={showPassword ? 'eye' : 'eye-off'} // Toggle eye icon based on showPassword state
                    size={25}
                    color="gray"
                    onPress={() => setShowPassword(!showPassword)} // Toggle showPassword on press
                  />
             </View>
      
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        

            <View style={{ height: 40 }} />
           
           {/*After Submit,navigate to OTP page */}
           <Pressable 
              style={styles.bigButton}
              onPress={() => {
                if (validate()) { 
                  Alert.alert(
                    "Successful!",
                    "Please Login.",
                    [
                      { text: "OK", //User click on 'OK' then navigate to OTP page}
                        onPress:() => navigation.navigate('Login') } //Navigate to OTP page
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
   
    title: {
      fontSize: 32,
      marginBottom: 50,
      fontWeight: 'bold',
      color: 'black',
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