import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Home, Tall, Weight} from '../../screens';

export type rootStackParams = {
  home: {result: number};
  weight: undefined;
  tall: undefined;
};

const Stack = createSharedElementStackNavigator<rootStackParams>();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          gestureEnabled: false,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}},
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}>
        <Stack.Screen
          name="home"
          component={Home}
          initialParams={{result: undefined}}
        />
        <Stack.Screen name="weight" component={Weight} />
        <Stack.Screen name="tall" component={Tall} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;

const styles = StyleSheet.create({});
