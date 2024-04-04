import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../Components/Header/header';
import SearchBar from '../../Components/SearchBar/HomeSearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        <SearchBar />
        {/* Add a placeholder view for the search results */}
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
