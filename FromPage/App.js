import React, { useState, useRef } from 'react';
import { Alert, ScrollView, View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import AppHeader from './components/AppHeader.js';
import AppFooter from './components/AppFooter.js'; 
import UserInformation from './components/FwInformation.js'; 
import ModalContent from './components/ModalContent';

const MyProfilePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setfirstName] = useState('Rajesh');
  const [middleName, setmiddleName] = useState('Suresh');
  const [lastName, setlastName] = useState('Khanna');
  const [selectedMenuItem, setSelectedMenuItem] = useState('Basics');
  const [address, setAddress] = useState('House No. 1891, Sector 16, Faridabad, Haryana');
  const [contactNumber, setContactNumber] = useState('+919876543219');
  const [emailId, setEmailId] = useState('example@example.com');
  

  const scrollViewRef = useRef();

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (menuItem === 'Basics' && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0 }); 
    }
    if (menuItem === 'Logout') {
      Alert.alert(
        'Log Out',
        'Are you sure you want to log out?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => console.log('Confirm Pressed'), // actual logout logic from nishtha
          },
        ],
        { cancelable: false }
      );
    } else {
      setSelectedMenuItem(menuItem);
      if (menuItem === 'Basics' && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0 });
      }
    }
    if (menuItem === 'Profile Photo') {
      setIsModalVisible(true);
    } else if (menuItem === 'Logout') {
      Alert.alert(
        'Log Out',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'Confirm', onPress: () => console.log('Confirm Pressed') },
        ],
        { cancelable: false }
      );
    } else {
      setSelectedMenuItem(menuItem);
      if (menuItem === 'Basics' && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0 });
      }
    }
  };

  const getMenuItemStyle = (menuItem) => {
    return menuItem === selectedMenuItem ? styles.selectedMenuItem : styles.menuItem;
  };
  const handleImageUpload = () => {
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <AppHeader />

    <View style={styles.container}>        
      {/* Main Content */}
      <ScrollView ref={scrollViewRef} style={styles.mainContent} alwaysBounceVertical={false}> 
      <UserInformation
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        address={address}
        contactNumber={contactNumber}
        emailId={emailId}
        setfirstName={setfirstName}
        setmiddleName={setmiddleName}
        setlastName={setlastName}
        setAddress={setAddress}
        setContactNumber={setContactNumber}
        setEmailId={setEmailId}
        handleImageUpload={handleImageUpload} // Pass handleImageUpload as a prop
    />
      </ScrollView>
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <ModalContent closeModal={closeModal} />
      </View>
    </Modal>
    <AppFooter/>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  safeArea: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MyProfilePage;
