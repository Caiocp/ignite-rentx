import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

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
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Footer,
} from './styles';

import { Button } from '../../components/Button';
import { AppRoutesParamList } from '../../@types/routes/stack.routes';

export function CarDetails() {
  const navigation = useNavigation<NavigationProp<AppRoutesParamList>>();

  function handleConfirmRental() {
    navigation.navigate('Scheduling');
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

        <About>
          Minim consequat nostrud ut mollit excepteur dolor sint magna nisi
          minim. Mollit est labore voluptate proident laborum ea velit irure.
          Sit deserunt laborum adipisicing commodo voluptate irure incididunt
          voluptate anim culpa commodo in labore. Excepteur deserunt ipsum ea
          minim nostrud velit nulla. Aute ullamco veniam aute ullamco eiusmod
          anim irure proident proident.
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
