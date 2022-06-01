import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AppRoutesParamList } from '../../@types/routes/stack.routes';
import { Car } from '../../components/Car';
import { Loader } from '../../components/Loader';

import Logo from '../../assets/logo.svg';
import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CardDTO';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  function handleNavigateToCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
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

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleNavigateToCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
