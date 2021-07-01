import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import IconEntypo from 'react-native-vector-icons/Entypo';

import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/core';
import {IweightTypeNav} from '../constant/type/navType';
import Box from '../components/box';
import {useMeasureBody} from '../config/context';

const weight = () => {
  const [weight, setWeight] = useState(0);
  const swipeX = useSharedValue(0);
  const [numBox, setNumBox] = useState(0);
  const navigation = useNavigation<IweightTypeNav>();
  const {action, state} = useMeasureBody();

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = swipeX.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX + ctx.startX < 0) return;
      else if (event.translationX + ctx.startX > 300) return;
      swipeX.value = ctx.startX + event.translationX;
    },
    onEnd: _ => {},
  });

  useDerivedValue(() => {
    const heightInterpolate = interpolate(swipeX.value, [0, 270], [20, 200]);
    runOnJS(setWeight)(heightInterpolate);
    if (heightInterpolate > 19 && heightInterpolate <= 75) {
      runOnJS(setNumBox)(1);
    } else if (heightInterpolate > 75 && heightInterpolate <= 150) {
      runOnJS(setNumBox)(2);
    } else {
      runOnJS(setNumBox)(3);
    }
  }, [swipeX]);

  const aniSwipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: swipeX.value}],
    };
  });

  useEffect(() => {
    action.setWeight(weight);
  }, [weight]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={{justifyContent: 'flex-end'}}>
          {!!numBox &&
            [...Array(numBox).keys()].map((a, i) => (
              <Box totalBox={numBox} key={i} index={i} />
            ))}
        </View>

        <View style={{height: 50}} />
        <Text style={styles.textHeight}>{Math.round(weight)} (kg)</Text>
      </View>
      <View style={styles.botSection}>
        <View style={styles.sliderContainer}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.swiper, aniSwipeStyle]} />
          </PanGestureHandler>
        </View>
        <View style={{height: 30}} />
        <View>
          <View style={styles.navigation}>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => navigation.goBack()}>
              <IconEntypo name="chevron-left" size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() =>
                navigation.navigate('home', {
                  result: state.weight / Math.pow(state.height / 100, 2),
                })
              }>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: '#51C97A'}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default weight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51C97A',
  },
  topSection: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botSection: {
    flex: 2,
  },
  sliderContainer: {
    height: 20,
    backgroundColor: '#fafaff88',
    width: 320,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  swiper: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  textHeight: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 40,
  },
  buttonNext: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    paddingHorizontal: 90,
    paddingVertical: 10,
  },
  navigation: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
