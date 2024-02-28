import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Card = ({user}) => {
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.userName}>{`${user.firstName} ${user.lastName}`}</Text>
          <View style={styles.userDetailRow}>
            <Text style={styles.userDetail}>DOB: {user.dob}</Text>
            <Text style={styles.userDetail}>Sex: Male</Text>
          </View>
          <Text style={styles.userDetail}>Contact No.: {user?.user?.phoneNumber} </Text>
          <Text style={styles.userDetail}>
            Email Id.: {user?.user?.email}
          </Text>
          <Text style={styles.userDetail}>
            Address: {user.address}
          </Text>
          <Text style={styles.userDetail}>Taluka Assigned: {user?.user?.name}</Text>
          <Text style={styles.userDetail}>
            Language known: Hindi, English, Punjabi
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <Image
            source={{ uri: 'https://i.postimg.cc/JDP5Gd1W/userpic.png' }}
            style={styles.userPic}
          />
        </View>
      </View>
      <View style={styles.adharCardContainer}>
        <Image
          source={{ uri: 'https://i.postimg.cc/5jSmryvR/adharcard.png' }}
          style={styles.adharCardImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#AED6F1',
    borderRadius: 20,
    padding: 20,
    margin: 40,
    shadowColor: '#000',
    height: 500,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 0.7,
  },
  rightColumn: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 16,
  },
  userPic: {
    width: 95,
    height: 100,
    backgroundColor: 'grey',
  },
  adharCardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  adharCardImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
});

export default Card;
