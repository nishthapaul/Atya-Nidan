// ProfilePhotoModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfilePhotoModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image 
              source={require('../assets/person1.jpeg')} 
              style={styles.profileImageModal} />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onClose}>
              <Text style={styles.textStyle}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black', 
    borderWidth: 2, 
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20, 
    padding: 35,
    alignItems: "center",
    width: '30%',
    height: '60%', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width:200,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#ADD8E6",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  profileImageModal: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black', 
    borderWidth: 2, 
    resizeMode: 'contain',
  },
  infoContainer: {
    flexDirection: 'row', 
    marginBottom: 10, 
    marginLeft: 20,
  },
});

export default ProfilePhotoModal;
