import React, { useEffect, useState } from "react";
import { View, Switch, StyleSheet, Text, Pressable, Modal } from "react-native";
import DropdownComponent from "./DropdownComponent";
import axios from "axios";
import { useAuth } from "../Context/AuthContext"; // Adjust the import path as needed
import { API_PATHS } from "../constants/apiConstants";

export default FWDeassign = ({
  mainid,
  filteredData,
  visibleModal,
  closeModal,
  talukaName,
  AssignDeassign,
}) => {
  console.log("Inside Modal");
  console.log("filteredData", filteredData);
  const { authToken } = useAuth(); // Accessing the authToken

  // const {id} = mainid;
  console.log("mainid", mainid);
  const [assignid, setAssignId] = useState("");
  const [assigned, setAssigned] = useState("");

  const handleAssignPutCall = () => {
    const url = API_PATHS.PUT_FIELDWORKER_ASSIGN.replace(
      ":fieldworkerId",
      mainid
    );
    console.log("deassign url", url);
    axios
      .put(
        url,
        {
          available: true,
          substituteFieldWorkerId: assignid,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token here
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Update state with API data
        console.log("response", response);
        console.log("response", response.status);
      })
      .catch((error) => {
        console.error("Error in deassign request :", error);
      });
  };

  const handlePress = () => {
    closeModal();
    // handleAssignPutCall();
  };

  const DropdownReturnValue = ({ id, available }) => {
    setAssignId(id);
    setAssigned(available);
  };
  useEffect(() => {
    console.log("AssignId", assignid);
    console.log("Assigned", assigned);
  }, [assignid, assigned]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibleModal}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.modal}>
        <View style={styles.modalbody}>
          <Text style={styles.first}>
            Assign Field Worker to Taluka : {talukaName}
          </Text>
          {/* <View><DropdownComponent list = {FWList}/></View> */}
          {filteredData && filteredData.length > 0 ? (
            <View>
              <DropdownComponent
                list={filteredData}
                returnValue={DropdownReturnValue}
              />
              {assignid ? (
                <Pressable style={styles.assign} onPress={handlePress}>
                  <Text style={{ textAlign: "center", padding: 5 }}>
                    Assign
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  color: "red",
                  marginBottom: 40,
                }}
              >
                No Field Worker for Taluka {talukaName} is available
              </Text>
              <Pressable style={styles.assign} onPress={closeModal}>
                <Text style={{ textAlign: "center", padding: 5 }}>Close</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalbody: {
    height: 180,
    width: 350,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    elevation: 5,
  },
  first: {
    backgroundColor: "#494ef2",
    height: 40,
    marginBottom: 20,
    borderRadius: 10,
    textAlign: "center",
    padding: 10,
    color: "white",
  },
  assign: {
    backgroundColor: "#f29e0c",
    borderRadius: 60,
    height: 30,
    width: 100,
    marginLeft: 120,
  },
});
