import React, { useState, useRef, useEffect } from 'react';
// import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import FormSkeleton from './FormSkeleton'; 
// import axios from 'axios';
// import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext'; // Adjust the import path as needed
// import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, TextInput, Button, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from 'react-native-elements';


const CustomCheckbox = ({ labelValue, index }) => {
    return (
        <View style={styles.checkboxContainer} key={`${labelValue}-${index}`}>
            <CheckBox
                value={false}
                style={styles.checkbox}
                disabled={true}
            />
            <Text style={styles.label}>{labelValue}</Text>
        </View>
    );
};

const CustomRadioButton = ({ labelValue, index }) => {
    return (
        <View style = {styles.radiowrapper} key={`${labelValue}-${index}`}>
        <View style={styles.radio}></View>
        <Text style={styles.radioText}>{labelValue}</Text>
        </View>
    );
};
  
const optionTypeList = [
    { label: 'Multiple choice', value: 'MultiSelect' },
    { label: 'Checkboxes', value: 'CheckBox' },
];

const AddForm = ({ saveModal }) => {
  console.log("saveForm", saveModal)
  const { authToken } = useAuth(); // Accessing the authToken
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quesText, setQuesText] = useState('');
  const [optionType, setOptionType] = useState('');
  const [quesValue, setQuesValue] = useState('');
  const [quesValues, setQuesValues] = useState([]);
  const [quesList, setQuesList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollViewRef = useRef();

    const handleTitleChange = (inputText) => {
        setTitle(inputText);
    };

    const handleDescriptionChange = (inputText) => {
        setDescription(inputText);
    };

    const handleQuesText = (inputText) => {
        setQuesText(inputText);
    };
    const addQuesValues = () => {
        if (quesValue) {
            setQuesValues(prevValues => [...prevValues, quesValue]);
            setQuesValue('')
        }
    }
    const handleSaveFormData = () => {
        const formData = {};
        formData.title = title;
        formData.description = description;
        formData.quesList = quesList;
        //console.log("form Data quesList", formData.quesList);
        console.log("form Data Saved", formData);
        setTitle('');
        setDescription('');
        setQuesList([]);
    }

    const handleSaveQuestions = () => {

        if (quesText && optionType && quesValues) {
            const quesObj = {};
            quesObj.number = `Question${quesList.length + 1}`;
            quesObj.quetion = quesText;
            quesObj.optionType = optionType;
            quesObj.values = quesValues;
            setQuesList(prevValues => [...prevValues, quesObj]);
        }
        setIsModalVisible(false);
        setQuesText('');
        setQuesValue('');
        setQuesValues('');
        setOptionType('');
    }
    useEffect(() => {
        //console.log("quesList", quesList);
    }, [quesList])

    const removeItem = index => {
        const newItems = [...quesValues];
        newItems.splice(index, 1);
        setQuesValues(newItems);
    };
  
      
  const handleSubmitOrClose = () => {
    saveModal();
  };

    // const handleSubmit = async () => {
    //   console.log("handleSubmit called"); // Add this line

    //   const fieldsToValidate = {firstName, lastName, address, dateofbirth, gender, aadhar, emailId, contactNumber, taluka, lagknown1, specialisation, clinicaddress}; // Extend this with more fields as needed
    //   let isValid = true;

    //   // Validate each field in the list
    //   Object.keys(fieldsToValidate).forEach(fieldName => {
    //       isValid = !validateField(fieldName, fieldsToValidate[fieldName]) && isValid;
    //   });

    //   if (!isValid) {
    //     console.log("form is not valid")
    //       return; // Stop the submission if any field is invalid
    //   }
    //   console.log("correct called"); // Add this line

    //   // Reset the errors if all validations pass
    //   setErrors({});

    //   const data = {
    //     "phoneNumber": contactNumber,
    //     "email": emailId,
    //     "role": "Doctor",
    //     "firstName": firstName, 
    //     "middleName": middleName,
    //     "lastName": lastName,
    //     "homeAddress": address,
    //     "hospitalAddress": clinicaddress,
    //     "nearestRailwayStation": railwaystation,
    //     "gender": gender,
    //     "taluka": {
    //         "id": taluka
    //     },
    //     "dob": dateofbirth,
    //     "bloodGroup": bloodgroup,
    //     "aadharNumber": aadhar,
    //     "languageKnown1": lagknown1,
    //     "languageKnown2": lagknown2,
    //     "languageKnown3": lagknown3,
    //     "specialisation": {
    //       "id": specialisation
    //     }
    //   };
      
    //   const fieldworkersByDoctors = API_PATHS.POST_DOCTORS_BY_DISTRICTS.replace(':talukaId', taluka);
    //   axios.post(fieldworkersByDoctors, data, {
    //     headers: {
    //       Authorization: `Bearer ${authToken}`, 
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //       .then(response => {
    //           console.log('Response:', response.data);
    //           Alert.alert('Success', 'Doctor added successfully!');
    //           saveModal();
    //       })
    //       .catch(error => {
            // if (error.response && error.response.status === 409) {
            //   // Here you can extract more details if your API sends specific messages for email vs phone
            //   Alert.alert('Error', 'Phone number or email already exists.');
            //   // Alert.alert(error.response)
            // }
            // else if (error.response && error.response.status === 500){
            //   Alert.alert('Server Error', 'Our Server is down. Please try again later');
            // }
            // else{
            //   // Handle error
            //   console.error('Error:', error);
            //   // Show error message or perform any other actions
            //   Alert.alert('Error', 'Failed to add Doctor. Please try again later.');
            //   saveModal();
            // }
        //     if (error.response) {
        //       const message = error.response.data.message || "Our Server is down. Please try again later";
        //       Alert.alert('Error', message);
        //     } else {
        //       console.error('Error:', error);
        //       Alert.alert('Error', 'Failed to add Doctor. Please try again later.');
        //     }
        //   });
          
//   };

  return (
      <View style={styles.container}>        
        {/* Main Content */}
        
        <ScrollView ref={scrollViewRef} style={styles.mainContent} alwaysBounceVertical={false}> 
        <FormSkeleton
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          quesText={quesText}
          setQuesText={setQuesText}
          optionType={optionType}
          setOptionType={setOptionType}
          quesValue={quesValue}
          setQuesValue={setQuesValue}
          quesValues={quesValues}
          setQuesValues={setQuesValues}
          quesList={quesList} // Pass handleImageUpload as a prop
          setQuesList={setQuesList}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          CustomCheckbox={CustomCheckbox}
          CustomRadioButton={CustomRadioButton}
          optionTypeList={optionTypeList}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}
          handleQuesText={handleQuesText}
          addQuesValues={addQuesValues}
          handleSaveFormData={handleSaveFormData}
          handleSaveQuestions={handleSaveQuestions}
          removeItem = {removeItem}
          handleSubmitOrClose = {handleSubmitOrClose}
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

export default AddForm;
