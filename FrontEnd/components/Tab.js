import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';

const Tab = (props) => {
        return (
    <TouchableOpacity
          style={styles.button}
          activeOpacity={ 0.9 }
        >
          <Text style={styles.buttonText}>{props.name}</Text>
        </TouchableOpacity>);
}
const styles = StyleSheet.create(
    {
        button: {
            backgroundColor: "#C3E7F5",
            width: 427,
            height: 80,
            borderWidth: 3,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          },
          buttonText: {
            fontFamily: "monospace",
            fontSize: 28,
            fontWeight: "900",
            marginLeft: 11
          },
    }
)
export default Tab;