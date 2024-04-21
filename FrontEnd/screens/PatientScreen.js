import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext'; 
import AddPatient from '../AddPatient/AddPatient';
import PatientDetails from '../AddPatient/PatientDetails';
//for showing list of patients

const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 4 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>Taluka</Text>
    <Text style={[styles.tableCell, { flex: 4 }, { fontWeight: 'bold' }]}>Contact Number</Text>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>Last Visit</Text>
    <Text style={[styles.tableCell, { flex: 4 }, { fontWeight: 'bold' }]}>Field Worker</Text>
  </View>
);


const PatientScreen = ({ doctorId }) => {
  const { authToken } = useAuth(); // Accessing the authToken
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(0);  // State to force useEffect to run
  const [valueFromRadio, setValueFromRadio] = useState(1);


  const showModal = () => {
    console.log("Show Modal");
    setIsModalVisible(true);
  };

  const saveModal = () => {
    console.log("Save Modal");
    setIsModalVisible(false);
  };

  const onSelectUser = (item) => {
    if (item.patientNumber === selectedUserId) {
      // If the same item is clicked, force the useEffect to run
      setForceUpdate(prev => prev + 1);  // Increment to force re-render
    } else {
      setSelectedUserId(item.patientNumber);
    }
  };
 
  useEffect(() => {
    const fetchData = async () => {
      if (selectedUserId) {
        try {
          const url = API_PATHS.GET_PATIENTID_OF_PATIENT.replace(":patientNumber", selectedUserId);
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setApiData(response.data);
          setNavigate(true);
        } catch (error) {
          console.error("Error fetching patient details:", error);
          alert('Failed to fetch patient details.');
        }
      }
    };
    fetchData();
  }, [selectedUserId, authToken, forceUpdate]);

  const handleSearch = (text) => {
    // console.log(valueFromRadio);
    const filteredSearchData = data.filter((item) => {
      return valueFromRadio === 1
        ? item.patientName.toLowerCase().includes(text.toLowerCase())
        : item.taluka.toLowerCase().includes(text.toLowerCase());
    });
    setSearchQuery(text);
    setFilteredData(filteredSearchData);
  };

  useEffect(() => {
    const getpatientlist = API_PATHS.GET_LIST_OF_PATIENTS.replace(':DoctorNumber', doctorId)
    axios.get(getpatientlist, {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the authToken in the request
      }
    })
    .then(response => {
      console.log("response", response);
      console.log("response.data", response.data);
  
      setData(response.data);
      // setSelectedUser(response.data[0]);      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [authToken]);

  // const refreshListofpatients = () => {
  //   console.log("Refreshing patients list");
  //   const getpatientlist = API_PATHS.GET_LIST_OF_PATIENTS.replace(':DoctorNumber', doctorId)
  //   axios.get(getpatientlist, {
  //     headers: {
  //       Authorization: `Bearer ${authToken}` // Include the authToken in the request
  //     }
  //   })
  //   .then(response => {
  //     setData(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });

  // useEffect(() => {
  //   refreshListofpatients();
  // }, [authToken]);}

  const refreshList = () => {
    axios.get(API_PATHS.GET_LIST_OF_PATIENTS.replace(':DoctorNumber', doctorId), {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    .then(response => {
      setData([...response.data]);
      console.log("Data refreshed");
    })
    .catch(error => console.error('Error refreshing data:', error));
  };

  useEffect(() => {
    refreshList();  // Initial load and setup refresh mechanism
  }, [authToken, doctorId]); 


  if (navigate && apiData) {
    // Navigate to PatientDetails component
    return (
      <PatientDetails 
        patientData={apiData} 
        doctorId={doctorId}
        onBack={() => {
          setNavigate(false);  // Go back to list
          setSelectedUserId(null);
          saveModal();
          refreshList();  
        }} 
      />
    );
  }

  const TableRow = ({ item }) => {
    console.log("item", item);
    return (
      <Pressable onPress={() => onSelectUser(item)}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 3 }]}>{item.patientNumber}</Text>
          <Text style={[styles.tableCell, { flex: 4 }]}>{item.patientName}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{item.taluka}</Text>
          <Text style={[styles.tableCell, { flex: 4 }]}>{item.phoneNumber}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{item.visitDate.slice(0, 10)}</Text>
          <Text style={[styles.tableCell, { flex: 4 }]}>{item.fieldWorkerName}</Text>
        </View>
      </Pressable>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View style={{ marginTop: 20, marginBottom: 20, height: 110 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 70,
              alignItems: 'center',
              backgroundColor: "white",
              marginRight: 60,
            }}
          >
            <SearchBar
              placeholder="Search"
              onChangeText={handleSearch}
              value={searchQuery}
              inputStyle={{ backgroundColor: 'white', color: 'black' }}
              containerStyle={{
                backgroundColor: 'transparent',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 24,
                width: "80%",
                margin: 20,
                marginBottom: 0,
              }}
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10, height: 30 }}
              searchIcon={{ size: 24 }}
              clearIcon={{ size: 24 }}
            />
            <TouchableOpacity onPress={showModal}>
              <View style={styles.circle}>
                <Icon name="plus" type="font-awesome" color="black" />
              </View>
            </TouchableOpacity>
            
          </View>
        </View>
        <View style={styles.flatlist}>
              <FlatList
                data={data}
                ListHeaderComponent={<TableHeader />}
                renderItem={({ item }) => <TableRow item={item} />}
                keyExtractor={item => item.patientNumber}
                showsVerticalScrollIndicator={false}
              />
            </View>
      </View>
      <Modal visible={isModalVisible} transparent animationType="none">
        <AddPatient saveModal={saveModal} doctorId={doctorId} onRefresh = {refreshList}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'left',
    fontSize: 20,
    // fontStyle: 'bold',
    justifyContent: 'center',
  },
  flatlist: {
    marginTop: 0,
    flex: 1,
    backgroundColor: 'white',
    // marginRight: 20,
    marginLeft:20
  },
  list: {
    flex: 1,
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

export default PatientScreen;
