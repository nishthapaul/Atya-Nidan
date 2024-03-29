import React, { useState, useRef } from 'react';
import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import FieldWorkerInformation from './FieldWorkerInformation'; 
import axios from 'axios';

const AddFieldWorker = ({ saveModal }) => {
    console.log("saveModalFw", saveModal)
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [middleName, setmiddleName] = useState('');
  const [lastName, setlastName] = useState('');
  // const [selectedMenuItem, setSelectedMenuItem] = useState('Basics');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [dateofbirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [aadhar, setAadhar] = useState('');

  const scrollViewRef = useRef();
  const handleImageUpload = () => {
    //Upload image
    };
    const handleSubmit = () => {
      // Prepare data object to send in the POST request
      const data = {
        "phoneNumber": contactNumber,
        "email": emailId,
        "role": "FieldWorker",
        "firstName": firstName, 
        "middleName": middleName,
        "lastName": lastName,
        "homeAddress": address,
        "officeAddress": "Office No 405, Daffodils Colony",
        "nearestRailwayStation": "Pataudi Railway Station",
        "gender": gender,
        "taluka": {
            "id": 3
        },
        "dob": dateofbirth,
        "bloodGroup": "A-",
        "aadharNumber": aadhar
      };

      // Make POST request to your backend endpoint
      axios.post('https://36e1-103-156-19-229.ngrok-free.app/atyanidan/health/api/talukas/3/fieldworkers', data)
          .then(response => {
              // Handle success response
              console.log('Response:', response.data);
              // Show success message or perform any other actions
              Alert.alert('Success', 'Field worker added successfully!');
              // Close the modal or perform any other actions
              saveModal();
          })
          .catch(error => {
              // Handle error
              console.error('Error:', error);
              // Show error message or perform any other actions
              Alert.alert('Error', 'Failed to add field worker. Please try again later.');
              saveModal();

          });
  };

  return (
      <View style={styles.container}>        
        {/* Main Content */}
        <ScrollView ref={scrollViewRef} style={styles.mainContent} alwaysBounceVertical={false}> 
        <FieldWorkerInformation
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
          handleSubmit={handleSubmit}
          setAadhar={setAadhar}
          aadhar={aadhar}
          setGender={setGender}
          gender={gender}
          setDateOfBirth={setDateOfBirth}
          dateofbirth={dateofbirth}
          
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

export default AddFieldWorker;
