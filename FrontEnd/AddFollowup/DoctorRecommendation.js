import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { init, db } from '../Database/database';  


const DoctorCard = ({ item }) => {
  const age = new Date().getFullYear() - new Date(item.dob).getFullYear();
  const name = `${item.firstName}${item.middleName ? ' ' + item.middleName : ''} ${item.lastName}`;

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userDetail}>Age: {age}</Text>
          <Text style={styles.userDetail}>Gender: {item.gender}</Text>
          <Text style={styles.userDetail}>Contact No: {item.phoneNumber}</Text>
          {/* <Text style={styles.userDetail}>Specialisation: {item.specialisationId}</Text> */}
          <Text style={styles.userDetail}>email: {item.email}</Text>
          <Text style={styles.userDetail}>Hospital Address: {item.hospitalAddress}</Text>
        </View>
      </View>
    </View>
  );
};

const DoctorsRecommendation = ({ saveModaldoc }) => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);

    // const fetchData = () => {
    //     db.transaction((tx) => {
    //       tx.executeSql(
    //         'SELECT * FROM demographics',
    //         [],
    //         (_, result) => {
    //           // Extract rows from the result
    //           const fetchedData = result.rows._array;
    //           setData(fetchedData);
    //         },
    //         (_, err) => {
    //           console.log('Failed to fetch data from demographics table:', err);
    //         }
    //       );
    //     });
    //   };
    
    //   useEffect(() => {
    //     fetchData(); // Fetch data from the demographics table on component mount
    //   }, []);


    // const [data, setData] = useState([]);

    useEffect(() => {
    const recdoctors = async () => {
      console.log("in");
      try {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM recommendations',
            [],
            (_, result) => { // Corrected to include the transaction object "_"
              console.log("inside results"); // Now this should correctly log
              const fetchedRec = result.rows._array;
              console.log('_______________________________________________');    
              console.log("Recommendations Data: ", fetchedRec);
              if (fetchedRec) {
                setData(fetchedRec); // Assuming you want the first match or there's only one match
              } else {
                console.log('No data recommendations');
              }
              // const formObject = JSON.parse(fetchedRec[0].formDefinition);
              // setFormDefinition(formObject);
            },
            (_, err) => {
              console.log('Failed to fetch selected user data from Form table:', err);
            }
          );
        });
      } catch (error) {
        console.error("Error fetching Form details:", error);
        alert('Failed to fetch Form details.');
      }
    };
    recdoctors();
  }, []);

    // const filteredData = doctorsData.filter(item =>
    //   item.specialisation.name.toLowerCase().includes(searchText.toLowerCase())
    // );
  
    return (
      <View style={styles.page}>
        <View style = {styles.row}>
          <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="🔍 Search by specialisation..."
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
        </View>
        <TouchableOpacity onPress={saveModaldoc}>
            <Text style={styles.backbutton}>Back</Text>
          </TouchableOpacity>
        </View>
        
        {/* <TouchableOpacity onPress={saveModaldoc}>
            <Text style={styles.backbutton}>Close</Text>
        </TouchableOpacity> */}
        <FlatList
          data={data}
          renderItem={DoctorCard}
          keyExtractor={item => item.empId}
          numColumns={2} // Add this line to display 2 cards in a row
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  card: {
    backgroundColor: "#B8D4D8",
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
    width: '45%', // Adjust this to change the width of the card
    margin: '2.5%', // Adjust this to add space between the cards
    height: 250, // Adjust this to change the height of the card
  },
  container: {
    flexDirection: "row",
  },
  leftColumn: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDetail: {
    fontSize: 16,
  },
  image: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10, // Added for spacing between image and text content
  },
  searchBarContainer: {
    alignItems: 'center', // Add this line to center the search bar horizontally
    margin: 10,
    paddingTop : 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 20, // Add this line to make the search bar rounded
    backgroundColor: '#F0F0F0', // Add this line to change the background color of the search bar
    width: '150%', // Add this line to change the width of the search ba
    marginLeft: 250,
  },
  backbutton: {
    backgroundColor: '#ddd',
    fontSize: 15,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default DoctorsRecommendation;
