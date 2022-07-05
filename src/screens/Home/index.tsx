import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { AppRoutesParamList } from '../../@types/routes/stack.routes';
import { Car } from '../../components/Car';

import Logo from '../../assets/logo.svg';
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CardDTO';
import { AnimatedLoader } from '../../components/AnimatedLoader';

const AnimatedButton = Animated.createAnimatedComponent(MyCarsButton);

export function Home() {
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  function handleNavigateToCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  async function fetchCars() {
    try {
      const { data } = await api.get('/cars');

      setCars(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },

    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },

    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <AnimatedLoader />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleNavigateToCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={myCarsButtonStyle}>
          <AnimatedButton onPress={handleOpenMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={RFValue(32)}
              color={theme.colors.shape}
            />
          </AnimatedButton>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}
