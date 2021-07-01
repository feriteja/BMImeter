import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const box = ({index, totalBox}: {totalBox: number; index: number}) => {
  return (
    <View
      style={{
        height: 200 / (totalBox - index),
        width: 200 / (totalBox - index),
        backgroundColor: '#fafaff',
        marginVertical: 2,
        borderRadius: 20,
      }}>
      <Text></Text>
    </View>
  );
};

export default box;

const styles = StyleSheet.create({});
