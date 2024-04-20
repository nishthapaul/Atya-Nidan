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
  icdCode,
  seticdCode,
  formTitle,
  setformTitle,
}) => {
  console.log("UserInfo Savemodal", saveModal);

  const formDropdownData = FormList.map((form) => ({
    label: form.title,
    value: form.title,
  }));

  const icdDropdownData = ICDList.map((icd) => ({
    label: icd.description,
    value: icd.code,
  }));

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
              <Text style={styles.detailLabel}>kg</Text>
            </View>
            <View style={styles.detailInputContainer}>
              <Text style={styles.detailLabel}>Height:</Text>
              <TextInput
                style={styles.underlineInput}
                value={height}
                onChangeText={setHeight}
              />
              <Text style={styles.detailLabel}>cm</Text>
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

        <View style={styles.notesFollowUpContainer}>
          <View style={styles.extraNotesContainer}>
            <Text style={styles.extraNotesTitle}>Extra Notes</Text>
            <TextInput
              style={styles.extraNotesInput}
              multiline
              value={notes}
              onChangeText={setNotes}
              placeholder="Type your notes here"
            />
          </View>
          <View style={styles.scheduleFollowUpContainer}>
            <Text style={styles.scheduleFollowUpTitle}>
              Schedule Follow Ups
            </Text>
            <View style={styles.dateInputContainer}>
              <Text style={styles.detailLabel}>Interval:            </Text>
              <TextInput
                style={styles.dateInput}
                value={interval}
                onChangeText={setInterval}
                placeholder=""
              />
            </View>
            <View style={styles.repeatInputContainer}>
              <Text style={styles.detailLabel}>Repeat Every:  </Text>
              <TextInput
                style={styles.dateInput}
                value={repeatFrequency}
                onChangeText={setRepeatFrequency}
                placeholder="days"
              />
            </View>
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>Forms</Text>
            <Dropdown
              style={styles.dropdown}
              data={formDropdownData}
              labelField="label"
              valueField="value"
              placeholder="Select form"
              value={formTitle}
              onChange={item => {
                setformTitle(item.value);
            }}
            />

            <Text style={styles.dropdownTitle}>ICD List</Text>
            <Dropdown
              style={styles.dropdown}
              data={icdDropdownData}
              labelField="label"
              valueField="value"
              placeholder="Select ICD"
              value={icdCode}
              onChange={item => {
                seticdCode(item.value);
            }}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
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

  saveButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
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

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 50,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#000",
  },
  head: {
    height: 50,
    backgroundColor: "#DFF4F3",
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#000",
  },
  cell: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  input: {
    borderWidth: 0,
    textAlign: "center",
    fontSize: 20,
    height: 40,
  },
  columnDays: {
    width: 148,
  },
  columnDosage: {
    width: 550,
  },

  //Notes and follow up
  notesFollowUpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
  },
  extraNotesContainer: {
    // flex: 1,
    width: 320,
    marginRight: 10, // Add some space between the columns
  },
  extraNotesTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 20,
  },
  extraNotesInput: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 10,
    minHeight: 200, // Set a min-height for the text input
    textAlignVertical: "top", // Aligns text to the top for multiline input
    marginBottom: 20,
    backgroundColor: "#f5edeb",
    fontSize: 18,
  },
  scheduleFollowUpContainer: {
    flex: 1,
    marginLeft: 100, // Add some space between the columns
  },
  scheduleFollowUpTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 20,
    marginBottom: 20,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  repeatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    width: 120, // Set a fixed width for date inputs
    marginHorizontal: 5, // Add horizontal margin for spacing
    borderRadius: 20,
  },
  dropdownContainer: {
    flex: 1,
    marginLeft: 10, // Adjust as needed
  },
  dropdownTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 20,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20, // Space between dropdowns
    backgroundColor: "#ffffff", // Optional: if you want to change dropdown background color
  },
});

export default FieldWorkerInformation;
