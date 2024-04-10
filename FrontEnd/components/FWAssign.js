import React from 'react';
import {View, Switch, StyleSheet,Text,Pressable,Modal} from 'react-native';
import FWDeassign from './FWDeassignModal';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Adjust the import path as needed
import { API_PATHS } from '../constants/apiConstants';


export default  CustomSwitch = ({newdata , data}) => {
  const { authToken } = useAuth(); // Accessing the authToken
  const {available, id, name, talukaName} = newdata;
  console.log("InsideSwitch data" , data);
  console.log("taluka" , talukaName);
  const[Value, setValue] = React.useState(available);
  const[showModal, setShowModal] = React.useState(false);
  const[FWList ,setFWList] = React.useState(); 
  
  const filterItemsByTaluka = (data, talukaToFilter) => {
    return data.filter(fieldWorker => fieldWorker.taluka.name === talukaToFilter && fieldWorker.available === false);
}

    const closeModal = () => {
        setShowModal(false);
    }

    const AssignDeassign = (status) => {
        setValue(status);
    }
    
const handleDeassign = () => {
    console.log("Inside handledeassign");
    const filteredItems = filterItemsByTaluka(data, talukaName);
    console.log("filteredItems" ,filteredItems);
   const filteredItemsWithSelectedProperties = filteredItems.map(fieldworker => ({
        id: fieldworker.id,
        name:  `${fieldworker.firstName}${fieldworker.middleName ? ' ' + fieldworker.middleName : ''} ${fieldworker.lastName}`,
        talukaName: fieldworker.taluka.name,
        available:  fieldworker.available,
      }))
      console.log("Mapfilter",filteredItemsWithSelectedProperties);
      setFWList(filteredItemsWithSelectedProperties);
      setShowModal(true);
  }
  const handleAssign = () => {
    // console.log("API PAth" , API_PATHS.PUT_FIELDWORKER_ASSIGN);
    // const url = API_PATHS.PUT_FIELDWORKER_ASSIGN.replace(':fieldworkerId', id);
    // console.log("url" , url);
    // axios.put(url, {
    //   "available": true
    // }, {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`, // Include the token here
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {
    //   // Update state with API data
    //   console.log("response", response);
    //   console.log("response status", response.status);
    //   if(response.status === 200) {
    //     setValue(true);
    //   }
      
    // })
    // .catch(error => {
    //   console.error('Error in assign request :', error);
    // });
    setValue(true);
  }
 

    return (
      <View>
        <View style={styles.container}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={ Value ? '#e6edea' : '#f4f3f4'}
        value={Value}
        onValueChange = { Value ? handleDeassign : handleAssign}      
      />
       </View>
       {showModal && <FWDeassign mainid = {id} filteredData={FWList} visibleModal={showModal} closeModal={closeModal} talukaName = {talukaName} AssignDeassign={AssignDeassign}/>}
       </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
  });

