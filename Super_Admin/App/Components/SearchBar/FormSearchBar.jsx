import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';

const FormListScreen = () => {
  const [forms, setForms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_URL_HERE');
        const data = await response.json();
        setForms(data.forms);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchData();
  }, []);

  const filteredForms = forms.filter(form =>
    form.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSelect = (formId) => {
    
  };

  const handleAddNewForm = () => {
    // Navigate to the screen where you can add a new form
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Forms"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Button title="Add New Form" onPress={handleAddNewForm} />
      </View>
      <FlatList
        data={filteredForms}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFormSelect(item.id)}>
            <Text style={styles.formItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  formItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default FormListScreen;
