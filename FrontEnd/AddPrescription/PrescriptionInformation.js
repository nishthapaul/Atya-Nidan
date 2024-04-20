import React from "react";
import { Table, Row, Rows } from "react-native-table-component";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import FIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons"; // You can choose any icon pack

const FieldWorkerInformation = ({
  name,
  saveModal,
  handleSubmit,
  gender,
  age,
  errors,
  setErrors,
  handleSubmitOrClose,
  FormList,
  ICDList,
  doctorId,
  height,
  weight,
  setHeight,
  setWeight,
  datetoday,
  interval,
  setInterval,
  repeatFrequency,
  setRepeatFrequency,
  notes,
  setNotes,
  dosages,
  setDosages,
  handleDosageChangehandleDosageChange,
  addNewRow
}) => {
  console.log("UserInfo Savemodal", saveModal);
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <Text style={styles.headerText}>Add Prescription</Text>
          <TouchableOpacity onPress={handleSubmitOrClose}>
            <Text style={styles.backbutton}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Text>Doctor ID: {doctorId}</Text>
        <View style={styles.patientInfo}>
          <Text>Patient's Name: {name}</Text>
          <Text>Age: {age}</Text>
          <Text>Sex: {gender}</Text>
          <Text style={styles.sectionTitle}>Weight:</Text>
          <TextInput
            value={weight}
            onChangeText={(wgt) => {
              setWeight(wgt);
            }}
          />
          <Text style={styles.sectionTitle}>Height:</Text>
          <TextInput
            value={height}
            onChangeText={(hgt) => {
              setHeight(hgt);
            }}
          />
          <Text>Date: {dateFormatted}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addNewRow}>
          <Text>Add New Row</Text>
        </TouchableOpacity>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={["Days", "Dosage", "M", "A", "N"]}
            style={styles.head}
            textStyle={styles.text}
          />
          {dosages.map((item, index) => (
            <Row
              key={index}
              data={[
                <TextInput
                  value={item.days.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "days")
                  }
                  // Other TextInput props
                />,
                <TextInput
                  value={item.name}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "name")
                  }
                  // Other TextInput props
                />,
                <TextInput
                  value={item.morningDose.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "morningDose")
                  }
                  // Other TextInput props
                />,
                <TextInput
                  value={item.afternoonDose.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "afternoonDose")
                  }
                  // Other TextInput props
                />,
                <TextInput
                  value={item.eveningDose.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "eveningDose")
                  }
                  // Other TextInput props
                />,
              ]}
              // Other Row props
            />
          ))}
        </Table>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  // Define styles for the component
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 300,
    backgroundColor: "#ddd",
    paddingTop: 20,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  LnameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 0,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
  },
  selectedMenuItem: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
    backgroundColor: "#ADD8E6",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  sectionTitle: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  contacttitle: {
    fontSize: 18,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  sectionHeading: {
    fontSize: 23,
    marginLeft: 0,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#003366",
  },
  fsectionHeading: {
    fontSize: 23,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#003366",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    flex: 1,
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: "#ddd",
    padding: 10,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  footer: {
    backgroundColor: "#003366",
    padding: 10,
  },
  footerText: {
    color: "#ffffff",
    textAlign: "left",
    fontSize: 14,
  },
  imageUploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 0,
    marginRight: 20,
    marginTop: 5,
  },
  filePlaceholder: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 0,
    marginRight: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
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
    height: "60%",
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
  backbutton: {
    backgroundColor: "#ddd",
    fontSize: 15,
    fontWeight: "bold",
    borderWidth: 2,
    borderColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 20,
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
  infoTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  infoContent: {
    fontSize: 16,
    color: "grey",
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 18,
  },
  box: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
  },
  uploadButton: {
    backgroundColor: "#ddd",
    padding: 10,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
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
    color: "red", // Error message color
    marginBottom: 10, // Space before the next input
    marginTop: 5,
  },
  fieldContainer: {
    // flexDirection: 'row',
    justifyContent: "space-between",
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 0,
  },
  inputError: {
    borderColor: "red", // Highlight inputs with errors
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
    marginTop: 15,
    marginLeft: 20,
    fontSize: 23,
    fontWeight: "bold",
    color: "black", // iOS system blue color
  },
  headerContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    paddingVertical: 3, // Reduced padding
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#DFF4F3", // A light grey background
    borderBottomWidth: 1,
    borderColor: "black", // Slight border for the bottom
  },
});

export default FieldWorkerInformation;
