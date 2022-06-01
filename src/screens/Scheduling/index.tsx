import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AppRoutesParamList } from '../../@types/routes/stack.routes';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling() {
  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails');
  }

  return (
    <Container>
      <StatusBar style="light" />
      <Header>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
          color="shape"
        />
        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}>27/05/2022</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}>27/05/2022</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
