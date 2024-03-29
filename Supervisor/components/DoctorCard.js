import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default DoctorCard = ({ user }) => {
    
    console.log("name", user.name);
    return(
        <View style={styles.card}>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.userDetailRow}>
              <Text style={styles.userDetail}>Age: 34</Text>
              <Text style={styles.userDetail}>Sex: Male</Text>
            </View>
            <Text style={styles.userDetail}>Contact No.: {' +91905537844'} </Text> 
            <Text style={styles.userDetail}>
              Email Id : {'email@email.com'}
            </Text>
            <Text style={styles.userDetail}>
              Clinic Address : {'House No. 1891, Faridabad, Haryana'}
            </Text>
            <View style = {styles.abc}>
            <Text style={styles.userDetail}>Taluka :  {'Thankle'}</Text>
            <Text style={styles.userDetail}>Specialization :  {'Internits'}</Text>
            </View>
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
        <View>
          <Image
            source={{ uri: 'https://i.postimg.cc/5jSmryvR/adharcard.png' }}
            style={styles.adharCardImage}
          />
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    card: {
      backgroundColor: '#B8D4D8',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      height: 530,
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
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    userDetailRow: {
      flexDirection: 'row',
      gap:120,
      marginBottom: 5,
    },
    userDetail: {
      fontSize: 18,
      marginTop: 3,
    },
    userPic: {
      width: 160,
      height: 160,
      backgroundColor: 'grey',
    },
    adharCardImage: {
        height: 270,
        width: 450,
        resizeMode: "cover",
        backgroundColor: 'pink',
        marginTop: 10,
        marginLeft: 45,
        
    },
    abc: {
        flexDirection  : 'row',
        gap: 120,
    }
  });