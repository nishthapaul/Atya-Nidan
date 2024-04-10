import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Colors from '../Utils/Colors';
import React, { useState , useEffect} from 'react';
import Header from '../components/AppHeader';
import Footer from '../components/AppFooter';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { API_PATHS } from '../constants/apiConstants';
import { LogBox } from 'react-native';

export default function LoginScreen({ onLoginSuccess }) {
  LogBox.ignoreAllLogs();

    const [otp, setOtp] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [enteredOtp, setEnteredOtp] = React.useState('');
    const [otpResponse, setOtpResponse] = React.useState(null);
    const { setAuthToken, setUser, setIsLoggedIn } = useAuth();

    let random_otp = '';

    const handleOTPRequest = () => {
      // Generate a random OTP
      for (let i = 0; i < 4; i++) {
        random_otp += Math.floor(Math.random() * 10);
      }
      setOtp(random_otp);

      // Send OTP request to server
      const data = {
        "phoneNumber": phoneNumber,
        "otp": random_otp,
      };
      const loginauthorizationtoken = API_PATHS.POST_AUTH_TOKEN_IN_LOGIN;
      axios.post(loginauthorizationtoken, data)
          .then(response => {
            setOtpResponse(response.data);
            console.log(random_otp);
            console.log('Response:', response.data);
            Alert.alert('Success', 'OTP sent!');
          })
          .catch(error => {
              console.error('Error:', error);
              Alert.alert('Error', 'Failed to send OTP. Please try again later.');
          });
    };

    const matchOtp = () => {
        if (enteredOtp === otp) {
          const { token, user } = otpResponse;
          setAuthToken(token);
          setUser(user);
          setIsLoggedIn(true);
          console.log(user);
          Alert.alert('Success', 'User verified!');
          onLoginSuccess(user, token); 
        } else {
          Alert.alert('Error', 'Unauthorized User');
        }
    };
    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior for iOS and Android
        >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Image
              source={require('../assets/Images/Background.jpg')}
              style={styles.backgroundImage}
            />
            <View style={styles.transparentSquare}></View>
            <View style={styles.mainstuff}>
              <Text style={styles.loginwithopttext}>Login with OTP</Text>
              <ScrollView style={styles.scrollContainer}>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={(phno) => setPhoneNumber(phno)}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad" // Show numeric keyboard
                />    
                <TouchableOpacity
                  style={styles.output}
                  onPress={handleOTPRequest}
                >
                  <Text style={styles.buttonText}>
                    Generate OTP
                  </Text>
                </TouchableOpacity>  
                <TextInput
                  style={styles.input}
                  value={enteredOtp}
                  onChangeText={(eotp) => setEnteredOtp(eotp)}
                  placeholder="Enter OTP"
                  keyboardType="numeric" // Show numeric keyboard
                /> 
                <TouchableOpacity
                  style={styles.output}
                  onPress={matchOtp}
                >
                  <Text style={styles.buttonText}>
                    Verify OTP
                  </Text>
                </TouchableOpacity>           
  
              <View style={styles.dashedLine}></View>
              <Text style={styles.Ortext}>OR</Text>

              <TouchableOpacity
                style={styles.button}
                // onPress={onPress}
              >
                <Text style={styles.buttonText}>
                  Login with Google
                </Text>
              </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Footer />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center', // Center content vertically
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    transparentSquare: {
      position: 'absolute',
      top: '5%', 
      left: '20%',
      width: '60%', 
      height: '90%',
      aspectRatio: 1, 
      backgroundColor: '#F2D7B5', 
      opacity: 0.7,
      justifyContent: 'flex-end', 
      borderColor: 'black',
      borderWidth: 4,
    },
    dashedLine: {
      marginLeft: 70,
      width: '80%',
      height: 2,
      borderWidth: 1,
      borderColor: Colors.GREY,
      borderStyle: 'dotted',
      marginBottom: 10, 
      opacity: 1
    },
    button: {
      marginLeft: 280,
      width: '30%',
      padding: 16,
      backgroundColor: '#E04931',
      borderRadius: 99,
      marginBottom: 30,
      opacity: 1
    },
    buttonText: {
      color: Colors.WHITE,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    loginwithopttext: {
      fontSize: 28,
      fontWeight: 'bold',
      paddingBottom: 50,
      paddingTop: 30,
      marginLeft: 280,
    },
    Ortext: {
      alignItems: 'center',
      marginLeft: 380,
      paddingBottom: 15,
      fontSize: 18,
      fontWeight: 'bold'
    },
    input: {
      fontSize: 16,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: 'black',
      backgroundColor: 'white',
      marginLeft: 50,
      marginRight: 20,
      marginTop: 5,
      marginBottom: 5,
      padding: 10,
      width: 400,
      minHeight: 50,
    },
    output: {
      fontSize: 16,
      fontWeight: 'bold',
      borderWidth: 2,
      borderRadius: 10,
      borderColor: 'black',
      backgroundColor: '#142D4C',
      marginLeft: 50,
      marginRight: 20,
      marginTop: 5,
      marginBottom: 15,
      padding: 10,
      width: 200,
      minHeight: 50,
    },
    mainstuff: {
      position: 'absolute',
      top: '5%', 
      left: '20%',
      width: '60%', 
      height: '90%',
      aspectRatio: 1,
    }
    })