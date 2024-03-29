import { View, Text ,component} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import FormScreen  from '../Screens/FormScreen/FormScreen'
import StatsScreen from '../Screens/StatsScreen/StatsScreen'
import { NavigationContainer } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Utils/Colors'



const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <NavigationContainer>
    <Tab.Navigator screenOptions={ {
        headerShown:false

    }}>
      <Tab.Screen name="Home" component = {HomeScreen}
      options={{
        tabBarActiveBackgroundColor:'#003366',
        tabBarIcon:({color,size})=>(
            <Entypo name="home" size={24} color="black" />
        )
      }}
      />
      <Tab.Screen name="form" component={FormScreen} 
      options={{
        tabBarActiveBackgroundColor:'#003366',
        tabBarIcon:({color,size})=>(
            <AntDesign name="form" size={14} color="black" />
        )
      }}

      />
      <Tab.Screen name="stats" component={StatsScreen} 
      options={{
        tabBarActiveBackgroundColor:'#003366',
        tabBarIcon:({color,size})=>(
            <Ionicons name="stats-chart" size={24} color="black" />
        )
      }}
      />

    </Tab.Navigator>
    </NavigationContainer>

  )
}