import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';

import { AppRoutesParamList } from '../../@types/routes/stack.routes';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlataformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

type Props = StackScreenProps<AppRoutesParamList, 'SchedulingDetails'>;

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails({ route }: Props) {
  const { car, dates } = route.params;

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  const totalRent = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    setLoading(true);
    try {
      const scheduleByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailableDates = [
        ...scheduleByCar.data.unavailable_dates,
        ...dates,
      ];

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          'dd/MM/yyyy'
        ),
      });

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      });

      navigation.navigate('SchedulingComplete');
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao confirmar locação');
      setLoading(false);
    }
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy'
      ),
    });
  }, []);

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
        <ImageSlider imagesUrls={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {totalRent}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color="success"
          onPress={handleConfirmRental}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
