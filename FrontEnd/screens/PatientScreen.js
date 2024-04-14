import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { API_PATHS } from '../constants/apiConstants';
import { useAuth } from '../Context/AuthContext'; 

const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 3 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Taluka</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Condition</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Last Visit</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Field Worker</Text>
  </View>
);

const PatientScreen = () => {
  const { authToken } = useAuth(); // Accessing the authToken
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    // Your search logic here
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
            <TouchableOpacity>
              <View style={styles.circle}>
                <Icon name="plus" type="font-awesome" color="black" />
              </View>
            </TouchableOpacity>
            <View style={styles.flatlist}>
              <FlatList
                data={searchQuery ? filteredData : data}
                ListHeaderComponent={<TableHeader />}
                renderItem={({ item }) => <TableRow item={item} />}
                keyExtractor={item => item.empId}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </View>
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
    marginTop: 0,
    flex: 2,
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft:20
  },
  list: {
    flex: 0.55,
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
