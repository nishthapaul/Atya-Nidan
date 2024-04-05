import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Colors from '../../Utils/Colors';
import React, { useState , useEffect} from 'react';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser.tsx";
import * as WebBrowser from "expo-web-browser";
import Header from '../../Components/Header/header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import axios from 'axios';

export default function LoginScreen() {
    WebBrowser.maybeCompleteAuthSession();
    useWarmUpBrowser();
  
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
    const onPress = async () => {
      try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
    
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
    }
    const[otp, setOtp] = React.useState('');
    const[phoneNumber, setphonenumber] = React.useState('');
    const[enteredotp, setenteredOtp] = React.useState('');
    const[role, setRole] = React.useState('');


    let random_otp = '';
    const handleOTPRequest = () => {
      for (let i = 0; i < 4; i++) {
        random_otp += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
      }
      setOtp(random_otp);
      const data = {
        "phoneNumber": phoneNumber,
        "otp": random_otp,
      };

      // Make POST request to your backend endpoint
      axios.post('https://1735-103-156-19-229.ngrok-free.app/atyanidan/auth/api/authenticate', data)
          .then(response => {
              setRole(response.data)
              console.log('Response:', response.data);
              Alert.alert('Success', 'Otp sent!');
              // saveModal();
          })
          .catch(error => {
              // Handle error
              console.error('Error:', error);
              // Show error message or perform any other actions
              Alert.alert('Error', 'Failed to send otp. Please try again later.');
              // saveModal();

          });
    }
    useEffect(
      () => {
          console.log(otp);
      },[otp]);
      const matchOtp = () => {
        
  
        // Make POST request to your backend endpoint
        if(enteredotp===otp)
             {
                // Handle success response
               console.log("role", role);
                // Show success message or perform any other actions
                Alert.alert('Success', 'User verified!');
                // Close the modal or perform any other actions
                // saveModal();
            }
            else {
                // Handle error
                console.error('otp doent match');
                // Show error message or perform any other actions
                Alert.alert('Error', 'Unauthorized User');
                // saveModal();
  
            }
    };
    return (
      <View style={styles.container}>
          <Header />
          <ScrollView contentContainerStyle={styles.contentContainer}>
              <Image
                  source={require('../../../assets/Images/Background.jpg')}
                  style={styles.backgroundImage}
              />
              <View style={styles.transparentSquare}></View>
              <View style={styles.mainstuff}>
                <Text style={styles.loginwithopttext}>Login with OTP</Text>
                <TextInput
                  style={[styles.input]}
                  value={phoneNumber}
                  onChangeText={(phno) => setphonenumber(phno)}
                  placeholder="Enter phone number"
                  editable={true}
                />    
                <TouchableOpacity
                      style={styles.output}
                      onPress = {
                          handleOTPRequest} // Call the first function             
                  >
                      <Text style={styles.buttonText}>
                          Generate OTP
                      </Text>
                  </TouchableOpacity>  
                <TextInput
                  style={[styles.input]}
                  value={enteredotp}
                  onChangeText={(eotp) => setenteredOtp(eotp)}
                  placeholder="Enter OTP"
                  editable={true}
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
                      onPress={onPress}
                  >
                      <Text style={styles.buttonText}>
                          Login with Google
                      </Text>
                  </TouchableOpacity>
              </View>
          </ScrollView>
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
      // alignItems: 'center',
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
      flex: 1, 
      width: 400,
      alignItems: 'left',

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
      flex: 1, 
      alignItems: 'left',
      width: 200,
    },
    mainstuff: {
      position: 'absolute',
      top: '5%', 
      left: '20%',
      width: '60%', 
      height: '90%',
      aspectRatio: 1,
    }
  });
