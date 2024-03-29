import { StyleSheet, View } from 'react-native';
import AppHeader from './components/AppHeader';
import MainContainer from './MainContainer';

export default function App() {
  return (
    <View style={styles.container}>
     <View style = {styles.header}><AppHeader/></View>
     <MainContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'blue'
  },
  header: {
    flex : 0.1,
    backgroundColor: 'white'
  },
  middletext: {
    flex : 2,
  },
  // footer: {
  //   flexDirection: 'row',
  //   gap: 1,
  // }
  
});
