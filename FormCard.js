import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

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
    const [formData, setFormData] = useState(
        {
            title: "Malaria",
            description: "life at risk",
            questions: [
                {
                    number: "Question1",
                    question: "fever",
                    optionType: "MultiSelect",
                    values: [
                        "high",
                        "low"
                    ]
                },
                {
                    number: "Question2",
                    question: "cold",
                    optionType: "CheckBox",
                    values: [
                        "yes",
                        "no"
                    ]
                }
            ]
        }
    );
    console.log("formData", formData);
    console.log("Patient id", id);
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
        height: 600,
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