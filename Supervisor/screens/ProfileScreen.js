import React, { useState, useRef, useEffect } from 'react';
import { Alert, ScrollView, View,  StyleSheet, SafeAreaView } from 'react-native';
import Sidebar from '../ProfilePage/sidebar';
import ProfileContent from '../ProfilePage/ProfileContent';
import ProfilePhotoModal from '../ProfilePage/ProfilePhotoModal';

export default function ProfileScreen({ navigation , data}) {
    console.log("data" , data);
    //const { adminData } = route.params
   // console.log("profile_adminData" , adminData);
    const [district, setDistrict] = useState(data.district.name);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [firstName, setFirstName] = useState(data.firstName);
    const [middleName, setMiddleName] = useState(data.middleName);
    const [lastName, setLastName] = useState(data.lastName);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Basics');
    const [address, setAddress] = useState(data.homeAddress);
    const [age, setAge] = useState('49');
    const [contactNumber, setContactNumber] = useState(data.phoneNumber);
    const [gender, setGender] = useState(data.gender);
    const [dateOfBirth, setDateOfBirth] = useState(data.dob);
    const [officeAddress, setOfficeAddress] = useState(data.officeAddress);
    const [bloodGroup, setBloodGroup] = useState('AB+');
    const [emailId, setEmailId] = useState(data.email);
    const [nearestRailwayStation, setNearestRailwayStation] = useState('Nearest Railway Station');
    const [languagesKnown, setLanguagesKnown] = useState('English, Spanish, Mandarin');

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    const scrollViewRef = useRef();
    const [tableData, setTableData] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    // useEffect(() => {
    //     console.log("inside useeffect")
    //     fetch("https://1736-103-156-19-229.ngrok-free.app/atyanidan/users/9650644204")
    //         .then((response) => {
    //             console.log("response", response);
    //             return response.json()
    //         })
    //         .then((data) => {
    //             console.log("fetch_data", data);
    //             setTableData(data);
    //             setSelectedUser(data[0]);
    //         })
    //         .catch((error) => console.error("Error fetching data:", error));
    // }, []);

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
        if (menuItem === 'Basics' && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0 });
        }
        if (menuItem === 'Logout') {
            Alert.alert(
                'Log Out',
                'Are you sure you want to log out?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Confirm',
                        onPress: () => console.log('Confirm Pressed'), // actual logout logic from nishtha
                    },
                ],
                { cancelable: false }
            );
        } else {
            setSelectedMenuItem(menuItem);
            if (menuItem === 'Basics' && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0 });
            }
        }
        if (menuItem === 'Profile Photo') {
            setIsModalVisible(true);
        } else if (menuItem === 'Logout') {
            Alert.alert(
                'Log Out',
                'Are you sure you want to log out?',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'Confirm', onPress: () => console.log('Confirm Pressed') },
                ],
                { cancelable: false }
            );
        } else {
            setSelectedMenuItem(menuItem);
            if (menuItem === 'Basics' && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0 });
            }
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Sidebar */}
                <View style={{ flex: 0, flexDirection: 'row' }}>
                    <Sidebar
                        handleMenuItemClick={handleMenuItemClick}
                        selectedMenuItem={selectedMenuItem}
                    />
                </View>

                {/* Main Content */}
                <ScrollView ref={scrollViewRef} style={styles.mainContent} alwaysBounceVertical={false}>
                    <ProfileContent
                        firstName={firstName}
                        setFirstName={setFirstName}
                        middleName={middleName}
                        setMiddleName={setMiddleName}
                        lastName={lastName}
                        setLastName={setLastName}
                        address={address}
                        setAddress={setAddress}
                        contactNumber={contactNumber}
                        setContactNumber={setContactNumber}
                        emailId={emailId}
                        setEmailId={setEmailId}
                        languagesKnown={languagesKnown}
                        setLanguagesKnown={setLanguagesKnown}
                        dateOfBirth={dateOfBirth}
                        setDateOfBirth={setDateOfBirth}
                        gender={gender}
                        setGender={setGender}
                        district={district}
                        setDistrict={setDistrict}
                        officeAddress={officeAddress}
                        setOfficeAddress={setOfficeAddress}
                    />
                </ScrollView>
            </View>
            <ProfilePhotoModal isVisible={isModalVisible} onClose={toggleModal} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#fff',
    },

});