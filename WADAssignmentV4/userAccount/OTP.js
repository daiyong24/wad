//LenaNote: Double asterisk ('**') the comment mean something needs to be changed

import React, { useState }from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, 
  KeyboardAvoidingView, Platform ,ScrollView, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function OTP() {
 const navigation = useNavigation();

    const [otpNum, setOtp] = useState(['', '', '', '', '', '']); //Array for OTP input 
    const [errors, setErrors] = useState({}); // Error state for validation
 
    const inputRefs = otpNum.map(() => React.createRef()); // Create refs for each input field

    const handleOtpChange = (text, index) => {
        const newOtp = [...otpNum];
        newOtp[index] = text;
        setOtp(newOtp);

        // Automatically focus next input if the current input is filled
        if (text && index < otpNum.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    };

  const validate = () => { 
    const newErrors = {};

       //OTP validation
       
       if (otpNum.some(digit => digit === '')) {
        newErrors.otpNum = 'OTP is required';
      } else if (otpNum.length < 6) {
        newErrors.otpNum = 'OTP must be 6 characters';
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
                onPress={() => {
                    Alert.alert(
                    "OTP Expired",
                    "Your OTP has expired. Please request a new one.",
                    [
                        {
                        text: "OK",
                        onPress: () => navigation.goBack('SignUp'), // Go back to the previous page
                        },
                    ]
                    );
                }}
                >
                <Text style={styles.backButtonText}>← Back</Text>
                </Pressable>

           
              <Text style={styles.title}>OTP Verification</Text>
              
            {/*OTP Container*/}
            <View style={styles.otpContainer}>
              {otpNum.map((_, index) => (
                <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
                value={otpNum[index]}
                onChangeText={(text) => handleOtpChange(text, index)}
                />
                 ))}
            </View>

            {errors.otpNum && <Text style={styles.errorText}>{errors.otpNum}</Text>}
           
           {/*After Submit,navigate to Login page */}
           <Pressable 
              style={styles.bigButton}
              onPress={() => {
                if (validate()) { 
                  Alert.alert(
                    "Successful!",
                    "Please Login.",
                    [
                      { text: "OK", //User click on 'OK' then navigate to Login page
                        onPress:() => navigation.navigate('Login') } ,//Navigate to Login page
                    ] 
                  );
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

    otpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
  
    icon: {
      marginRight: 10,
    },
  
    input: {
        width: 40,          
        height: 50,         
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        backgroundColor: '#fff',
        borderColor: '#ccc',
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
  
   });