import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can choose any icon pack

const genderItems = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other'}
];

const bloodGroupItems = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
];

const FieldWorkerInformation = ({ firstName, middleName, lastName, address, contactNumber, emailId, setfirstName, setmiddleName, setlastName, setAddress, setContactNumber, setEmailId, handleImageUpload, saveModal, handleSubmit, setAadhar, aadhar, setGender, gender, setDateOfBirth, dateofbirth, setRailwayStation, railwaystation, clinicaddress, setClinicAddress, setTaluka, taluka, bloodgroup, setBloodGroup, validateField, errors, setErrors, handleSubmitOrClose, talukaList, setLangKnown3, setLangKnown2, setLangKnown1, lagknown3, lagknown2, lagknown1, specialisation, setSpecialisation, specialisationList, setSpecialisationList}) => {


  console.log("UserInfo Savemodal", saveModal)  
  return (
        <View>
          <View style={styles.headerContainer}>
          <View style={styles.row}>
          {/* <Icon name="add-circle-outline" size={24} color="#007AFF" style={styles.iconStyle} /> */}
          <Text style={styles.headerText}>Add Doctor</Text>
            <TouchableOpacity onPress={handleSubmitOrClose}>
            <Text style={styles.backbutton}>Back</Text>
          </TouchableOpacity>
          </View>
          </View>
          <Text style={{fontStyle: 'italic', color:'red', marginTop:10, marginLeft:20}}>*Fields marked with asterisk are required </Text>
            <Text style={styles.fsectionHeading}>Personal Information</Text>
            {/* <Text style={styles.sectionTitle}>Registration Number: A3982 </Text> */}
            <Text style={styles.sectionTitle}>Name*</Text>
            <View style={styles.nameContainer}>
            <TextInput
                style={[styles.input, styles.inputSpacing, errors.firstName ? styles.inputError : null]}
                value={firstName}
                onChangeText={(value) => {
                    setfirstName(value);
                    validateField('firstName', value);
                }}
                placeholder="First Name"
            />
                {errors.firstName 
                // && (
                    // <Icon name="exclamation-circle" size={20} color="red" style={styles.errorIcon} />
                  // )
                  }               
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value={middleName}
                onChangeText={(mname) => setmiddleName(mname)}
                placeholder="Middle Name (optional)"
                // editable={false}
                />
                <TextInput
                style={[styles.input, styles.inputSpacing, errors.lastName ? styles.inputError : null]}
                value={lastName}
                onChangeText={(lname) => {setlastName(lname); validateField('lastName', lname);}}
                placeholder="Last Name"
                // editable={false}
                />
                {errors.lastName}
            </View>
            <Text style={styles.sectionTitle}>Address*</Text>
            <TextInput
                style={[styles.input, errors.address ? styles.inputError : null]}
                value={address}
                onChangeText={(addr) => { setAddress(addr);
                    validateField('address', addr);
                }}
            />
            {errors.address}        
            
            <View style={styles.formContainer}>
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth*</Text>
                
                <TextInput
                  style={[styles.input, styles.inputSpacing, errors.dateofbirth ? styles.inputError : null]}
                  value={dateofbirth}
                  onChangeText={(dob) => {
                      setDateOfBirth(dob);
                      validateField('dateofbirth', dob);
                  }}
                  placeholder="YYYY-MM-DD"
              />
              {errors.dateofbirth && <Text style={styles.errorText}>Date of birth must be in YYYY-MM-DD format.</Text>}
                  
                </View>
                <View style={[styles.inputContainer, errors.gender ? styles.inputError : null]}>
                  <Text style={styles.label}>Gender*</Text>
                  <Dropdown
                  style={[styles.dropdown, errors.gender ? styles.inputError : null]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={genderItems}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  value={gender}
                  onChange={item => {
                    setGender(item.value);
                    validateField('gender', item.value);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign style={styles.icon} name="user" size={20} color="#000" />
                  )}
                />
                {errors.gender}       
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                <Text style={styles.label}>Blood Group</Text>
                {/* <TextInput 
                    style={[styles.input, styles.inputSpacing]} 
                    value={bloodgroup}
                    onChangeText={(bgrp) => setBloodGroup(bgrp)}

                    // editable={false}
                /> */}
                <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={bloodGroupItems}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Blood Group"
                value={bloodgroup}
                onChange={item => {
                  setBloodGroup(item.value);
                }}
                renderLeftIcon={() => (
                  <AntDesign style={styles.icon} name="hearto" size={20} color="#000" />
                )}
              />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Taluka*</Text>
                <Dropdown
                style={[styles.dropdown, errors.taluka ? styles.inputError : null]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={talukaList.map(taluka => ({
                  label: taluka.name,
                  value: taluka.id
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Taluka"
                value={taluka}
                onChange={talu => {
                  setTaluka(talu.value);
                }}
                // renderLeftIcon={() => (
                //   // <AntDesign style={styles.icon} name="hearto" size={20} color="#000" />
                // )}
                />
                { errors.taluka }
                </View>
            </View>
            <Text style={styles.contacttitle}>Languages Known</Text>
            <View style={styles.LnameContainer}>
                <TextInput
                style={[styles.input, styles.inputSpacing, errors.lagknown1 ? styles.inputError : null]}
                value={lagknown1}
                onChangeText={(lk1) => { setLangKnown1(lk1);
                    validateField('lagknown1', lk1);
                }}
                placeholder="Required"
            />
            {errors.lagknown1}   
                
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value={lagknown2}
                onChangeText={setLangKnown2}
                placeholder=""
                // editable={false}
                />
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value={lagknown3}
                onChangeText={setLangKnown3}
                placeholder=""
                // editable={false}
                />
            </View>
            
            <Text style={styles.sectionHeading}>Contact Information</Text>

            {/* <Text style={styles.contacttitle}>Contact Number*</Text>
            <TextInput
            style={[styles.input, styles.inputSpacing, errors.contactNumber ? styles.inputError : null]}
            value={contactNumber}
            onChangeText={(cno) => {setContactNumber(cno); validateField('contactNumber', cno);}}
            // editable={false}
            />
            {errors.contactNumber}   */}
            <TextInput
                style={[styles.input, styles.inputSpacing, errors.contactNumber ? styles.inputError : null]}
                value={contactNumber}
                onChangeText={(number) => {
                    setContactNumber(number);
                    validateField('contactNumber', number);
                }}
                keyboardType="phone-pad" // Ensures numerical input
                placeholder="Contact Number*"
            />
            {errors.contactNumber && <Text style={styles.errorText}>Contact number must be an integer and should be 10 digits long.</Text>}

            <Text style={styles.contacttitle}>Email ID*</Text>
            {/* <TextInput
            style={[styles.input, styles.inputSpacing, errors.emailId ? styles.inputError : null]}
            value={emailId}
            onChangeText={(email) => {setEmailId(email); validateField('emailId', email);}}
            />
            {errors.emailId}   */}
            <TextInput
              style={[styles.input, styles.inputSpacing, errors.emailId ? styles.inputError : null]}
              value={emailId}
              onChangeText={(email) => {
                  setEmailId(email);
                  validateField('emailId', email);
              }}
              placeholder="Email ID*"
          />
          {errors.emailId && <Text style={styles.errorText}>Email must be a Gmail address (example@gmail.com)</Text>}

            <Text style={styles.sectionHeading}>Clinic Information</Text>
            <View style={[styles.inputContainer, errors.specialisation ? styles.inputError : null]}>
                  <Text style={styles.label}>Specialisation*</Text>
                  <Dropdown
                  style={[styles.dropdown, errors.taluka ? styles.inputError : null]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={specialisationList.map(speciali => ({
                    label: speciali.name,
                    value: speciali.id
                  }))}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Specialisation"
                  value={specialisation}
                  onChange={spc => {
                    setSpecialisation(spc.value);
                  }}
                  />
                  { errors.specialisation }     
              </View>
            <Text style={styles.contacttitle}>Clinic Address*</Text>
            <TextInput
                    style={[styles.input, styles.inputSpacing, errors.clinicaddress ? styles.inputError : null]}
                    value={clinicaddress}
                    onChangeText={(cliadd) => { setClinicAddress(cliadd);
                        validateField('clinicaddress', cliadd);
                       }}
                />
                {errors.clinicaddress}  
            <Text style={styles.contacttitle}>Nearest Railway Station:</Text>
            <TextInput
            style={[styles.input, styles.inputSpacing]}
            value={railwaystation}
            onChangeText={(nrail) => setRailwayStation(nrail)}

            // editable={false}
            />
            <Text style={styles.sectionHeading}>Employee ID Proof</Text>
            <Text style={styles.contacttitle}>Aadhar Number*:</Text>
            <TextInput
              style={[styles.input, styles.inputSpacing, errors.aadhar ? styles.inputError : null]}
              value={aadhar}
              onChangeText={(addhno) =>{ setAadhar(addhno);
                validateField('address', addhno);}}
              keyboardType="phone-pad"
            />
            {errors.aadhar && <Text style={styles.errorText}>Aadhar number must be an integer and should be 12 digits long.</Text>} 

            <Text style={styles.contacttitle}>Add / Change Image</Text>
            <View style={styles.imageUploadContainer}>
            <View style={styles.filePlaceholder}>
                <Text>No file selected</Text>
            </View>
            <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    // Define styles for the component
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    sidebar: {
      width: 300, 
      backgroundColor: '#ddd',
      paddingTop: 20,
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 20,
      marginBottom: 10,
      marginLeft: 20,
    },
    LnameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 20,
      marginBottom: 10,
      marginLeft: 0,
    },
    menuItem: {
      fontSize: 18,
      paddingVertical: 10,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#d1d1d1',
    },
    selectedMenuItem: {
      fontSize: 18,
      paddingVertical: 10,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#d1d1d1',
      backgroundColor: '#ADD8E6', 
    },
    mainContent: {
      flex: 1,
      backgroundColor: '#fff',
    },
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
      borderRadius: 8,
    },
    uploadButton: {
      backgroundColor: '#ddd',
      padding: 10,
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
    },
    footer: {
      backgroundColor: '#003366', 
      padding: 10,
    },
    footerText: {
      color: '#ffffff',
      textAlign: 'left',
      fontSize: 14,
    },
    imageUploadContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 0,
      marginRight: 20,
      marginTop: 5,
    },
    filePlaceholder: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10, 
      borderRadius: 8,
    },
    uploadButton: {
      backgroundColor: '#ddd',
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadButtonText: {
      color: 'black', 
      fontWeight: 'bold',
    },
    saveButton: {
      backgroundColor: 'black', 
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10, 
      marginLeft: 0,
      marginRight: 20,
    },
    saveButtonText: {
      color: 'white', 
      fontWeight: 'bold',
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
    backbutton: {
      backgroundColor: '#ddd',
      fontSize: 15,
      fontWeight: 'bold',
      borderWidth: 2,
      borderColor: 'black',
      paddingVertical: 8,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginRight: 20,
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
    infoTitle: {
      fontWeight: 'bold', 
      fontSize: 16,
    },
    infoContent: {
      fontSize: 16, 
      color: 'grey', 
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
    uploadButton: {
      backgroundColor: '#ddd',
      padding: 10,
      alignItems: 'center',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    errorText: {
      color: 'red', // Error message color
      marginBottom: 10, // Space before the next input
      marginTop: 5,
    },
    fieldContainer: {
      // flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight: 20,
      marginBottom: 10,
      marginLeft: 0,
    },
    inputError: {
      borderColor: 'red', // Highlight inputs with errors
    },
    errorIcon: {
      // position: 'absolute', // Position inside the input field
      right: 10,
      top: 10, // Adjust based on the input field's height
    },
    iconStyle: {
      marginRight: 10, // Gives some space between the icon and the text
    },
    headerText: {
      marginTop:15,
      marginLeft: 20,
      fontSize: 23,
      fontWeight: 'bold',
      color: 'black', // iOS system blue color
    },
    headerContainer: {
      // flexDirection: 'row',
      // alignItems: 'center',
      paddingVertical: 3, // Reduced padding
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#DFF4F3', // A light grey background
      borderBottomWidth: 1,
      borderColor: 'black', // Slight border for the bottom
    },
});

export default FieldWorkerInformation;
