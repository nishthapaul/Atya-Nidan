import { StyleSheet, View } from 'react-native';
import AppHeader from './components/AppHeader';
import MainContainer from './MainContainer';
import LoginScreen from './screens/LoginScreen';
import React, { useState , useEffect} from 'react';
import { AuthProvider } from './Context/AuthContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [authToken, setAuthToken] = useState('');
  const handleLoginSuccess = (role, token) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setAuthToken(token);

  };

  return (
    <AuthProvider>
    <View style={styles.container}>
    {isLoggedIn && <View style={styles.header}><AppHeader /></View>}
     {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : userRole === 'Admin' ? (
        <MainContainer authToken={authToken}/>
      ) : (
        // Optionally handle different roles here
        <View style={styles.header}><AppHeader/></View>
      )}
    </View>
    </AuthProvider>
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
