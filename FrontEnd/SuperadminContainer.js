import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { API_PATHS } from './constants/apiConstants';

// Screens
import StatsScreen from './screens/StatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import FormScreen from './screens/FormScreen';
import AdminScreen from './screens/AdminScreen';


const Tab = createBottomTabNavigator();

function SuperadminContainer(props) {
  const [superadmin, setSuperAdmin] = React.useState([]);

    React.useEffect(() => {
    // Make API call on component mount
    console.log("employee id:", props.user.empId)
    const getuserinfo = API_PATHS.GET_USER_INFO.replace(':employeeId', props.user.empId)

    axios.get(getuserinfo, {
      headers: {
        Authorization: `Bearer ${props.authToken}`, 
        'Content-Type': 'application/json'// Use authToken for authentication
      },
    })
      .then(response => {
        // Update state with API data
        console.log('Response headers:', response.headers);
        console.log("response", response);
        console.log("response.data", response.data);

        setSuperAdmin(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.error('Backend error message:', error.response.data.message);

      });
  }, [props.authToken]);
  // console.log("admin.district.id:", admin.district.id);
   // Render the Tab.Navigator only when adminData is available
   if (superadmin.length === 0) {
    return null; // Render nothing while waiting for data
    } 

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
          name="Admins" 
          component={() => <AdminScreen stateId={superadmin.state.id} />} 
        />
        <Tab.Screen
            name="Forms"
            component={ FormScreen }
            // component={() => <FieldWorkerScreen districtId={admin.district.id} />}
            />
          
          <Tab.Screen
            name="Stats" 
            component={ StatsScreen } 
          />
          {/* {console.log("maincontainer admin: ", admin)} */}
          <Tab.Screen
            name="Profile" 
            component={() => <ProfileScreen
            data = {superadmin}/>} 
          />

      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    color: '#000',
  },
});

export default SuperadminContainer;
