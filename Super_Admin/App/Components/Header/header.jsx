import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AppHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={require('../../../assets/Images/appandname.png')} style={styles.appLogo} />
      <Image source={require('../../../assets/Images/unnamed.png')} style={styles.homeIcon} />
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
    height: 60, 
    width: 300, 
    resizeMode: 'contain',
  },
  homeIcon: {
    height: 50, 
    width: 50, 
    resizeMode: 'contain',
  },
});

export default AppHeader;