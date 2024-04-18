// ProfilePhotoModal.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert, Button } from 'react-native';
import axios from 'axios';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext'; 

// const PatientDetails = () => {
    
//   return (
//       <View style={styles.centeredView}>
//          <Text>Hello</Text>
//         </View>
//   );
// };

const PatientDetails = ({ onBack }) => {
    // PatientDetails implementation
    console.log("Inside patient details");
    return (
      <View style={styles.centeredView}>
        <Text>Patient Details Here</Text>
        <Button title="Back" onPress={onBack} />
      </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: 2000,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: 'white', 
  },

});

export default PatientDetails;
