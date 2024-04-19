import React, { useState, useRef, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";
import PatientCard from "../components/PatientCard";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { API_PATHS } from "../constants/apiConstants";
const TableHeader = () => (
  <View style={styles.tableRow}>
    {/* <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: "bold" }]}>
      Id
    </Text> */}
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: "bold" }]}>
      Medical History
    </Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: "bold" }]}>
      Date
    </Text>
  </View>
);

const PatientDetails = ({ onBack, patientData }) => {
  console.log("Inside patient details");
  const [data, setData] = useState([]);
  const { authToken } = useAuth();

  const TableRow = ({ item }) => {
    console.log("item", item.responseId);
    // const medicalhistory = `${item.title} ${item.type}`;
    return (
      <Pressable onPress={() => onSelectUser(item)}>
        <View style={styles.tableRow}>
          {/* <Text style={[styles.tableCell, { flex: 1 }]}>{item.responseId}</Text> */}
          <Text style={[styles.tableCell, { flex: 2 }]}>{`${item.title} ${item.type}`}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>
          {item.submittedOn.slice(0, 10)}
          </Text>
        </View>
      </Pressable>
    );
  };
//api calls

useEffect(() => {
  console.log("Inside medical forms get");
  const getmedicalhistorylist = API_PATHS.GET_MEDICAL_HISTORY.replace(':patientNumber', patientData.patientNumber)
  axios.get(getmedicalhistorylist, {
    headers: {
      Authorization: `Bearer ${authToken}` // Include the authToken in the request
    }
  })
  .then(response => {
    // console.log("response", response);
    // console.log("response.data", response.data);

    setData(response.data);
    // setSelectedUser(response.data[0]);      
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, [authToken]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />
      {/* <View style={styles.contentContainer}> */}
      {/* <Text>Patient Details Here</Text> */}
      {/* <Button title="Back" onPress={onBack} style={styles.backbutton}/> */}
      <View style={styles.container}>
        <View style={styles.list}>
          <View style={{ marginTop: 20, marginBottom: 20, height: 110 }}>
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
        </View>
        {/* Modal */}
        {/* <Modal visible={isModalVisible} transparent animationType="slide">
          <AddFieldWorker
            saveModal={saveModal}
            districtId={districtId}
            onRefresh={refreshListofFW}
          />
        </Modal> */}
      </View>
      <TouchableOpacity style={styles.backbutton} onPress={onBack}>
        <Text style={styles.backbuttonText}>Back</Text>
      </TouchableOpacity>
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
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    borderColor: 'white',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginEnd: 30,
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'bold',
  },
  flatlist: {
    marginTop: 0,
    flex: 2,
    backgroundColor: 'white',
  },
  list: {
    flex: 0.55,
  },
  card: {
    paddingTop: 50,
    flex: 0.45,
    backgroundColor: 'white',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
});

export default PatientDetails;
