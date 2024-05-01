import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import PatientCardFW from '../AddFollowup/PatientDetailsFW';
import AddPatientDefaultForm from '../AddFollowup/AddPatientDefaultForm';
// import { API_PATHS } from '../constants/apiConstants';
// import { useAuth } from '../Context/AuthContext';
import { db } from '../Database/database';
import PatientDetailsFW from '../AddFollowup/PatientDetailsFW';

const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Disease</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>FollowUp</Text>
  </View>
);
export default FollowupScreen = () => {
  // const { authToken } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [navigate, setNavigate] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [formType, setFormType] = useState('');

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
  

  // // Function to fetch data from the demographics table
  // const fetchData = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT * FROM demographics',
  //       [],
  //       (_, result) => {
  //         // Extract rows from the result
  //         console.log('_______________________________________________');    
  //         console.log('_______________________________________________');  
  //         console.log('_______________________________________________');    
  //         console.log('_______________________________________________');    
  
  //         console.log('Forms fetched from SQLite:', result.rows._array);    

  //         const fetchedData = result.rows._array;
  //         setData(fetchedData);
  //         setFilteredData(fetchedData); // Initialize filtered data with fetched data
  //       },
  //       (_, err) => {
  //         console.log('Failed to fetch data from demographics table:', err);
  //       }
  //     );
  //   });
  // };

  // useEffect(() => {
  //   fetchData(); // Fetch data from the demographics table on component mount
  // }, []);

  // const handleSearch = (text) => {
  //   setSearchQuery(text);
  //   const filteredSearchData = data.filter((item) => 
  //     item.firstName.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setFilteredData(filteredSearchData);
  // };


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
    return (
      <Pressable onPress={() => onSelectUser(item)}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.patientNumber}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{name}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.formTitle}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.currentFollowUpDate}</Text>
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
            {/* <SearchBar
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
            /> */}
            <TouchableOpacity onPress={showModal}>
              <View style={styles.circle}>
                <Icon name="plus" type="font-awesome" color="black" />
              </View>
            </TouchableOpacity>
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
      {/* <View style={styles.card}>
        {selectedUser && <PatientCardFW user={selectedUser} />}
      </View> */}
      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <AddPatientDefaultForm saveModal={saveModal} formType={formType} setFormType={setFormType}/>
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
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'bold',
  },
  flatlist: {
    marginTop: 0,
    flex: 2,
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
});