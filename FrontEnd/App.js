import { StyleSheet, View } from 'react-native';
import AppHeader from './components/AppHeader';
import MainContainer from './MainContainer';
import LoginScreen from './screens/LoginScreen';
import React, { useState , useEffect} from 'react';
import { AuthProvider } from './Context/AuthContext';
import { LogBox } from 'react-native';
import SuperadminContainer from './SuperadminContainer';
import DoctorContainer from './DoctorContainer';
import FieldWorkerContainer from './FieldWorkerContainer';
export default function App() {
  LogBox.ignoreAllLogs();


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const handleLoginSuccess = (user, token) => {
    setIsLoggedIn(true);
    setUser(user);
    setAuthToken(token);
  };

  return (
    <AuthProvider>
    <View style={styles.container}>
    {isLoggedIn && <View style={styles.header}><AppHeader /></View>}
     {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : user.role === 'Admin' ? (
        <MainContainer authToken={authToken} user={user}/>
      ) : user.role === 'SuperAdmin' ? (
        <SuperadminContainer authToken={authToken} user={user}/>
      ) : user.role === 'Doctor' ? (
        <DoctorContainer authToken={authToken} user={user}/>
      ) : user.role === 'FieldWorker' ? (
        <FieldWorkerContainer authToken={authToken} user={user}/>
      ) : (
        <View style={styles.header}><AppHeader/></View>
      ) }
    </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'white'
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
