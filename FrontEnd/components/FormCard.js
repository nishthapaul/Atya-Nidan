import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useAuth } from '../Context/AuthContext'; // Adjust the import path as needed
import { API_PATHS } from '../constants/apiConstants';
import axios from 'axios';


const CustomCheckbox = ({ labelValue, index }) => {
    return (
        <View style={styles.checkboxContainer} key={`${labelValue}-${index}`}>
            <CheckBox
                value={false}
                iconRight
        iconType="material"
        checkedIcon="check-box"
        uncheckedIcon="check-box-outline-blank"
        uncheckedColor="black"
        containerStyle={styles.checkbox}
                disabled={true}
            />
            <Text style={styles.label}>{labelValue}</Text>
        </View>
    );
};

const CustomRadioButton = ({ labelValue, index }) => {
    return (
        <View style={styles.radiowrapper} key={`${labelValue}-${index}`}>
            <View style={styles.radio}></View>
            <Text style={styles.radioText}>{labelValue}</Text>
        </View>
    );
};

export default FormCard = ({ id }) => {
    const [formData, setFormData] = useState([]);
    const { authToken } = useAuth(); // Accessing the authToken

        // {
        //     title: "Malaria",
        //     description: "life at risk",
        //     questions: [
        //         {
        //             number: "Question1",
        //             question: "fever",
        //             optionType: "MultiSelect",
        //             values: [
        //                 "high",
        //                 "low"
        //             ]
        //         },
        //         {
        //             number: "Question2",
        //             question: "cold",
        //             optionType: "CheckBox",
        //             values: [
        //                 "yes",
        //                 "no"
        //             ]
        //         }
        //     ]
        // }

    // useEffect(() => {
    //     console.log("Inside FormCard API get");
    //     const getformcard = API_PATHS.GET_FORM_CARD_DETAILS.replace(':form-definition-id', id)
    //     axios.get(getformcard, {
    //       headers: {
    //         Authorization: `Bearer ${authToken}` 
    //       }
    //     })
    //     .then(response => {
    //         console.log("Form id",id);
    //         setFormData(response.data);     
    //     })
    //     .catch(error => {
    //       console.error('Error fetching data:', error);
    //     });
    //   }, [authToken]); 

    // console.log("formData", formData);
    // console.log("Patient id", id);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const formResponse = await axios.get(API_PATHS.GET_FORM_CARD_DETAILS.replace(':form-definition-id', id), {
              headers: {
                Authorization: `Bearer ${authToken}`, 
              }
            });
            setFormData(formResponse.data);
          } catch (error) {
            console.log('Error fetching lists:', error);
          } 
        };
      
        fetchData();
      }, [authToken, id]); 
    console.log("formData", formData);
    console.log("Form id", id);


    return (
        <View style={styles.card}>
             <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="never" showsVerticalScrollIndicator={false}>
            <View style={styles.heading}>
                <Text style={styles.title}> {formData.title}</Text>
                <Text style={styles.description}>{formData.description}</Text>
            </View>
            <View style={styles.quesCard}>
                <View>
                <Text style={styles.title}>Patient's Detials</Text>
                <Text>Name: </Text>
                <Text>DOB:</Text>
                <Text>Address:</Text>
                <Text>Gender:</Text>
                <Text>bloodGroup:</Text>
                <Text>phoneNumber:</Text>
                </View>
                
            </View>

{formData.questions && formData.questions.map((item, index) => (
    <View style={styles.quesCard} key={`${item.number}-${index}`}>
        <View>
            <View>
                <Text style={styles.quesStyle}>{`${item.number}: ${item.question}`}</Text>
            </View>
            {item?.values && item.values.map((value, idx) => (
                item.optionType == 'CheckBox' ?
                <CustomCheckbox labelValue={value} key={`${item.number}-${item.optionType}-${idx}`} />:
                <CustomRadioButton labelValue={value} key={`${item.number}-${item.optionType}-${idx}`} />

            ))}
        </View>
    </View>
))}
<View style={styles.quesCard}>
    <CustomRadioButton labelValue= { "Healthy" } key={1}/>
    <CustomRadioButton labelValue= { "Unhealthy" } key={2}/>
</View>
<View style={styles.quesCard}>
    <Text>Patient's Health Remarks:</Text>
</View>
</ScrollView>
</View>

);
}
const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        height: 550,
        width: 550,
        borderWidth: 2,
        borderColor: 'purple',
        borderTopWidth: 20,
        borderTopColor: 'purple',
        borderTopStyle: 'solid',
        backgroundColor: '#eee',
    },
    heading: {

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 20,
        padding: 4,
    },
    quesCard: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'green',
    },
    quesStyle: {
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        // backgroundColor: 'blue',
    },
    // checkbox: {
    //     // alignSelf: 'center',
    //     width: 200,
    //     height: 200,
        
    // },
    label: {
        alignSelf: 'center',
        width: 300,
        fontSize: 16,
    },
    radioText: {
        fontSize:16,
    },
    radio: {
        height:14,
        width:14,
        borderColor:'black',
        borderWidth: 2,
        borderRadius: 9,
        margin: 10,
    },
    radiowrapper: {
        flexDirection:'row',
        alignItems:'center',
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0, // Remove default border
        padding: 4, // Adjust padding as needed
        margin: 0, // Adjust margin as needed
      },
      scrollView: {
        height: 600,
    },
})