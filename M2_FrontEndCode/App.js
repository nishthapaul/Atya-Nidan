import * as React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import MainContainer from './MainContainer';
import FixedHeader from './FixedHeader';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <FixedHeader />
        <MainContainer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
