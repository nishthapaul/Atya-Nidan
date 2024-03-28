// ModalContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModalContent = ({ closeModal }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Title</Text>
      {/* Add your modal content here */}
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close Modal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalContent;
