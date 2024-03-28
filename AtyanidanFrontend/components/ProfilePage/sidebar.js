// Sidebar.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';

const Sidebar = ({ handleMenuItemClick, selectedMenuItem }) => {
  return (
    <View style={styles.sidebar}>
      <Image 
        source={require('../assets/person1.jpeg')} // image from api
        style={styles.profileImage}
      />
      <MenuItem
        title="Basics"
        onPress={() => handleMenuItemClick('Basics')}
        isSelected={selectedMenuItem === 'Basics'}
      />
      <MenuItem
        title="Profile Photo"
        onPress={() => handleMenuItemClick('Profile Photo')}
        isSelected={selectedMenuItem === 'Profile Photo'}
      />
      <MenuItem
        title="Logout"
        onPress={() => handleMenuItemClick('Logout')}
        isSelected={selectedMenuItem === 'Logout'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 300, 
    backgroundColor: '#ddd',
    paddingTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black', 
    borderWidth: 2, 
  },
});

export default Sidebar;
