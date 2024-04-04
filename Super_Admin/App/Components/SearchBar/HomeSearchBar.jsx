import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const SearchBar = () => {
  const [data, setData] = useState([]);

  const searchUser = async (text) => {
    try {
      let url;
      if (text.trim() !== '') {
        // If search text is provided
        if (text.trim() !== '') {
          // Condition based on some criteria
          url = `http://172.20.10.4:3000/admins?Name=${text}`;
        } else {
          // Default condition
          url = `http://172.20.10.4:3000/admins?District=${text}`;
        }
      } else {
        // If no search text provided, fetch all data
        url = `http://172.20.10.4:3000/admins`;
      }
  
      let result = await fetch(url);
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
  
      result = await result.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Admins"
        onChangeText={(text) => searchUser(text)}
      />
      <View style={styles.tableRow}>
        <Text style={styles.columnHeader}>ID</Text>
        <Text style={styles.columnHeader}>Name</Text>
        <Text style={styles.columnHeader}>District</Text>
      </View>
      {data.length ? (
        data.map((item) => (
          <View style={styles.tableRow} key={item.id}>
            <Text style={styles.columnData}>{item.id}</Text>
            <Text style={styles.columnData}>{item.Name}</Text>
            <Text style={styles.columnData}>{item.District}</Text>
          </View>
        ))
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No results found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  columnData: {
    flex: 1,
    marginLeft: 10,
  },
  noResultsContainer: {
    alignSelf: 'center',
    marginVertical: 100,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchBar;
