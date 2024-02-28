import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

const logoUrl = 'https://i.postimg.cc/pm3Fvy3H/logo.png';

const FixedHeader = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: logoUrl }} style={styles.logo} />
          </View>
          <Text style={styles.appName}>Dummy App Name</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.initial}>S</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D1F2EB',
    marginTop: 35,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 70
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#071A3D',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  initial: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  logoContainer: {
    width: 100,
    height: 40,
  },
  logo: {
    width: 80,
    height: 50,
  },
});

export default FixedHeader;
