import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../Components/Header/header';
import SearchBar from '../../Components/SearchBar/FormSearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FormScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <SearchBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  container: {
    flex: 1,
    backgroundColor: 'white', 
    paddingHorizontal: 20, 
    paddingTop: 10, 
  }
});
