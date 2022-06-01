import React from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AppRoutesParamList } from '../../@types/routes/stack.routes';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Accessories,
  RentalPeriod,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Footer,
} from './styles';

import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';

export function SchedulingDetails() {
  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  function handleConfirmRental() {
    navigation.navigate('SchedulingComplete');
  }

  return (
    <Container>
      <Header>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={[
            'https://beta.alpes.one/storage/app/uploads/public/608/ad6/90f/608ad690f418e968296549.png',
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lambo</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 500</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="300Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>27/05/2022</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>27/05/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.000</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color="success"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
