// ProfilePhotoModal.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  SafeAreaView
} from "react-native";
import axios from "axios";
import { API_PATHS } from "../constants/apiConstants";
import { useAuth } from "../Context/AuthContext";
import PatientDetails from "./PatientDetails";
import AppHeader from "../components/AppHeader";

const AddPatient = ({ saveModal, doctorId , onRefresh}) => {
  const { authToken } = useAuth();
  const [abhaNumber, setAbhaNumber] = useState(""); // State variable to store ABHA number
  const [navigate, setNavigate] = useState(false);
  const [patientData, setPatientData] = useState(null); // State to store API response

  // const refreshList = () => {
  //   axios.get(API_PATHS.GET_LIST_OF_PATIENTS.replace(':DoctorNumber', doctorId), {
  //     headers: { Authorization: `Bearer ${authToken}` }
  //   })
  //   .then(response => {
  //     setData(response.data);
  //     console.log("Data refreshed");
  //   })
  //   .catch(error => console.error('Error refreshing data:', error));
  // };

  // useEffect(() => {
  //   refreshList();  // Initial load and setup refresh mechanism
  // }, [authToken, doctorId]); 

  const handleSubmit = async () => {
    console.log("handleSubmit called"); // Add this line
    const fieldworkersByDoctors = API_PATHS.POST_ABHAID_OF_PATIENT;
    const data = abhaNumber;
    axios
      .post(fieldworkersByDoctors, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        // Alert.alert("Success", "Redirecting...!");
        // saveModal();
        setPatientData(response.data); 
        setNavigate(true);
      })
      .catch((error) => {
        if (error.response) {
          const message =
            error.response.data.message ||
            "Our Server is down. Please try again later";
          Alert.alert("Error", message);
          setNavigate(true);
          saveModal();
        } else {
          console.error("Error:", error);
          Alert.alert("Error", "Failed to add Doctor. Please try again later.");
          setNavigate(true);
          saveModal();
        }
      });
  };
  return (
    <View style={styles.centeredView}>
      {navigate ? (
        <SafeAreaView style={styles.safeArea}>
        <AppHeader />
        <PatientDetails patientData={patientData} doctorId={doctorId} onBack={() => {
          setNavigate(false);
          saveModal(); // Call saveModal here
          onRefresh();
        }} />
        </SafeAreaView>
      ) : (
        <>
          <View style={styles.modalView}>
            <Text style={styles.label}>Enter ABHA Number:</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={abhaNumber}
              onChangeText={(text) => setAbhaNumber(text)}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleSubmit}
                >
                  <Text style={styles.textStyle}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCancel]}
                  onPress={saveModal}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
          </View>
        </>
      )}
    </View>
  );
};

//   return (

//       // <View style={styles.centeredView}>
//       //     <View style={styles.modalView}>
//       //     <Text style={styles.label}>Enter ABHA Number:</Text>
//       //     <TextInput
//       //     style={styles.input}
//       //     placeholder=""
//       //     value={abhaNumber}
//       //     onChangeText={text => setAbhaNumber(text)}
//       //   />
//       //       <TouchableOpacity
//       //         style={[styles.button, styles.buttonClose]}
//       //       >
//       //         <Text style={styles.textStyle} onPress={handleSubmit}>Add</Text>
//       //       </TouchableOpacity>
//       //     </View>
//       //   </View>
//   );
// };

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 2,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%', 
    height: '100%',
    resizeMode: 'cover',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "30%",
    height: "30%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width: 150,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: "#ADD8E6",
  },
  profileImageModal: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderColor: "black",
    borderWidth: 2,
    resizeMode: "contain",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // This will distribute space evenly around the buttons
    alignItems: 'center',  // Align items vertically
    marginTop: 10,  // Add margin at the top if necessary
  },

  buttonCancel: {
    backgroundColor: "red",  // Example for a different button color
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
});

export default AddPatient;
