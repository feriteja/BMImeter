import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {ItallTypeNav} from '../constant/type/navType';
import {useMeasureBody} from '../config/context';

const AniIconEntypo = Animated.createAnimatedComponent(IconEntypo);

const tall = () => {
  const [height, setHeight] = useState(0);
  const swipeX = useSharedValue(0);
  const navigation = useNavigation<ItallTypeNav>();
  const {action} = useMeasureBody();

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
    const heightInterpolate = interpolate(swipeX.value, [0, 270], [50, 250]);
    runOnJS(setHeight)(heightInterpolate);
  }, [swipeX]);

  const aniSwipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: swipeX.value}],
    };
  });

  const aniManSize = useAnimatedStyle(() => {
    const size = interpolate(height, [50, 250], [150, 390]);

    return {
      fontSize: size,
    };
  });

  useEffect(() => {
    action.setHeight(height);
  }, [height]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <AniIconEntypo name="man" style={aniManSize} color="#fafaff" />
        <View style={{height: 50}} />
        <Text style={styles.textHeight}>{Math.round(height)} (cm)</Text>
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
              onPress={() => navigation.navigate('weight')}>
              <Text
                style={{fontWeight: 'bold', fontSize: 18, color: '#FF7B8B'}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default tall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7B8B',
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
