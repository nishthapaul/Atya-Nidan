import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import DoctorCard from '../components/DoctorCard';
import RadioButton from '../components/RadioButton';
import AddUser from '../AddUser/AddUser';
import { API_PATHS } from '../constants/apiConstants';

// Sample data

const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Taluka</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Specialization</Text>
  </View>
);
const DoctorScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [valueFromRadio, setValueFromRadio] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    console.log("item", item);
    return (
      <Pressable onPress={() => onSelectUser(item)}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { flex: 1 }]}>{item.id}</Text>
          <Text style={[styles.tableCell, { flex: 3 }]}>{`${item.firstName}${item.middleName ? ' ' + item.middleName : ''} ${item.lastName}`}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.taluka.name}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{item.specialisation.name}</Text>
        </View>
      </Pressable>
    )
  };
  useEffect(() => {
    // Make API call on component mount
    // axios.get('https://459e-119-161-98-68.ngrok-free.app/atyanidan/health/api/districts/1/doctors')
    const getdoclist = API_PATHS.GET_DOCTORS_BY_DISTRICTS.replace(':districtId', 1)
    axios.get(getdoclist)
      .then(response => {
        // Update state with API data
        console.log("response", response);
        setData(response.data);
        setSelectedUser(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
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
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.card}>
        {selectedUser && <DoctorCard user={selectedUser} />}
      </View>
      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <AddUser saveModal={saveModal}/>
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
    fontSize: 18,
    fontStyle: 'bold',
    justifyContent: 'center',
  },
  flatlist: {
    marginTop: 50,
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
});

export default DoctorScreen;