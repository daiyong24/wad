import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FeedbackScreen=()=>{
    const[rating,setRating]= useState(0);
    const[feedback,setFeedback]= useState('');
    const[improvement,setImprovement]=useState('');

    const handleSubmit = () => {
        if (rating === 0) {
            Alert.alert('Error', 'Please provide a rating');
            return;
        }

        Alert.alert(
            'Success',
            'Thank you for your feedback!',
            [
                { 
                    text: 'OK', 
                    onPress: () => {
                        // Reset form after submission
                        setRating(0);
                        setFeedback('');
                        setImprovement('');
                    }
                }
            ]
        );
    };

    return(
    <ScrollView contentContainer={styles.contentContainer}>
        <Text style ={styles.header}>Feedback</Text>
        <Text style ={styles.header}>We want to hear your opinion</Text>

        <View style={styles.section}>
            <Text styles={styles.sectionTitle}>Please rate us!</Text>
            <View style={styles.starContainer}>
                {[1,2,3,4,5].map((star) =>(
                    <TouchableOpacity
                    key={star}
                    onPress={()=> setRating(star)}>
                        <Icon 
                name={star <= rating ? 'star' : 'star-border'} 
                size={40} 
                color={star <= rating ? '#FFD700' : '#ccc'} 
                        />
                    </TouchableOpacity>
                ))}
                </View>        
         </View>

         <View style={styles.section}>
            <Text style={styles.sectionTitle}>What can we improved for you?</Text>
        <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Tell us how can we do better for you...."
        value={improvement}
        onChangeText={setImprovement}
        multiline
        numberOfLines={5}
        />
         </View>

         <TouchableOpacity
         style={styles.submitButton}
         onPress={handleSubmit}>

         <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    contentContainer : {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
      },
      subtitle: {
        fontSize: 16,
        marginBottom: 30,
        color: '#666',
      },
      section: {
        marginBottom: 25,
      },
      sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#444',
      },
      starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
      },
      multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
      },
      submitButton: {
        backgroundColor: '#0066cc',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
      },
})
    


export default FeedbackScreen;