import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
export default RadioButton = ({ onValueChange }) => {
    console.log("I am radio component");
    const[radio, setRadio] = useState(1);
    const handleTouch = (event) =>  {
        console.log("Radio Event" , event);
        if(event == 1) 
            setRadio(1);
        if(event == 2)
            setRadio(2);
        onValueChange(event);
    };
    return( 
        <View style={styles.main}>
            <TouchableOpacity onPress = {() => handleTouch(1)}>
                <View style = {styles.radiowrapper}>
                    <View style={styles.radio}>
                        {
                            radio === 1 ? <View style={styles.radioBg}></View> : null
                        }
                    </View>
                    <Text style={styles.radioText}>Name</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => handleTouch(2)}>
                <View style = {styles.radiowrapper}>
                    <View style={styles.radio}>
                        {
                            radio === 2 ? <View style={styles.radioBg}></View> : null
                        }
                        </View>
                    <Text style={styles.radioText}>Taluka</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create(
    {
        main: {
            flex : 1,
            flexDirection:'row',
            alignItems: 'stretch',
             justifyContent: 'center',
             gap:40,
        },
        radioText: {
            fontSize:20,
        },
        radio: {
            height:20,
            width:20,
            borderColor:'black',
            borderWidth: 2,
            borderRadius: 9,
            margin: 10,
        },
        radiowrapper: {
            flexDirection:'row',
            alignItems:'center',
        },
        radioBg: { 
            backgroundColor: 'lightblue',
            height:10,
            width:10,
            borderRadius: 15,
            margin: 4
        }
    }
)