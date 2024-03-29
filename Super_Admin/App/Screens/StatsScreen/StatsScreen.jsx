import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import Header from '../../Components/Header/header'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.safearea}>
    <View>
        <Header/>
      <Text>StatsScreen</Text>
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    safearea:{
        safeArea: {
            flex: 1,
            backgroundColor: '#ADD8E6',
          }
    }
})