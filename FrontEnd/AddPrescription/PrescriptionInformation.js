import React from "react";
import { Table, Row, Rows } from "react-native-table-component";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
  dateFormatted,
  interval,
  setInterval,
  repeatFrequency,
  setRepeatFrequency,
  notes,
  setNotes,
  dosages,
  setDosages,
  handleDosageChange,
  addNewRow,
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
        <View style={styles.patientInfo}>
          <View style={styles.patientDetailsRow}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Doctor ID::</Text>
              <Text style={styles.detailValue}>{doctorId}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>{dateFormatted}</Text>
            </View>
          </View>

          <View style={styles.patientDetailsRow}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Patient's Name:</Text>
              <Text style={styles.detailValue}>{name}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Age:</Text>
              <Text style={styles.detailValue}>{age}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailLabel}>Sex:</Text>
              <Text style={styles.detailValue}>{gender}</Text>
            </View>
            <View style={styles.detailInputContainer}>
              <Text style={styles.detailLabel}>Weight:</Text>
              <TextInput
                style={styles.underlineInput}
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            <View style={styles.detailInputContainer}>
              <Text style={styles.detailLabel}>Height:</Text>
              <TextInput
                style={styles.underlineInput}
                value={height}
                onChangeText={setHeight}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.addbutton} onPress={addNewRow}>
          <Text style={styles.addLabel}>Add New Row</Text>
        </TouchableOpacity>
        <View style={styles.tableContainer}>
        <Table style={styles.table} borderStyle={styles.tableBorder}>
          <Row
            data={["Days", "Dosage", "M", "A", "N"]}
            style={styles.head}
            textStyle={styles.text}
            widthArr={[150, 550, 150, 150, 150]}
          />
          {dosages.map((item, index) => (
            <Row
              key={index}
              data={[
                <TextInput
                  style={[styles.columnDays, styles.input]} // Combine cell and input styles
                  value={item.days.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "days")
                  }
                />,
                <TextInput
                  style={[styles.columnDosage, styles.input]}
                  value={item.name}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "name")
                  }
                />,
                <TextInput
                  style={[styles.columnDays, styles.input]}
                  value={item.morningDose.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "morningDose")
                  }
                />,
                <TextInput
                  style={[styles.columnDays, styles.input]}
                  value={item.afternoonDose.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "afternoonDose")
                  }
                />,
                <TextInput
                  style={[styles.columnDays, styles.input]}
                  value={item.eveningDose.toString()}
                  onChangeText={(text) =>
                    handleDosageChange(text, index, "eveningDose")
                  }
                />,
              ]}
              style={{ borderWidth: 1, borderColor: "#000" }} // Row border style
              textStyle={styles.text}
            />
          ))}
        </Table>
        </View>
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
  patientDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  detailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 20,
  },
  detailValue: {
    marginRight: 15, // or any other spacing you want
    fontSize: 20,
  },
  detailInput: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 5,
    width: 50, // Set the width you want for your input fields
    marginRight: 15, // Spacing between inputs, adjust as needed
  },
  underlineInput: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: "grey",
    width: 50, // Set the width as needed
    marginRight: 15, // Spacing after the input
    fontSize: 20,
  },
  addbutton: {
    backgroundColor: "#FFA62B",
    borderWidth: 2,
    borderColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginRight: 20,
    marginLeft: 14,
    marginBottom: 20,
    width: 200,
    borderRadius: 9,
  },
  addLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  //Table

  tableContainer: {
    alignSelf: 'center', // This will center the table container
    alignItems: 'center',
    marginLeft: 50,
  },

  tableBorder: {
    borderWidth: 1,
    borderColor: "#000", // Adjust the color as needed
  },

  // Header row style
  head: {
    height: 50,
    backgroundColor: '#DFF4F3', // Adjust the background color as needed
    borderWidth: 1,
    borderColor: "#000", 
    flexDirection: 'row', 
  },
  // row: { 
  //   // Define flex or width for each row cell
  //   flexDirection: 'row', // Ensures that the children (row cells) are in a row
  // },
  // Header and cell text style
  text: {
    // margin: 6,
    fontSize: 20,
    textAlign: 'center', // Center the text
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#000",
  },
  // Individual cell style
  cell: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000", // Adjust the color as needed
    padding: 10, // Adjust the padding as needed
  },

  // TextInput within cells
  input: {
    borderWidth: 0, // No border for the text input
    textAlign: 'center',
    fontSize: 20,
    height: 40
  },
  columnDays: {
    width: 148,// For example, Days takes 1 part
    // Set borderRightWidth to 0 to align with the header if needed
  },
  columnDosage: {
    width: 550, // Dosage takes 3 parts, giving it more space
    // Set borderRightWidth to 0 to align with the header if needed
  },

});

export default FieldWorkerInformation;
