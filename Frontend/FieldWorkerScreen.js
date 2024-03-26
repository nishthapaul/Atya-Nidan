import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Card from '../components/Card';
import RadioButton from '../components/RadioButton';
// Sample data


const TableHeader = () => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>ID</Text>
    <Text style={[styles.tableCell, { flex: 2 }, { fontWeight: 'bold' }]}>Name</Text>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>Taluka</Text>
    <Text style={[styles.tableCell, { flex: 1 }, { fontWeight: 'bold' }]}>Assigned</Text>
  </View>
);

const TableRow = ({ item }) => {
  console.log("item", item);
  return (<View style={styles.tableRow}>
    <Text style={[styles.tableCell, { flex: 1 }]}>{item.id}</Text>
    <Text style={[styles.tableCell, { flex: 2 }]}>{item.name}</Text>
    <Text style={[styles.tableCell, { flex: 1 }]}>{item.taluka}</Text>
    <Text style={[styles.tableCell, { flex: 1 }]}>True</Text>
  </View>)
};

const FieldWorkerScreen = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [valueFromRadio, setValueFromRadio] = useState(1);

  const handleSearch = (text) => {
    console.log(valueFromRadio);
    const filteredSearchData = data.filter((item) => {
      return valueFromRadio === 1 ?
        (item.name.toLowerCase().includes(text.toLowerCase())) :
        (item.taluka.toLowerCase().includes(text.toLowerCase()))
    }
    );
    setSearchQuery(text);
    setFilteredData(filteredSearchData);
  };
  const handleChildValueChange = (newValue) => {
    console.log("newValue: " , newValue);
    setSearchQuery("");
    setValueFromRadio(newValue);
  };

  useEffect(() => {
    // Make API call on component mount
    axios.get('http://10.0.2.2:3000/fieldWorker')
      .then(response => {
        // Update state with API data
        console.log("response", response);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View style={{marginTop: 20, marginBottom: 20,height:110 }}>
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
        <Card />
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
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'bold',
  },
  flatlist: {
    marginTop: 50,
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
});

export default FieldWorkerScreen;
