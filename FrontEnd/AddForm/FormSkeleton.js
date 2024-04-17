import { Dropdown } from "react-native-element-dropdown";
// import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { CheckBox } from 'react-native-elements';

const FormSkeleton = ({
  title,
  setTitle,
  description,
  setDescription,
  quesText,
  setQuesText,
  optionType,
  setOptionType,
  quesValue,
  setQuesValue,
  quesValues,
  setQuesValues,
  quesList,
  setQuesList,
  isModalVisible,
  setIsModalVisible,
  CustomCheckbox,
  CustomRadioButton,
  optionTypeList,
  handleTitleChange,
  handleDescriptionChange,
  handleQuesText,
  addQuesValues,
  handleSaveFormData,
  handleSaveQuestions,
  removeItem,
  handleSubmitOrClose,
  handleSubmit
}) => {
  //   console.log("Form skeleton Savemodal", saveModal)
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          {/* <Icon name="add-circle-outline" size={24} color="#007AFF" style={styles.iconStyle} /> */}
          <Text style={styles.headerText}>Create Form</Text>
          <TouchableOpacity onPress={handleSubmitOrClose}>
            <Text style={styles.backbutton}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="never">
          <View style={styles.card}>
            <View style={styles.title}>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={handleTitleChange}
                placeholder="Untitled Form"
                placeholderTextColor="#888"
                autoFocus={true}
              />
              <TextInput
                style={styles.description}
                value={description}
                onChangeText={handleDescriptionChange}
                placeholder="Enter Disease Description"
                placeholderTextColor="#888"
                autoFocus={true}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={[styles.customButton, { backgroundColor: "#FFA62B" }]}
              >
                <Text style={styles.customButtonText}>Add Question</Text>
              </TouchableOpacity>
            </View>
          </View>
          {quesList &&
            quesList.map((item, index) => (
              <View style={styles.quesCard} key={`${item.number}-${index}`}>
                <View>
                  <View>
                    <Text
                      style={styles.quesStyle}
                    >{`${item.number}: ${item.question}`}</Text>
                  </View>
                  {item?.values &&
                    item.values.map((value, idx) =>
                      item.optionType == "CheckBox" ? (
                        <CustomCheckbox
                          labelValue={value}
                          key={`${item.number}-${item.optionType}-${idx}`}
                        />
                      ) : (
                        <CustomRadioButton
                          labelValue={value}
                          key={`${item.number}-${item.optionType}-${idx}`}
                        />
                      )
                    )}
                </View>
              </View>
            ))}
        </ScrollView>
        <View style={styles.buttonstyle}>
          <Button title="Save Form" onPress={handleSubmit}></Button>
        </View>

        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={styles.modal}>
            <View style={styles.modalbody}>
              <View style={styles.modalContainer}>
                <View>
                  <TextInput
                    style={styles.questionInput}
                    value={quesText}
                    onChangeText={handleQuesText}
                    placeholder="Untitled Question"
                    placeholderTextColor="#888"
                    autoFocus={true}
                  />
                </View>
                <View style={styles.secondContainer}>
                  <View style={styles.dropdown}>
                    <Dropdown
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      data={optionTypeList}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select Question Type"
                      value={optionType}
                      onChange={(item) => {
                        setOptionType(item.value);
                      }}
                    />
                  </View>
                  <View style={styles.quesValueInputContainer}>
                    <TextInput
                      style={styles.quesValueInput}
                      value={quesValue}
                      onChangeText={(inputText) => setQuesValue(inputText)}
                      placeholder="Add Question Values"
                      placeholderTextColor="#888"
                      autoFocus={true}
                    />
                  </View>
                  <View>
                    <Button title="Add Values" onPress={addQuesValues} ></Button>
                  </View>
                </View>
                <View style={styles.valueListContainer}>
                  {quesValues &&
                    quesValues.map((item, index) => (
                      <View key={`quesValues-${index}`} style={styles.item}>
                        <Text>{item}</Text>
                        <TouchableOpacity
                          onPress={() => removeItem(index)}
                          style={styles.deleteButton}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={24}
                            color="red"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                </View>
              </View>
              <View style={styles.buttonstyle}>
                <Button
                  title="Save Question"
                  onPress={handleSaveQuestions}
                ></Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#eee",
    marginTop: 50,
    justifyContent: "space-between",
  },
  scrollView: {
    height: 600,
  },

  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    height: 180,
    borderRadius: 20,
    margin: 15,
    padding: 50,
    alignItems: "center",
    borderTopWidth: 20,
    borderTopColor: "#003366",
    borderTopStyle: "solid",
  },
  quesCard: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: "green",
  },
  quesStyle: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 35,
  },
  title: {
    flex: 3,
    marginRight: 200,
  },
  buttonstyle: {
    marginLeft: 90,
    marginRight: 90,
    marginBottom: 50,
  },
  description: {
    padding: 10,
    fontSize: 15,
  },
  modal: {
    display: "flex",
    backgroundColor: "#eee",
    height: 710,
  },
  modalbody: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    elevation: 5,
    margin: 50,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
  },
  questionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 25,
  },
  secondContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    width: "35%",
    height: 40,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  quesValueInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 20,
    height: 40,
  },
  quesValueView: {
    flex: 1,
  },
  quesValueInputContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalContainer: {
    flex: 1,
    display: "flex",
    alignContent: "flex-end",
  },
  valueListContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  deleteButton: {
    marginLeft: "auto",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    alignSelf: "center",
    width: 300,
    fontSize: 20,
  },
  radioText: {
    fontSize: 20,
  },
  radio: {
    height: 20,
    width: 20,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 9,
    margin: 10,
  },
  radiowrapper: {
    flexDirection: "row",
    alignItems: "center",
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
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  customButton: {
    backgroundColor: 'purple',
    borderRadius: 1,
    borderWidth:1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
},
customButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
},

});

export default FormSkeleton;
