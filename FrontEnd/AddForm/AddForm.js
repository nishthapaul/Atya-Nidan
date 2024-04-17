import React, { useState, useRef, useEffect } from "react";
// import { Alert, ScrollView, View, StyleSheet } from 'react-native';
import FormSkeleton from "./FormSkeleton";
import axios from "axios";
import { API_PATHS } from "../constants/apiConstants";
import { useAuth } from "../Context/AuthContext"; // Adjust the import path as needed
// import React, { useState, useEffect } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from "react-native-elements";

const CustomCheckbox = ({ labelValue, index }) => {
  return (
    <View style={styles.checkboxContainer} key={`${labelValue}-${index}`}>
      <CheckBox value={false} style={styles.checkbox} disabled={true} />
      <Text style={styles.label}>{labelValue}</Text>
    </View>
  );
};

const CustomRadioButton = ({ labelValue, index }) => {
  return (
    <View style={styles.radiowrapper} key={`${labelValue}-${index}`}>
      <View style={styles.radio}></View>
      <Text style={styles.radioText}>{labelValue}</Text>
    </View>
  );
};

const optionTypeList = [
  { label: "Multiple choice", value: "MultiSelect" },
  { label: "Checkboxes", value: "CheckBox" },
];

const AddForm = ({ saveModal, onRefresh }) => {
  console.log("saveForm", saveModal);
  const { authToken } = useAuth(); // Accessing the authToken
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quesText, setQuesText] = useState("");
  const [optionType, setOptionType] = useState("");
  const [quesValue, setQuesValue] = useState("");
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
      setQuesValues((prevValues) => [...prevValues, quesValue]);
      setQuesValue("");
    }
  };
  const handleSaveFormData = () => {
    const formData = {};
    formData.title = title;
    formData.description = description;
    formData.quesList = quesList;
    //console.log("form Data quesList", formData.quesList);
    console.log("form Data Saved", formData);
    setTitle("");
    setDescription("");
    setQuesList([]);
  };

  const handleSaveQuestions = () => {
    if (quesText && optionType && quesValues) {
      const quesObj = {};
      quesObj.number = `Question${quesList.length + 1}`;
      quesObj.question = quesText;
      quesObj.optionType = optionType;
      quesObj.values = quesValues;
      setQuesList((prevValues) => [...prevValues, quesObj]);
    }
    setIsModalVisible(false);
    setQuesText("");
    setQuesValue("");
    setQuesValues("");
    setOptionType("");
  };
  useEffect(() => {
    //console.log("quesList", quesList);
  }, [quesList]);

  const removeItem = (index) => {
    const newItems = [...quesValues];
    newItems.splice(index, 1);
    setQuesValues(newItems);
  };

  const handleSubmitOrClose = () => {
    saveModal();
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called"); // Add this line

    const data = {
      title: title,
      description: description,
      questions: quesList,
    };

    const postformdefinition = API_PATHS.POST_FORM_SKELETON;
    console.log("Inside post");
    axios
      .post(postformdefinition, data, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the token here
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle success response
        console.log("Response:", response.data);
        // Show success message or perform any other actions
        Alert.alert("Success", "Form posted successfully!");
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
          Alert.alert(
            "Error",
            "Failed to add Field Worker. Please try again later."
          );
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
          removeItem={removeItem}
          handleSubmitOrClose={handleSubmitOrClose}
          handleSubmit={handleSubmit}
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

export default AddForm;
