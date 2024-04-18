import React from 'react';
import { View, Button, StyleSheet, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import AppHeader from '../components/AppHeader';

const PatientDetails = ({ onBack }) => {
    console.log("Inside patient details");
    return (
      <SafeAreaView style={styles.safeArea}>

        <AppHeader/>
        {/* <View style={styles.contentContainer}> */}
          {/* <Text>Patient Details Here</Text> */}
          <Button title="Back" onPress={onBack} />
        {/* </View> */}
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // SafeAreaView should take up the whole screen
    backgroundColor: 'white',
    width: '100%', // Set the background color to match the rest of the content
  },
});

export default PatientDetails;
