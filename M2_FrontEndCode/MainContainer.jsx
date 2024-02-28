import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

// Screens
import FieldWorker from './screens/FieldWorker';
import FormsScreen from './screens/FormsScreen';
import StatsScreen from './screens/StatsScreen';
import DoctorScreen from './screens/DoctorScreen';

//Screen names
const fieldworker = "FIELD WORKERS";
const forms = "FORMS";
const stats = "STATS";
const doctor = "DOCTOR";

const Tab = createBottomTabNavigator(); //object of createbotto

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={fieldworker}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'black',
          activeBackgroundColor: '#071A3D',
          labelStyle: { fontSize: 15, text: 'center', marginBottom: 12 },
        }}>

        <Tab.Screen name={fieldworker} component={FieldWorker} />
        <Tab.Screen name={forms} component={FormsScreen} />
        <Tab.Screen name={stats} component={StatsScreen} />
        <Tab.Screen name={doctor} component={DoctorScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 30,
    color: '#000',
  },
});

export default MainContainer;
