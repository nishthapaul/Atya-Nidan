import React, { useState, useRef, useEffect } from "react";
import { Alert, ScrollView, View, StyleSheet } from "react-native";
import axios from "axios";
import { API_PATHS } from "../constants/apiConstants";
import { useAuth } from "../Context/AuthContext"; // Adjust the import path as needed
import PrescriptionInformation from "./PrescriptionInformation";

const AddPrescription = ({ saveModal, user, doctorId, onRefresh }) => {
  console.log("saveModalFw", saveModal);
  const { authToken } = useAuth();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [interval, setInterval] = useState("");
  const [repeatFrequency, setRepeatFrequency] = useState("");
  const [notes, setNotes] = useState("");
  const [icdCode, seticdCode] = useState("");
  const [formTitle, setformTitle] = useState("");

  const [errors, setErrors] = useState({});
  const [ICDList, setICDList] = useState([]); // State to hold fetched taluka list
  const [FormList, setFormList] = useState([]); // State to hold fetched taluka list

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const today = new Date();
  const day = today.getDate(); // will give you the day of the month
  const month = today.getMonth() + 1; // will give you the month (0-11, so add 1 to get 1-12)
  const year = today.getFullYear(); // will give you the year

  // If you want to display it as day/month/year, you can do the following:
  const dateFormatted = `${day}/${month}/${year}`;
  const age = calculateAge(user.demographic.dob);
  const name = `${user.demographic.firstName}${
    user.demographic.middleName ? " " + user.demographic.middleName : ""
  } ${user.demographic.lastName}`;
  const gender = user.demographic.gender;

  const [dosages, setDosages] = useState([
    { name: "", days: "", morningDose: "", afternoonDose: "", eveningDose: "" },
    // { name: "", days: "", morningDose: "", afternoonDose: "", eveningDose: "" },
    // { name: "", days: "", morningDose: "", afternoonDose: "", eveningDose: "" },
  ]);

  const addNewRow = () => {
    setDosages([
      ...dosages,
      {
        name: "",
        days: "",
        morningDose: "",
        afternoonDose: "",
        eveningDose: "",
      },
    ]);
  };

  const handleDosageChange = (text, index, type) => {
    const newDosages = [...dosages];
    newDosages[index][type] = text;
    setDosages(newDosages);
  };
  // const handleDosageChange = (text, index, type) => {
  //   const newDosages = [...dosages];
  //   // Convert text to a number if the input type should be a number
  //   // const value = type === 'days' ? parseInt(text, 10) : parseInt(text, 10);
  //   const updatedDosage = { ...newDosages[index] };
  //   newDosages[index] = updatedDosage;
  //   setDosages(newDosages);
  // };

  const scrollViewRef = useRef();
  // setErrors(prevErrors => ({...prevErrors, [fieldName]: `${fieldName} is required`}));
  useEffect(() => {
    const fetchICDList = async () => {
      try {
        const ICDResponse = await axios.get(API_PATHS.GET_ICDCODE_LIST, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Using authToken for authentication
          },
        });
        setICDList(ICDResponse.data);
      } catch (error) {
        console.log("Error fetching taluka list:", error);
      }
    };
    fetchICDList();
  }, []);

  useEffect(() => {
    const fetchformList = async () => {
      try {
        const formResponse = await axios.get(API_PATHS.GET_FORMS_LIST, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Using authToken for authentication
          },
        });
        setFormList(formResponse.data);
      } catch (error) {
        console.log("Error fetching taluka list:", error);
      }
    };
    fetchformList();
  }, []);

  //     const validateField = (fieldName, value) => {
  //       let hasError = false;
  //       if (fieldName === 'taluka') {
  //         // Ensure that taluka is not empty and is an integer
  //         if (value === '' || isNaN(value) || parseInt(value, 10) !== Number(value)) {
  //           hasError = true;
  //         }
  //       }
  //       else{
  //       // Checking for non-empty values for all fields
  //       if (!value.trim()) {
  //           hasError = true;
  //       }
  //       // Specific validation for the email field
  //       else if (fieldName === 'emailId' && !value.endsWith('@gmail.com')) {
  //           hasError = true;
  //       }
  //       // Specific validation for the contact number field
  //       else if (fieldName === 'contactNumber') {
  //           // Regex to check if the contact number contains exactly 10 digits
  //           const phoneNumberRegex = /^\d{10}$/;
  //           if (!phoneNumberRegex.test(value)) {
  //               hasError = true;
  //           }
  //       }

  //       else if (fieldName === 'aadhar') {
  //         // Regex to check if the contact number contains exactly 10 digits
  //         const aadharNumberRegex = /^\d{12}$/;
  //         if (!aadharNumberRegex.test(value)) {
  //             hasError = true;
  //         }
  //     }

  //     else if (fieldName === 'dateofbirth') {
  //       const dateRegex = /^\d{4}-(\d{2})-(\d{2})$/;
  //       const matches = value.match(dateRegex);

  //       if (matches) {
  //           const year = parseInt(matches[0], 10);
  //           const month = parseInt(matches[1], 10);
  //           const day = parseInt(matches[2], 10);

  //           const dateIsValid = year > 0 &&
  //                               month >= 1 && month <= 12 &&
  //                               day >= 1 && day <= 31 &&
  //                               !isNaN(Date.parse(value));

  //           if (!dateIsValid) {
  //               hasError = true;
  //           }
  //       } else {
  //           hasError = false;
  //       }
  //   }
  // }
  //       setErrors(prevErrors => {
  //           const newErrors = { ...prevErrors };
  //           if (hasError) {
  //               // Set error
  //               newErrors[fieldName] = true;
  //           } else {
  //               // Clear error for this field
  //               // newErrors[fieldName] = false;
  //               delete newErrors[fieldName];
  //           }
  //           return newErrors;
  //       });
  //       return hasError
  //   };

  const handleSubmitOrClose = () => {
    saveModal();
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called"); // Add this line

    //   const fieldsToValidate = {firstName, lastName, address, dateofbirth, gender, officeaddress, aadhar, emailId, contactNumber, taluka, lagknown1}; // Extend this with more fields as needed
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

    const data = {
      "formTitle": formTitle,
      "patientNumber": user.patientNumber,
      "doctorId" : doctorId,
      "followUpDetails": {
        "interval": parseInt(interval, 10),
        "repeatFrequency": parseInt(repeatFrequency, 10)
      },
      "prescriptionDetails": {
          "age": age,
          "height": height,
          "weight": weight,
          "dosages": dosages
      },
      "notes": notes,
      "icdCode": icdCode
    };
    
    const prescriptionresponse = API_PATHS.POST_PRESCRIPTION_RESPONSE;
    axios
      .post(prescriptionresponse, data, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the token here
          "Content-Type": "application/json",
        },
        
      })
      .then((response) => {
        // Handle success response
        console.log("Response:", response.data);
        Alert.alert("Success", "Prescription submitted successfully!");
        // Close the modal or perform any other actions
        saveModal();
        onRefresh();
      })
      .catch((error) => {
        if (error.response) {
          // Extracting the message sent from the backend
          const message =
            error.response.data.message ||
            "Our Server is down. Please try again later";
          Alert.alert("Error", message);
        } else {
          console.error("Error:", error);
          // Alert.alert('Error', 'Failed to add Field Worker. Please try again later.');
        }
      });
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}

      <ScrollView
        ref={scrollViewRef}
        style={styles.mainContent}
        alwaysBounceVertical={false}
      >
        <PrescriptionInformation
          name={name}
          saveModal={saveModal}
          handleSubmit={handleSubmit}
          gender={gender}
          age={age}
          errors={errors}
          setErrors={setErrors}
          handleSubmitOrClose={handleSubmitOrClose}
          FormList={FormList}
          ICDList={ICDList}
          doctorId={doctorId}
          height={height}
          weight={weight}
          setHeight={setHeight}
          setWeight={setWeight}
          dateFormatted={dateFormatted}
          interval={interval}
          setInterval={setInterval}
          repeatFrequency={repeatFrequency}
          setRepeatFrequency={setRepeatFrequency}
          notes={notes}
          setNotes={setNotes}
          dosages={dosages}
          setDosages={setDosages}
          handleDosageChange={handleDosageChange}
          addNewRow={addNewRow}
          icdCode={icdCode}
          seticdCode={seticdCode}
          formTitle={formTitle}
          setformTitle={setformTitle}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default AddPrescription;
