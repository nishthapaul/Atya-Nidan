import React, { useCallback } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './App/Screens/LoginScreen/LoginScreen';
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { StatusBar } from 'expo-status-bar';
import TabNavigation from './App/Navigation/TabNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'NotoSans': require('./assets/fonts/NotoSans_Condensed-Regular.ttf'),
    'NotoSans-medium': require('./assets/fonts/NotoSans_Condensed-Bold.ttf'),
    'NotoSans-bold': require('./assets/fonts/NotoSans_Condensed-SemiBold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={'pk_test_ZW5qb3llZC1sb2JzdGVyLTI5LmNsZXJrLmFjY291bnRzLmRldiQ'}>
      <SafeAreaView style={styles.container}>
        <View style={styles.upperBackground}>
        </View>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <SignedIn>
            <TabNavigation />
            <View>
            <SignOut />
            </View>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
          <StatusBar style='dark' />
        </View>
        <View style={styles.lowerBackground}></View>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  upperBackground: {
    height: 6, // Adjust height as needed
    backgroundColor: '#ADD8E6', // Set your desired color
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerBackground: {
    height: 0, // Adjust height as needed
    backgroundColor: '#ADD8E6', // Set your desired color
  }
});
