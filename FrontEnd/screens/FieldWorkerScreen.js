import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import Card from '../components/Card';
import RadioButton from '../components/RadioButton';
import AddFieldWorker from '../Addfieldworker/AddFieldWorker';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext'; // Adjust the import path as needed
import CustomSwitch from '../components/FWAssign'
// Sample data


const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>Taluka</Text>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>Assigned</Text>
  </View>
);
const FieldWorkerScreen = ({ navigation, districtId }) => {
  const { authToken } = useAuth(); // Accessing the authToken
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [valueFromRadio, setValueFromRadio] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [admin, setAdmin] = useState([]);

  const handleSearch = (text) => {
    console.log(valueFromRadio);
    const filteredSearchData = data.filter((item) => {
      return valueFromRadio === 1 ?
        (item.firstName.toLowerCase().includes(text.toLowerCase())) :
        (item.taluka.name.toLowerCase().includes(text.toLowerCase()))
    }
    );
    setSearchQuery(text);
    setFilteredData(filteredSearchData);
  };
  const handleChildValueChange = (newValue) => {
    console.log("newValue: ", newValue);
    setSearchQuery("");
    setValueFromRadio(newValue);
  };
  const onSelectUser = (user) => {
    console.log("selecteduser", user);
    setSelectedUser(user);
  }
  const showModal = () => {
    console.log("Show Modal");
    setIsModalVisible(true);
  };

  const saveModal = () => {
    console.log("Save Modal");
    setIsModalVisible(false);
  };


  const TableRow = ({ item }) => {
    console.log("item", item.empId);
    const name = `${item.firstName}${item.middleName ? ' ' + item.middleName : ''} ${item.lastName}`;
    const newDataObject = { available: item.available, empId: item.empId, name: name, talukaName: item.taluka.name};
    return (
      <Pressable onPress={() => onSelectUser(item)}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.empId}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{`${item.firstName}${item.middleName ? ' ' + item.middleName : ''} ${item.lastName}`}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.taluka.name}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}><CustomSwitch newdata = {newDataObject} data = {data} onRefresh={refreshListofFW}/></Text>
        </View>
      </Pressable>
    )
  };
  
  // useEffect(() => {
  //   const getfwlist = API_PATHS.GET_FIELDWORKERS_BY_DISTRICTS.replace(':districtId', 2)
  //   axios.get(getfwlist)
  //     .then(response => {
  //       console.log("response", response);
  //       console.log("response.data", response.data);

  //       setData(response.data);
  //       setSelectedUser(response.data[0]);      
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    console.log("Inside fieldworkder get");
    const getfwlist = API_PATHS.GET_FIELDWORKERS_BY_DISTRICTS.replace(':districtId', districtId)
    axios.get(getfwlist, {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the authToken in the request
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
  }, [authToken]); // Add authToken as a dependency to re-run the effect if it changes
  
  const refreshListofFW = () => {
    console.log("Refreshing fw list");
    const getfwlist = API_PATHS.GET_FIELDWORKERS_BY_DISTRICTS.replace(':districtId', districtId)    
    axios.get(getfwlist, {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the authToken in the request
      }
    })
    .then(response => {
      setData(response.data);
      setSelectedUser(response.data[0]);      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  useEffect(() => {
    refreshListofFW();
  }, [authToken]);}
/////

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
          <RadioButton onValueChange={handleChildValueChange} />
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={searchQuery ? filteredData : data}
            ListHeaderComponent={<TableHeader />}
            renderItem={({ item }) => <TableRow item={item} />}
            // keyExtractor={item => item.empId.toString()}
            keyExtractor={item => item.empId}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.card}>
        {selectedUser && <Card user={selectedUser} />}
      </View>
      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <AddFieldWorker saveModal={saveModal} districtId={districtId} onRefresh={refreshListofFW}/>
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

export default FieldWorkerScreen;
