// ProfileContent.js
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

const ProfileContent = ({
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  address,
  setAddress,
  contactNumber,
  setContactNumber,
  emailId,
  setEmailId,
  languagesKnown,
  setLanguagesKnown,
  dateOfBirth,
  setDateOfBirth,
  gender,
  setGender,
  district,
  setDistrict,
  officeAddress,
  setOfficeAddress
}) => {
  return (
      <View style={styles.container}>
        <Text style={styles.fsectionHeading}>Personal Information</Text>
        <Text style={styles.sectionTitle}>Registration Number: A3982 </Text>
          <Text style={styles.sectionTitle}>Name</Text>
          <View style={styles.nameContainer}>
          <TextInput
          style={[styles.input, styles.inputSpacing]}
          value={firstName}
          onChangeText={setFirstName} // Changed from setfirstName
          placeholder="First Name"
          editable={false}
        />
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          value={middleName}
          onChangeText={setMiddleName} // Changed from setmiddleName
          placeholder="Middle Name"
          editable={false}
        />
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          value={lastName}
          onChangeText={setLastName} // Changed from setlastName
          placeholder="Last Name"
          editable={false}
        />

          </View>
          <Text style={styles.sectionTitle}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            editable={false}
          />
          <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date of Birth:</Text>
              <TextInput 
                style={[styles.input, styles.inputSpacing]} 
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender:</Text>
              <TextInput 
                style={[styles.input, styles.inputSpacing]} 
                value={gender}
                onChangeText={setGender}
                editable={false}
              />
            </View>
          </View>
          <Text style={styles.contacttitle}>Languages Known</Text>
            <TextInput
              style={[styles.input, styles.inputSpacing]}
              value={languagesKnown}
              editable={false}
            />

        <Text style={styles.sectionHeading}>Contact Information</Text>

        <Text style={styles.contacttitle}>Contact Number</Text>
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          value={contactNumber}
          onChangeText={setContactNumber}
          editable={false}
        />
        <Text style={styles.contacttitle}>Email ID</Text>
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          value={emailId}
          onChangeText={setEmailId}
          editable={false}
        />
        <Text style={styles.sectionHeading}>Employee Office Details</Text>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>District:</Text>
              <TextInput 
                style={[styles.input, styles.inputSpacing]} 
                value={district}
                onChangeText={setDistrict}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nearest Railway Station:</Text>
              <TextInput 
                style={[styles.input, styles.inputSpacing]} 
                value='KSR'
                editable={false}
              />
            </View>
          </View>
          <Text style={styles.contacttitle}>Office Address:</Text>
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          value={officeAddress}
          onChangeText={setOfficeAddress}
          editable={false}
        />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  contacttitle: {
    fontSize: 18,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  sectionHeading:{
    fontSize: 23,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#003366'
  },
  fsectionHeading: {
    fontSize: 23,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#003366'
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    flex: 1, 
  },

  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  inputSpacing: {
    marginLeft: 4,
    marginRight: 4,
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  box: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
});

export default ProfileContent;
