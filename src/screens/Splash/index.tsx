import React, { useEffect } from 'react';
import {
  NavigationProp,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { AppRoutesParamList } from '../../@types/routes/stack.routes';

import BrandSVG from '../../assets/brand.svg';
import LogoSVG from '../../assets/logo.svg';

import { Container } from './styles';

export function Splash() {
  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  const splashAnimation = useSharedValue(0);
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        { translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0]) },
      ],
    };
  });

  function startApp() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }],
      })
    );
  }

  useEffect(() => {
    const ONE_SECOND = 1000;
    splashAnimation.value = withTiming(50, { duration: ONE_SECOND }, () => {
      'worklet';
      runOnJS(startApp)();
    });
  }, []);

  return (
    <Container>
      <StatusBar style="light" />
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSVG width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSVG width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
