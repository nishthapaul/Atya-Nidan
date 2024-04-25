import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import AppHeader from "../components/AppHeader";
import PatientCard from "../components/PatientCard";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { API_PATHS } from "../constants/apiConstants";
import AddPrescription from "../AddPrescription/AddPrescription";

const TableHeader = () => (
  <View style={styles.tableRow}>
    {/* <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: "bold" }]}>
      Id
    </Text> */}
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: "bold" }]}>
      Medical History
    </Text>
    <Text
      style={[
        styles.tableCell,
        { flex: 2 },
        { fontWeight: "bold", marginLeft: 60 },
      ]}
    >
      Date
    </Text>
  </View>
);

const PatientDetails = ({ onBack, patientData, doctorId }) => {
  console.log("Inside patient details");
  const [data, setData] = useState([]);
  const { authToken } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBack = () => {
    onBack();  // Call the onBack function passed as prop which triggers refresh in parent
  };

  const showModal = () => {
    console.log("Show Modal");
    setIsModalVisible(true);
  };

  const saveModal = () => {
    console.log("Save Modal");
    setIsModalVisible(false);
  };



  useEffect(() => {
    const getdoclist = API_PATHS.GET_PDFS_OF_FORMS_AND_PRESCRIPTIONS
    axios.get(getdoclist, {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the authToken in the request
      }
    })
    .then(response => {
      console.log("response pdf", response);
      console.log("response.data", response.data);    
    })
    .catch(error => {
      console.error('Error fetching data of pdf:', error);
    });
  }, [authToken]);


  const TableRow = ({ item }) => {
    console.log("item", item.responseId);
    // const medicalhistory = `${item.title} ${item.type}`;
    return (
      <Pressable>
      <View style={styles.tableRow}>
          <View style={styles.tableCellContainer}>
            <Text style={styles.tableCell}>{`${item.title} ${item.type}`}</Text>
          </View>
          <Text style={[styles.tableCell, { flex: 2, marginLeft: 60 }]}>
            {item.submittedOn.slice(0, 10)}
          </Text>
        </View>
      </Pressable>
    );
  };

  //api calls


  useEffect(() => {
    console.log("Inside medical forms get");
    const getmedicalhistorylist = API_PATHS.GET_MEDICAL_HISTORY.replace(
      ":patientNumber",
      patientData.patientNumber
    );
    axios
      .get(getmedicalhistorylist, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the authToken in the request
        },
      })
      .then((response) => {
        // console.log("response", response);
        // console.log("response.data", response.data);

        setData(response.data);
        // setSelectedUser(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [authToken]);


  const refreshmedicalhistory = () => {
    console.log("Refreshing medical history");
    const getmedicalhistorylist = API_PATHS.GET_MEDICAL_HISTORY.replace(
      ":patientNumber",
      patientData.patientNumber
    );
    axios
      .get(getmedicalhistorylist, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include the authToken in the request
        },
      })
      .then((response) => {
        // console.log("response", response);
        // console.log("response.data", response.data);

        setData(response.data);
        // setSelectedUser(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  useEffect(() => {
    refreshmedicalhistory();
  }, [authToken]);}

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <AppHeader /> */}
      {/* <View style={styles.contentContainer}> */}
      {/* <Text>Patient Details Here</Text> */}
      {/* <Button title="Back" onPress={onBack} style={styles.backbutton}/> */}
      <View style={styles.container}>
        <View style={styles.list}>
          <View style={{ marginTop: 20, marginBottom: 20, height: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 70,
                alignItems: "center",
                backgroundColor: "white",
                marginRight: 60,
              }}
            ></View>
          </View>
          <View style={styles.flatlist}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.addbutton} onPress={showModal}>
                <Text style={styles.backbuttonText}>Add Prescription</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              ListHeaderComponent={<TableHeader />}
              renderItem={({ item }) => <TableRow item={item} />}
              // keyExtractor={item => item.empId.toString()}
              keyExtractor={(item) => item.responseId}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <View style={styles.card}>
          <PatientCard user={patientData} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.backbutton} onPress={handleBack}>
              <Text style={styles.backbuttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <AddPrescription
            saveModal={saveModal}
            doctorId={doctorId}
            user={patientData}
            onRefresh={refreshmedicalhistory}
          />
        </Modal>
      </View>

      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  backbutton: {
    backgroundColor: "#FFA62B",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
  },
  backbuttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  tableRow: {
    flexDirection: "row",
    borderColor: "white",
    backgroundColor: "white",
    paddingVertical: 10,
    marginEnd: 30,
    paddingLeft: 50,
  },
  tableCell: {
    textAlign: "left",
    fontSize: 23,
    fontStyle: "bold",
  },
  flatlist: {
    marginTop: 0,
    flex: 2,
    backgroundColor: "white",
  },
  list: {
    flex: 0.55,
  },
  card: {
    paddingTop: 50,
    flex: 0.45,
    backgroundColor: "white",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  tableCellContainer: {
    flex: 3, // Maintain the same width proportion as the date column
    alignItems: "flex-start", // Align text to the left by default
    backgroundColor: "#D9D9D9", // Example background color
    padding: 5, // Example padding
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute buttons horizontally
    paddingHorizontal: 30, // Add space on both sides of the container
    marginTop: 20,
  },
  backbutton: {
    flex: 1, // Make buttons occupy equal width
    paddingHorizontal: 15, // Add horizontal space between buttons and text
    backgroundColor: "#FFA62B",
    borderRadius: 5, // Maintain button corner rounding
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 20, // Add space between buttons (margin on each side)
    height: 40,
  },
  addbutton: {
    flex: 1, // Make buttons occupy equal width
    paddingHorizontal: 15, // Add horizontal space between buttons and text
    backgroundColor: "#B8D4D8",
    borderRadius: 5, // Maintain button corner rounding
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 20, // Add space between buttons (margin on each side)
    height: 40,
  },
});

export default PatientDetails;
