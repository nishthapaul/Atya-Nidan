import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];

const DropdownComponent = ({list, returnValue}) => {
console.log("Inside Dropdown" , list)
        const [name, setName] = useState();
//   const [status, setStatus] = useState(null);
//   const [id,setID] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const setValue = (item) => {
    setName(item.name);
    console.log("setValueid" , item.id);
    console.log("setValueAvailable" , item.available);
    returnValue({id: item.id, available: item.available});
    setModalVisible(false);
}

  const renderModalItems = () => {
    return list.map(item => (
      <TouchableOpacity
        key={item.id}
        style={styles.modalItem}
        onPress={() => setValue(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdown, name ? { borderColor: 'blue' } : null]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedText}>{name ? name : 'Select Field Worker'}</Text>
        <AntDesign
          style={styles.icon}
          color={name ? 'blue' : 'black'}
          name="Safety"
          size={20}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {renderModalItems()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  selectedText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    overflow: 'hidden',
    minHeight:200
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
