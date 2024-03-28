import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
                  <View style={styles.dashedLine}></View>
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
      top: '20%', 
      left: '10%',
      width: '80%', 
      aspectRatio: 1, 
      backgroundColor: 'rgba(255, 173, 88, 0.8)', 
      justifyContent: 'flex-end', 
      alignItems: 'center',
      paddingBottom: 20, 
    },
    dashedLine: {
      width: '80%',
      height: 2,
      borderWidth: 1,
      borderColor: Colors.GREY,
      borderStyle: 'dashed',
      marginBottom: 10, 
    },
    button: {
      padding: 16,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 99,
    },
    buttonText: {
      color: Colors.WHITE,
      fontSize: 20,
      textAlign: 'center',
    },
  });
