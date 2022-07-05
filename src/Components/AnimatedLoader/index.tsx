import React from 'react';
import LottieView from 'lottie-react-native';

import carLoading from '../../assets/loading_animation.json';

import { Container } from './styles';

export function AnimatedLoader() {
  return (
    <Container>
      <LottieView
        source={carLoading}
        style={{ height: 200 }}
        autoPlay
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
