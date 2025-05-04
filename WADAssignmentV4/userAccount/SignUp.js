//LenaNote: Double asterisk ('**') the comment mean something needs to be changed

import React, { useState }from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, 
  KeyboardAvoidingView, Platform ,ScrollView, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


export default function SignUp() {
 const navigation = useNavigation();

  const [email, setEmail] = useState(''); //Initialize email
  const [password, setPassword] = useState(''); //Initialize Password
  const [errors, setErrors] = useState({}) ; //Handle Errors
  const [showPassword, setShowPassword] = useState(false) //Hide/Show password
  const [phoneNum, setPhoneNum] = useState('');//Initialize phone num
  const [name, setName] = useState('');//Initialize user name

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

       // Password validation
        if (!password) {
          newErrors.password = 'Password is required';
        } else if (password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }

        // Phone num validation
        const phoneNumRegex = /^601\d{8,9}$/; //Set phone num values
        if (!phoneNum) {
          newErrors.phoneNum = 'Phone number is required';
        } else if (!phoneNumRegex.test(phoneNum)) {
          newErrors.phoneNum = 'Phone number must be at least 8 characters';
        }

        //Update user name
        const nameRegex = /^[A-Za-z ]+$/;
        if (!name) {
          newErrors.name = 'Name is required';
        } else if (!nameRegex.test(name)) {
          newErrors.name = 'Please enter a valid name';
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
          
          {/* Back Button */}
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack('Login')}>
            
              <Text style={styles.backButtonText}>← Back</Text>
            </Pressable>
         
            <View style={{ height: 80 }} />
              <Image
                source={require('../assets/temp_logo.png')}
                style={styles.logo}
               />

              <Text style={styles.title}>Sign Up</Text>
              
      {/*signUp Container for 
         Container_1:Name
       & Container_2:Email  
       & Container_3:Password 
       & Container_4:Phone Num*/}

          {/*  Container_1:Name */}
            <View style={styles.signUpContainer}>
              <Icon name="person-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                keyboardType="default"
                autoCapitalize="none"
              />
            </View>

            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            {/* Container_2:Email  */}
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

            {/* & Container_3:Password   */}
            <View style={styles.signUpContainer}>
              <Icon name="lock-closed-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
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
         
            {/* Container_4:Phone Num*/}
            <View style={styles.signUpContainer}>
              <Icon name="call-outline" size={25} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Mobile number (e.g 60123456789)"
                value={phoneNum}
                onChangeText={setPhoneNum}
                keyboardType="phone-pad"
              />
            </View>

            {errors.phoneNum && <Text style={styles.errorText}>{errors.phoneNum}</Text>}

            <View style={{ height: 40 }} />
           
           {/*After Submit,navigate to OTP page */}
           <Pressable 
              style={styles.bigButton}
              onPress={() => {
                if (validate()) { 
                  Alert.alert(
                    "OTP sent",
                    "Please check your phone.",
                    [
                      { text: "OK", //User click on 'OK' then navigate to OTP page}
                        onPress:() => navigation.navigate('OTP') } //Navigate to OTP page
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
      alignItems: 'flex-start',
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
  
    backButton: {
      position: 'absolute', 
      top: 40,              
      left: 10,             
      padding: 8,
      backgroundColor: '#e0e0e0',
      borderRadius: 8,
    },
    
    backButtonText: {
      fontSize: 18,
      color: 'black',
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