// ProfileInformationSection.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserInformation = ({ firstName, middleName, lastName, address, contactNumber, emailId, setfirstName, setmiddleName, setlastName, setAddress, setContactNumber, setEmailId, handleImageUpload, saveModal}) => {
  console.log("UserInfo Savemodal", saveModal)  
  return (
        <View>
            <Text style={styles.fsectionHeading}>Personal Information</Text>
            {/* <Text style={styles.sectionTitle}>Registration Number: A3982 </Text> */}
            <Text style={styles.sectionTitle}>Name</Text>
            <View style={styles.nameContainer}>
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value={firstName}
                onChangeText={setfirstName}
                placeholder="First Name"
                // editable={false}
                />
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value={middleName}
                onChangeText={setmiddleName}
                placeholder="Middle Name"
                // editable={false}
                />
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value={lastName}
                onChangeText={setlastName}
                placeholder="Last Name"
                // editable={false}
                />
            </View>
            <Text style={styles.sectionTitle}>Address</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                // editable={false}
            />
            <Text style={styles.sectionTitle}>Specialization</Text>
            <TextInput
                style={styles.input}
                value="Cardiac Surgeon"
                onChangeText={setAddress}
                // editable={false}
            />
            <View style={styles.formContainer}>
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Birth:</Text>
                <TextInput 
                    style={[styles.input, styles.inputSpacing]} 
                    value="20"
                    // editable={false}
                />
                </View>
                <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender:</Text>
              <TextInput 
                style={[styles.input, styles.inputSpacing]} 
                value="Male"
                // editable={false}
              />
            </View>
            </View>
            <Text style={styles.contacttitle}>Languages Known</Text>
            <View style={styles.LnameContainer}>
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value=""
                onChangeText={setfirstName}
                placeholder="Required*"
                // editable={false}
                />
                
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value=""
                onChangeText={setmiddleName}
                placeholder=""
                // editable={false}
                />
                <TextInput
                style={[styles.input, styles.inputSpacing]}
                value=""
                onChangeText={setlastName}
                placeholder=""
                // editable={false}
                />
            </View>
            <Text style={styles.sectionHeading}>Contact Information</Text>

            <Text style={styles.contacttitle}>Contact Number</Text>
            <TextInput
            style={[styles.input, styles.inputSpacing]}
            value={contactNumber}
            onChangeText={setContactNumber}
            // editable={false}
            />
            <Text style={styles.contacttitle}>Email ID</Text>
            <TextInput
            style={[styles.input, styles.inputSpacing]}
            value={emailId}
            // editable={false}
            />
            <Text style={styles.sectionHeading}>Clinic Information</Text>
            <Text style={styles.contacttitle}>Clinic Address:</Text>
            <TextInput
            style={[styles.input, styles.inputSpacing]}
            value=""
            // editable={false}
            />
            <Text style={styles.contacttitle}>Add / Change Image</Text>
            <View style={styles.imageUploadContainer}>
            <View style={styles.filePlaceholder}>
                <Text>No file selected</Text>
            </View>
            <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={saveModal} style={styles.saveButton}>
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
});

export default UserInformation;
