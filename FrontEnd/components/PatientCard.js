import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const PatientCard = ({ user }) => {
  const name = `${user.patientNumber}: ${user.demographic.firstName}${
    user.demographic.middleName ? " " + user.demographic.middleName : ""
  } ${user.demographic.lastName}`;
  //   const knownLanguages = `${user.languageKnown1}${user.languageKnown2 ? ' ' + user.languageKnown2 : ''}${user.languageKnown3 ? ' ' + user.languageKnown3 : ''}`;
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(user.demographic.dob);
  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.userDetailRow}>
            <Text style={styles.userDetail}>
              <Text style={{ fontWeight: "bold" }}>DOB: </Text>
              {user.demographic.dob}
            </Text>
            <Text style={styles.userDetail}>
              <Text style={{ fontWeight: "bold" }}>Sex: </Text>
              {user.demographic.gender}
            </Text>
          </View>
          <Text style={styles.userDetail}>
            <Text style={{ fontWeight: "bold" }}>Contact No.: </Text>
            {user.demographic.phoneNumber}{" "}
          </Text>
          <Text style={styles.userDetail}>
            <Text style={{ fontWeight: "bold" }}>Blood Group: </Text>
            {user.demographic.bloodGroup}
          </Text>
          <Text style={styles.userDetail}>
            <Text style={{ fontWeight: "bold" }}>Address: </Text>
            {user.demographic.address}
          </Text>
          <Text style={styles.userDetail}>
            <Text style={{ fontWeight: "bold" }}>Taluka: </Text>
            {user.demographic.taluka.name}
          </Text>
          <Text style={styles.userDetail}>
          <Text style={styles.userDetail}><Text style={{fontWeight: 'bold'}}>Age: </Text>{age}</Text>
          </Text>
        </View>
        <View style={styles.rightColumn}>
          <Image
            source={require("../assets/adminpic.png")}
            style={styles.userPic}
          />
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
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#B8D4D8",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
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
    flexDirection: "row",
  },
  leftColumn: {
    flex: 0.7,
  },
  rightColumn: {
    flex: 0.3,
    alignItems: "flex-end",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDetailRow: {
    flexDirection: "row",
    gap: 100,
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 18,
  },
  userPic: {
    width: 160,
    height: 160,
    backgroundColor: "grey",
  },
  adharCardImage: {
    height: 250,
    width: 450,
    resizeMode: "cover",
    backgroundColor: "pink",
    marginTop: 10,
    marginLeft: 45,
  },
});

export default PatientCard;
