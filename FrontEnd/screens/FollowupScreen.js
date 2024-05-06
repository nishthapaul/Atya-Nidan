import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal, Alert } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
// import PatientCardFW from '../AddFollowup/PatientDetailsFW';
import AddPatientDefaultForm from '../AddFollowup/AddPatientDefaultForm';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext';
import { db } from '../Database/database';
import PatientDetailsFW from '../AddFollowup/PatientDetailsFW';
import FieldWorkerContainer from '../FieldWorkerContainer';
import FieldWorkerCard from '../components/FieldWorkerCard';

const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Disease</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>FollowUp</Text>
  </View>
);
export default FollowupScreen = ({ user }) => {
  const { authToken } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [navigate, setNavigate] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [formType, setFormType] = useState('');
  const [sync , setSync] = useState(false);


  useEffect(() => {
    // Handle the transition or action once sync is completed
    if (sync) {
      handlePostSyncActions(); // Implement this function to handle actions after sync
    }
  }, [sync]);

  useEffect(() => {
    const fetchDataDemographic = async () => {
      console.log("in");
      try {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM demographics',
            [],
            (_, result) => { // Corrected to include the transaction object "_"
              console.log("inside results"); // Now this should correctly log
              const fetchedData = result.rows._array;
              console.log('_______________________________________________');    
              console.log("Fetched Data: ", fetchedData);
              if (fetchedData.length > 0) {
                setData(fetchedData); // Assuming you want the first match or there's only one match
              } else {
                console.log('No data demographic');
              }
            },
            (_, err) => {
              console.log('Failed to fetch selected user data from demographics table:', err);
            }
          );
        });
      } catch (error) {
        console.error("Error fetching demographic details:", error);
        alert('Failed to fetch demographic details.');
      }
    };
    fetchDataDemographic();
  }, []);
  

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredSearchData = data.filter((item) => 
      item.firstName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredSearchData);
  };

  const fetchDataFromDatabase = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM formResponseforPatient;',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
  };

  const transformData = (data) => {
    return data.map(item => ({
      formId: item.formId,
      fieldWorkerId: item.fwNumber,
      patientIdNumber: item.formType === "Regular" ? item.aabhaNumber :  item.pNumber,
      fields: {
        firstName: item.fName,
        lastName: item.lName,
        address: item.address,
        phoneNumber: item.phoneNumber,
        taluka: item.talukaName,
        age: item.age,
        unhealthy: item.unhealthy === 1,
        gender: item.gender,
        bloodGroup: item.bloodGroup
      },
      questions: JSON.parse(item.responseList),
      formType: item.formType
    }));
  };

  const sendFormData = async (formattedData) => {
    console.log("sendFormData called!");
    const url = API_PATHS.POST_SYNC_FW_SCREEN;
    try {
      const response = await axios.post(url, formattedData, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Replace authToken with your actual token variable
          'Content-Type': 'application/json'
        }
      });
      console.log("____________________Jai mata di_______________________");
      console.log('POST response:', response.data);
      Alert.alert('Success', 'Data sent successfully!');
      // setSync(true)
    } catch (error) {
      console.error('Error sending form data:', error);
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'Failed to send data. Please try again later.');
      }
    }
  };
  

  const handleSync = async () => {
    try {
      const rawData = await fetchDataFromDatabase();
      console.log("____________________Jai mata di_______________________");
      console.log("RAW DATA",rawData);
      const formattedData = transformData(rawData);
      console.log("____________________Jai mata di_______________________");
      console.log("FORMATTED DATA",formattedData);
      setSync(true); // Set sync true only if data send is successful
      await sendFormData(formattedData);
    } catch (error) {
      console.error('Sync error:', error);
      Alert.alert('Error', 'Failed to sync data.');
    }
  };
  
  const handlePostSyncActions = () => {
    // Perform the API fetches or navigation
    // After actions are completed, reset sync
    <FieldWorkerContainer authToken={authToken} user={user} />
    setSync(false);
  };

  const showModal = () => {
    console.log("Show Modal");
    setIsModalVisible(true);
  };

  const saveModal = () => {
    console.log("Save Modal");
    setIsModalVisible(false);
  };

  const onSelectUser = (item) => {
    if (item.patientNumber) {
      // If the same item is clicked, force the useEffect to run
    //   setForceUpdate(prev => prev + 1);  // Increment to force re-render
    // } else {
      setSelectedUser(item.patientNumber);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedUser) {
        console.log("selected user" , selectedUser);
        try {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM demographics WHERE patientNumber = ?',
              [selectedUser], // Bind the selectedUser value to the query
              (_, result) => {
                // Extract rows from the result
               
                console.log("Result" , result);
                const fetchedData = result.rows._array;
                console.log("array" , fetchedData);
                if (result.rows.length > 0) {
                  console.log("fetchedData" , fetchedData);
                  setApiData(fetchedData); // Assuming you want the first match or there's only one match
                  setNavigate(true);
                } else {
                  console.log('No data found for the selected user');
                  setNavigate(false);
                }
              },
              (_, err) => {
                console.log('Failed to fetch selected user data from demographics table:', err);
              }
            );
          });
        } catch (error) {
          console.error("Error fetching selected user details:", error);
          alert('Failed to fetch patient details.');
        }
      }
    };
    fetchData();
  }, [selectedUser]);
  
  

  if (navigate && apiData) {
    // Navigate to PatientDetailsFW component
    return (
      <PatientDetailsFW 
        patientData={apiData} 
        fwId = {user.empId}
        talukaName = {user.taluka.name}
        onBack={() => {
          setFormType('new');
          setNavigate(false);  // Go back to list
          setSelectedUser(null);
          saveModal();
        }} 
      />
    );
  }

  const TableRow = ({ item }) => {
    const name = `${item.firstName}${item.middleName ? ' ' + item.middleName : ''} ${item.lastName}`;
    const followUpStyle = item.fieldworkerFollowUpType === 'Today' 
                        ? styles.followUpToday 
                        : item.fieldworkerFollowUpType === 'Pending' 
                        ? styles.followUpPending 
                        : {}; // Default style if needed
    return (
      <Pressable onPress={() => onSelectUser(item)}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.patientNumber}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{name}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.formTitle}</Text>
          <Text style={[styles.tableCell, { flex: 2 }, followUpStyle]}>{item.currentFollowUpDate}</Text>
        </View>
      </Pressable>
    )
  };


  return (
    <View style={styles.MainContainer}>
    {/* <View style={styles.header}><AppHeader/></View> */}
    <View style={styles.container}>
      <View style={styles.list}>
        <View style={{ marginTop: 20, marginBottom: 20, height: 70}}>
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
              inputStyle={{ backgroundColor: 'white', color: 'black' }} // Style for the text input
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
              }} // Style for the container
              inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10, height: 30 }} // Style for the input container
              searchIcon={{ size: 24 }} // Style for the search icon
              clearIcon={{ size: 24 }} // Style for the clear icon
            />
            
            <TouchableOpacity onPress={showModal}>
              <View style={styles.circle}>
                <Icon name="plus" type="font-awesome" color="black" />
              </View>
            </TouchableOpacity>
            {/* <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.syncbutton} onPress={handleSync}>
              <Text style={styles.backbuttonText}>Sync</Text>
            </TouchableOpacity>
          </View> */}
          </View>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={searchQuery ? filteredData : data}
            ListHeaderComponent={<TableHeader />}
            renderItem={({ item }) => <TableRow item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.card}>
          <FieldWorkerCard user={user} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.syncbutton} onPress={handleSync}>
              <Text style={styles.backbuttonText}>Sync</Text>
            </TouchableOpacity>
          </View>
        </View>
      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
      <AddPatientDefaultForm saveModal={saveModal} formType={formType} setFormType={setFormType} fwId = {user.empId} talukaName = {user.taluka.name}
/>
      </Modal>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    marginTop:20,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontStyle: 'bold',
    justifyContent: 'center',
  },
  flatlist: {
    marginTop: 0,
    flex: 2,
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft:20
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
  header: {
    flex : 0.1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Distribute buttons horizontally
    paddingHorizontal: 30, // Add space on both sides of the container
    marginTop: 20,
  },
  syncbutton: {
    flex: 1, // Make buttons occupy equal width
    paddingHorizontal: 15, // Add horizontal space between buttons and text
    backgroundColor: "#FFA62B",
    borderRadius: 5, // Maintain button corner rounding
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 20, // Add space between buttons (margin on each side)
    height: 40,
  },
  backbuttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  followUpToday: {
    color: 'green',
  },
  followUpPending: {
    color: 'red',
  },
});