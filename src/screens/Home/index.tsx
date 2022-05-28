import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AppRoutesParamList } from '../../@types/routes/stack.routes';
import { Car } from '../../components/Car';

import Logo from '../../assets/logo.svg';
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';

export function Home() {
  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  const carData = {
    id: 1,
    brand: 'Fiat',
    name: 'Uno',
    rent: {
      period: 'Diária',
      price: 100,
    },
    thumbnail:
      'https://beta.alpes.one/storage/app/uploads/public/608/ad6/90f/608ad690f418e968296549.png',
  };

  function handleNavigateToCarDetails() {
    navigation.navigate('CarDetails');
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleNavigateToCarDetails} />
        )}
      />
    </Container>
  );
}
