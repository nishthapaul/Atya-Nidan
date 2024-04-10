// MenuItem.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MenuItem = ({ title, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isSelected && styles.selectedMenuItem]}
      onPress={onPress}>
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
  },
  selectedMenuItem: {
    backgroundColor: '#ADD8E6',
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default MenuItem;
