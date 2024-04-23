import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import PatientCardFW from '../components/PatientCardFW';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext';

const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Disease</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>FollowUp</Text>
  </View>
);
export default FollowupScreen = () => {
  const { authToken } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    const filteredSearchData = data.filter((item) => 
    item.firstName.toLowerCase().includes(text.toLowerCase()))
   setSearchQuery(text);
    setFilteredData(filteredSearchData);

};

const showModal = () => {
  console.log("Show Modal");
  setIsModalVisible(true);
};
  const TableRow = ({ item }) => {
    const name = `${item.firstName}${item.middleName ? ' ' + item.middleName : ''} ${item.lastName}`;
    return (
      <Pressable onPress={() => setSelectedUser(item)}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.id}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{name}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.disease}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.followUp}</Text>
        </View>
      </Pressable>
    )
  };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("Inside get API");
  
//         // Check network connectivity
//         const netInfoState = await NetInfo.fetch();
//         if (netInfoState.isConnected) {
//           // If online, make API call
//           console.log("Inside is connected")
//           const response = await axios.get("http://10.0.2.2:3000/patientDetails");
//           const newData = response.data;
  
//           // Update state with new data
//           setData(newData);
//           setSelectedUser(newData[0]);
  
//           // Store new data in AsyncStorage
//           await AsyncStorage.setItem('patientDetails', JSON.stringify(newData));
//         } else {
//            console.log("Inside else connected")
//           // If offline, fetch data from AsyncStorage
//           const storedData = await AsyncStorage.getItem('patientDetails');
//           console.log("@111 storedData" , storedData);
//           if (storedData) {
//             setData(JSON.parse(storedData));
//             setSelectedUser(JSON.parse(storedData)[0]);
//           }
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
  
//     // Call fetchData on initial render
//     fetchData();
  
//     // Subscribe to network state changes and fetch data accordingly
//     const unsubscribe = NetInfo.addEventListener(state => {
//       if (state.isConnected) {
//         fetchData(); // Fetch data if online
//       }
//     });
  
//     // Clean up subscription on component unmount
//     return () => {
//       unsubscribe();
//     };
//   }, []);

useEffect(() => {
    console.log("Inside Followups get");
    const getfollowuplist = API_PATHS.GET_FIELDWORKERS_BY_DISTRICTS.replace(':districtId', districtId)
    axios.get(getfollowuplist, {
      headers: {
        Authorization: `Bearer ${authToken}` 
      }
    })
    .then(response => {
      // console.log("response", response);
      // console.log("response.data", response.data);
  
      setData(response.data);
      setSelectedUser(response.data[0]);      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [authToken]);


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
          </View>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={searchQuery ? filteredData : data}
            ListHeaderComponent={<TableHeader />}
            renderItem={({ item }) => <TableRow item={item} />}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.card}>
        {selectedUser && <PatientCardFW user={selectedUser} />}
      </View>
      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View><Text>Hello</Text></View>
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