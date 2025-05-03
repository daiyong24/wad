//LenaNote: Double asterisk ('**') the comment mean something needs to be changed

import React, { useState }from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, 
  KeyboardAvoidingView, Platform ,ScrollView, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';




export default function Login({ onLogin }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState(''); //Initialize email
  const [password, setPassword] = useState(''); //Initialize Password
  const [errors, setErrors] = useState({}) ; //Handle Errors
  const [showPassword, setShowPassword] = useState(false) //Hide/Show password

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
              source={require('../images/temp_logo.jpg')}
              style={styles.logo}
            />
      
            <Text style={styles.title}>Login</Text>
         
              
              
      {/*signIn Container for 
         Container_1: Email  
       & Container_2:Password*/}

            {/* Container_1: Email */}
            <View style={styles.signInContainer}>
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
      
            {/* Container_2:Password */}
            <View style={styles.signInContainer}>
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

            {/* Forgot Password link to SignIn page */}
            <Pressable 
            style={styles.smallButton} 
            onPress={() => navigation.navigate('ForgotPassword')}
            
            >
                <Text style={styles.smallButtonText}>Forgot Password?</Text>
            </Pressable>

         
            <View style={{ height: 40 }} />
           
           {/*After Sign in, link to home page */}
           <Pressable 
              style={styles.bigButton}
              onPress={() => {
                if (validate()) {
                  Alert.alert(
                    "Login Successful",
                    "Welcome back to Order System", //**Change text
                    [
                      {
                        text: "OK", //User click on 'OK' then navigate to home page
                        onPress: () => {
                          onLogin(); 
                        }
                      }
                    ]
                  )
                }
              }}
            >
                          <Text style={styles.buttonText}>Sign in</Text>
                        </Pressable>
            
      

            <View style={{ height: 20 }} />
            <Text style={styles.subtitle}>or</Text>
          
            {/* New User link to Register page */}
            <Pressable 
            style={[styles.smallButton, {alignItems:'center'}]} 
            onPress={() => navigation.navigate('SignUp')} //Navigate to SignUp page
            >
                <Text style={styles.subtitle}>New User?</Text>
                <Text style={styles.smallButtonText}>Join now !</Text>
            </Pressable>
           
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

  logo: {
    height: 200,
    width: 250,
    resizeMode: 'contain',
    marginBottom: 10,

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

  signInContainer: {
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

 });