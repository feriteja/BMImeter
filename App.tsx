import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Router from './src/config/router';
import MeasureContext from './src/config/context';

const App = () => {
  return (
    <MeasureContext>
      <View style={styles.container}>
        <Router />
      </View>
    </MeasureContext>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaff',
  },
});
