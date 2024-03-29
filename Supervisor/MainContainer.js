import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

// Screens
import FieldWorkerScreen from './screens/FieldWorkerScreen';
import StatsScreen from './screens/StatsScreen';
import DoctorScreen from './screens/DoctorScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'black',
          activeBackgroundColor: '#071A3D',
          labelStyle: { fontSize: 20, text: 'center', marginBottom: 12, fontWeight:'bold' },
        }}>
        <Tab.Screen
            name="FieldWorker"
            component={ FieldWorkerScreen }
          />
          <Tab.Screen
            name="Doctor" 
            component={ DoctorScreen } 
          />
          <Tab.Screen
            name="Stats" 
            component={ StatsScreen } 
          />
           <Tab.Screen
            name="Profile" 
            component={ ProfileScreen } 
          />

      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  // },
  text: {
    fontSize: 50,
    color: '#000',
  },
});

export default MainContainer;
