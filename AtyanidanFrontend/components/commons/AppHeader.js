import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AppHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../assets/appandname.png')} style={styles.appLogo} />
      <Image source={require('../assets/icons/HomeIcon.png')} style={styles.homeIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C3E7F5',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  appLogo: {
    height: 60, // Adjust the size as needed
    width: 300, // Adjust the size as needed
    resizeMode: 'contain',
  },
  homeIcon: {
    height: 30, // Adjust the size as needed
    width: 30, // Adjust the size as needed
    resizeMode: 'contain',
  },
});

export default AppHeader;