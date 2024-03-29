import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Colors from '../../Utils/Colors';
import React from 'react';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser.tsx";
import * as WebBrowser from "expo-web-browser";
import Header from '../../Components/Header/header.jsx';
import Footer from '../../Components/Footer/Footer.jsx';

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
  
    return (
      <View style={styles.container}>
          <Header />
          <ScrollView contentContainerStyle={styles.contentContainer}>
              <Image
                  source={require('../../../assets/Images/Background.jpg')}
                  style={styles.backgroundImage}
              />
              <View style={styles.transparentSquare}>
                <Text style={styles.loginwithopttext}>Login with OTP</Text>
                <TextInput
                  style={[styles.input]}
                  value=""
                  onChangeText=""
                  placeholder="Enter phone number"
                  editable={true}
                />    
                <TouchableOpacity
                      style={styles.output}
                  >
                      <Text style={styles.buttonText}>
                          Generate OTP
                      </Text>
                  </TouchableOpacity>  
                <TextInput
                  style={[styles.input]}
                  value=""
                  onChangeText=""
                  placeholder="Enter OTP"
                  editable={true}
                /> 
                <TouchableOpacity
                      style={styles.output}
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
      width: 150,
    },
  });
