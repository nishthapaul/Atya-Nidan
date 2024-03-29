import React from 'react';
import { View, Image, StyleSheet,TouchableOpacity } from 'react-native';

const AppHeader = () => {

  const handleImagePress = () => {
    console.log('Image clicked!');
  };

  return (
    <View style={styles.header}>
      <Image source={require('../assets/appandname.png')} style={styles.appLogo} />
      <TouchableOpacity onPress={handleImagePress}>
      <Image source={require('../assets/icons/HomeIcon.png')} style={styles.homeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DFF4F3',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  appLogo: {
    height: 60, 
    width: 300, 
    resizeMode: 'contain',
  },
  homeIcon: {
    height: 30, 
    width: 30, 
    resizeMode: 'contain',
  },
});

export default AppHeader;