import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';

export default PatientCardFW = ({ user }) => {
    console.log("Patient user", user);
    const name = `${user.firstName}${user.middleName ? ' ' + user.middleName : ''} ${user.lastName}`;
    return(
    <View style = {styles.card}>
        <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.userDetailRow}>
            <Text style={styles.userDetail}><Text style={{fontWeight: 'bold'}}>Age: </Text>{user.age}</Text>
            <Text style={styles.userDetail}><Text style={{fontWeight: 'bold'}}>Sex: </Text>{user.sex}</Text>
          </View>
          <Text style={styles.userDetail}><Text style={{fontWeight: 'bold'}}>Contact No.: </Text>{user.phone} </Text>
          <Text style={styles.userDetail}>
          <Text style={{fontWeight: 'bold'}}>Email Id.: </Text>{user.EmailId}
          </Text>
          <Text style={styles.userDetail}>
          <Text style={{fontWeight: 'bold'}}>Address: </Text>{user.Address}
          </Text>
          <Text style={styles.userDetail}><Text style={{fontWeight: 'bold'}}>Taluka Assigned: </Text>{user.Taluka}</Text>
          <Text style={styles.userDetail}>
          <Text style={{fontWeight: 'bold'}}>Blood Group: </Text>{user.bloodgroup}
          </Text>
        </View>
        <View style={styles.rightColumn}>
        <Image
            source={require("../assets/adminpic.png")}
            style={styles.userPic}
          />
          <TouchableOpacity style={styles.expandButton}>
            <View>
            <Text style={styles.expandText}>Expand</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
        <View>
        <Image
          source={require("../assets/FW_ID.png")}
          style={styles.adharCardImage}
        />
      </View>
    </View>
    );

}
const styles = StyleSheet.create({
card : {
    backgroundColor: '#B8D4D8',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      height: 270,
      width: 550,
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
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDetailRow: {
    flexDirection: 'row',
    gap:100,
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 18,
    marginTop: 3,
  },
  rightColumn: {
    flex: 0.3,
    alignItems: 'flex-end',
  },
  userPic: {
    width: 160,
    height: 160,
    backgroundColor: 'grey',
  },
  expandButton: {
    backgroundColor: '#ffcc00',
    alignSelf:'center',
    marginTop: 5,
    borderRadius: 10,
  },
  expandText: {
    fontSize: 20,
    fontStyle: 'bold',
  },
  adharCardImage: {
    height: 250,
    width: 450,
    resizeMode: "cover",
    backgroundColor: 'pink',
    marginTop: 50,
    marginLeft: 45,
    
},
})