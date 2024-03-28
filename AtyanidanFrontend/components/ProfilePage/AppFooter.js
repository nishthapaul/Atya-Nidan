import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppFooter = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        *By clicking Login, you are agreeing to App’s Terms of Service and are acknowledging our Privacy Notice applies.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#003366',
    padding: 10,
  },
  footerText: {
    color: '#ffffff',
    textAlign: 'left',
    fontSize: 14,
  },
});

export default AppFooter;
