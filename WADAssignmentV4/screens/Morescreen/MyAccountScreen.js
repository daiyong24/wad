import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const MyAccountScreen=()=>{

    const[user,setUser]= useState({
        id: 1,
        name:'',
        email: '',
        number:'',
        points:0,
        balance:0,
    });
    const navigation = useNavigation();
    const [editing, setEditing]= useState(false);
    const [loading, setLoading] =useState(true);

    useEffect(()=>{
        fetchUserData();
    },[]);

    const fetchUserData= async() =>{
        try{
            const response =await fetch(`http://10.0.2.2:5000/api/users/${user.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data= await response.json();
            setUser(data);
            setLoading(false);
        }catch(error){
            console.error('Error fetching user data: ', error);
            setLoading(false);
        }
    };

    const update = async () => {
        try {
        
            if (!user.name || !user.email || !user.number) {
                Alert.alert('Error', 'Please fill all fields');
                return;
            }
    
            const payload = {
                name: user.name.trim(),
                email: user.email.trim(),
                number: user.number.trim()
            };
    
            console.log('Sending payload:', payload); 
    
            const response = await fetch(`http://10.0.2.2:5000/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });
    
            const responseText = await response.text();
            console.log('Raw response:', responseText); 
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
    
            const result = JSON.parse(responseText);
            setEditing(false);
            Alert.alert('Success', 'Profile updated successfully!');
            
        } catch (error) {
            console.error('Update error:', error);
            Alert.alert('Error', `Update failed: ${error.message}`);
        }
    };

    const change=(field,value)=>{
        setUser(prev =>({...prev, [field]: value}));
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
            style={styles.backButton}
            onPress={() =>  navigation.goBack()}>
                 <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.profileIconContainer}>
                <Icon name="account-circle" size={120} />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>Name:</Text>
                    {editing ?(
                        <TextInput
                        style={styles.input}
                        value={user.name}
                        onChangeText={(text)=> change('name', text)}/>
                    ) :(
                        <Text style={styles.value}>{user.name}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Email:</Text>
                    {editing ?(
                        <TextInput
                        style={styles.input}
                        value={user.email}
                        onChangeText={(text) => change('email',text)}
                        keyboardType="email-address"
                        />
                    ):(
                        <Text style={styles.value}>{user.email}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Phone:</Text>
                    {editing ?(
                        <TextInput
                        style={styles.input}
                        value={user.number}
                        onChangeText={(text) => change('number',text)}
                        keyboardType="phone-pad"
                        />
                    ):(
                        <Text style={styles.value}>{user.number}</Text>
                    )}
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Points</Text>
                    <Text style={[styles.value, styles.points]}>{user.points} points</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Wallet Balance</Text>
                    <Text style={[styles.value, styles.balance]}>${user.balance.toFixed(2)}</Text>
                </View>
            </View>

            {editing ? (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.saveButton]} 
                        onPress={update}
                    >
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, styles.cancelButton]} 
                        onPress={() => setEditing(false)}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity 
                    style={[styles.button, styles.editButton]} 
                    onPress={() => setEditing(true)}
                >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            )}
        </ScrollView>

    );

};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    profileIconContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    infoContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
        color: '#000', 
        fontWeight: 'bold', 
    },
    value: {
        fontSize: 16,
        color: '#000', 
    },
    points: {
        color: '#000', 
        fontWeight: 'bold',
    },
    balance: {
        color: '#000', 
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        color: '#000', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: '#FFD700', 
    },
    saveButton: {
        backgroundColor: '#FFD700', 
        flex: 1,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: '#FFD700',
        flex:1,
    },
    buttonText:{
        color: 'black',
        fontSize:16,
        fontWeight: 'bold',
    },

})


export default MyAccountScreen;