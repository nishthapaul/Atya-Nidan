import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useAuth } from "../Context/AuthContext"; // Adjust the import path as needed
import { API_PATHS } from "../constants/apiConstants";
import axios from "axios";

const CustomCheckbox = ({ labelValue, index }) => {
  return (
    <View style={styles.checkboxContainer} key={`${labelValue}-${index}`}>
      <CheckBox
        value={false}
        iconRight
        iconType="material"
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        uncheckedColor="black"
        containerStyle={styles.checkbox}
        disabled={true}
      />
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

export default FormCard = ({ id, formId, onRefresh }) => {
  const [formData, setFormData] = useState([]);
  const { authToken } = useAuth(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResponse = await axios.get(
          API_PATHS.GET_FORM_CARD_DETAILS.replace(":form-definition-id", id),
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setFormData(formResponse.data);
      } catch (error) {
        console.log("Error fetching lists:", error);
      }
    };

    fetchData();
  }, [authToken, id]);
  console.log("formData", formData);
  console.log("Form definitive id", id);
  console.log("Form id", formId);

  const setDefaultForm = async () => {
    const apiUrl = API_PATHS.PUT_FORM_DEFAULT.replace(":formId", formId);
    try {
      const response = await axios.put(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Successfully set default:", response.data);
      onRefresh(); // Call the passed callback function to refresh the list
    } catch (error) {
      console.error("Error updating default form:", error);
    }
  };

  return (
    <View style={styles.card}>
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <Text style={styles.title}> {formData.title}</Text>
          <Text style={styles.description}>{formData.description}</Text>
        </View>
        <View style={styles.quesCard}>
          <View>
            <Text style={styles.title}>Patient's Detials</Text>
            <Text>Name: </Text>
            <Text>DOB:</Text>
            <Text>Address:</Text>
            <Text>Gender:</Text>
            <Text>bloodGroup:</Text>
            <Text>phoneNumber:</Text>
          </View>
        </View>

        {formData.questions &&
          formData.questions.map((item, index) => (
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
        <View style={styles.quesCard}>
          <CustomRadioButton labelValue={"Healthy"} key={1} />
          <CustomRadioButton labelValue={"Unhealthy"} key={2} />
        </View>
        <View style={styles.quesCard}>
          <Text>Patient's Health Remarks:</Text>
        </View>
      </ScrollView>
      {/* <Button
        title="Set Default"
        onPress={async () => {
          const apiUrl = API_PATHS.PUT_FORM_DEFAULT.replace(":formId", formId);
          try {
            const response = await axios.put(
              apiUrl,
              {},
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log("Successfully set default:", response.data);
            // Optionally update state or show a message
          } catch (error) {
            console.error("Error updating default form:", error);
            // Optionally handle error, update state or show an error message
          }
        }}
        color="#DFF4F3"
      /> */}
      {/* <Button
        title="Set Default"
        onPress={setDefaultForm}
        color="#DFF4F3"
      /> */}
      <TouchableOpacity style={styles.button} onPress={setDefaultForm}>
        <Text style={styles.buttonText}>Set Default</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    height: 550,
    width: 550,
    borderWidth: 2,
    borderColor:  "#003366",
    borderTopWidth: 20,
    borderTopColor: "#003366",
    borderTopStyle: "solid",
    backgroundColor: "#eee",
  },
  heading: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    padding: 4,
  },
  quesCard: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#003366",
  },
  quesStyle: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    // backgroundColor: 'blue',
  },
  // checkbox: {
  //     // alignSelf: 'center',
  //     width: 200,
  //     height: 200,

  // },
  label: {
    alignSelf: "center",
    width: 300,
    fontSize: 16,
  },
  radioText: {
    fontSize: 16,
  },
  radio: {
    height: 14,
    width: 14,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 9,
    margin: 10,
  },
  radiowrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    backgroundColor: "transparent",
    borderWidth: 0, // Remove default border
    padding: 4, // Adjust padding as needed
    margin: 0, // Adjust margin as needed
  },
  scrollView: {
    height: 600,
  },
  button: {
    backgroundColor: "#FFA62B", // Background color of the button
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: "black", // Here you can set the text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});
