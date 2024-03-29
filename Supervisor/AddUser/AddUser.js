import React, { useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import UserInformation from './UserInformation'; 

const AddUser = ({ saveModal }) => {
    console.log("saveModal", saveModal)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setfirstName] = useState('Rajesh');
  const [middleName, setmiddleName] = useState('Suresh');
  const [lastName, setlastName] = useState('Khanna');
  const [selectedMenuItem, setSelectedMenuItem] = useState('Basics');
  const [address, setAddress] = useState('House No. 1891, Sector 16, Faridabad, Haryana');
  const [contactNumber, setContactNumber] = useState('+919876543219');
  const [emailId, setEmailId] = useState('example@example.com');
  

  const scrollViewRef = useRef();
  const handleImageUpload = () => {
    //Upload image
    };
  return (
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
          saveModal={saveModal}
      />
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddUser;
