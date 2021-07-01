import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {IHomeRouteProp, IhomeTypeNav} from '../constant/type/navType';

const home = () => {
  const SwipeX = useSharedValue(0);
  const [swipeCW, setSwipeCW] = useState(0);
  const navigation = useNavigation<IhomeTypeNav>();
  const result = useRoute<IHomeRouteProp>().params.result || 0;

  const resultRound = Number(result.toFixed(2));

  const bmiStatus = () => {
    if (resultRound < 18.5) return 'waawww,, So skinny';
    else if (resultRound >= 18.5 && resultRound <= 24.9)
      return 'good, your weight is normal';
    else if (resultRound >= 25 && resultRound <= 29.9)
      return 'do diet, and some exercise';
    return `you are obese  (._."( `;
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = SwipeX.value;
    },
    onActive: (event, ctx) => {
      if (event.translationX < 0) return;
      SwipeX.value = ctx.startX + event.translationX;
    },
    onEnd: _ => {
      if (SwipeX.value >= swipeCW / 2 - 30)
        return (SwipeX.value = withTiming(swipeCW - 70, {duration: 200}, () => {
          runOnJS(navigation.navigate)({name: 'tall', params: undefined});
        }));
      SwipeX.value = withTiming(0);
    },
  });

  const aniSwipeStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: SwipeX.value}],
    };
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      SwipeX.value = 0;
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {!!result ? (
          <>
            <Text style={styles.textResult}>{resultRound}</Text>
            <Text style={styles.textExplain}>{bmiStatus()}</Text>
          </>
        ) : (
          <Text style={styles.textResult}>Wellcome</Text>
        )}
      </View>
      <View style={styles.bottomSection}>
        <View
          onLayout={e => setSwipeCW(e.nativeEvent.layout.width)}
          style={styles.swipeContainer}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.sweeper, aniSwipeStyle]} />
          </PanGestureHandler>
          <Text style={{position: 'absolute'}}>Swipe Right</Text>
        </View>
      </View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fafaff'},
  topSection: {
    height: 300,
    backgroundColor: '#38B8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingHorizontal: 10,
  },
  bottomSection: {flex: 1, justifyContent: 'flex-end'},
  textResult: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
  },
  textExplain: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  swipeContainer: {
    height: 60,
    backgroundColor: '#33aaff55',
    alignSelf: 'stretch',
    bottom: 120,
    marginHorizontal: 30,
    borderRadius: 999,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sweeper: {
    height: '100%',
    width: 70,
    left: 0,
    position: 'absolute',
    backgroundColor: '#6699cc',
  },
});
