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
} from "react-native";
import axios from "axios";
import { API_PATHS } from "../constants/apiConstants";
import { useAuth } from "../Context/AuthContext";
import PatientDetails from "./PatientDetails";
const AddPatient = ({ saveModal }) => {
  const { authToken } = useAuth();
  const [abhaNumber, setAbhaNumber] = useState(""); // State variable to store ABHA number
  const [navigate, setNavigate] = useState(false);

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
        Alert.alert("Success", "Redirecting...!");
        // saveModal();
        setNavigate(true);
      })
      .catch((error) => {
        if (error.response) {
          const message =
            error.response.data.message ||
            "Our Server is down. Please try again later";
          Alert.alert("Error", message);
          setNavigate(true);
          // saveModal();
        } else {
          console.error("Error:", error);
          Alert.alert("Error", "Failed to add Doctor. Please try again later.");
          setNavigate(true);
          // saveModal();
        }
      });
  };
  return (
    <View style={styles.centeredView}>
      {navigate ? (
        <PatientDetails onBack={() => setNavigate(false)} />
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
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleSubmit}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
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
    width: 200,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#ADD8E6",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
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
});

export default AddPatient;
