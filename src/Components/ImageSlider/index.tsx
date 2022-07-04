import React, { useRef, useState } from 'react';
import { FlatList, useWindowDimensions, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CardImageWrapper,
  CardImage,
} from './styles';

interface Props {
  imagesUrls: string[];
}

interface ChangeImagesProp {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrls }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const { width } = useWindowDimensions();

  const indexChange = useRef((info: ChangeImagesProp) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrls.map((_, index) => (
          <ImageIndex key={String(index)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrls}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <CardImageWrapper>
            <CardImage source={{ uri: item }} resizeMode="contain" />
          </CardImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width}
      />
    </Container>
  );
}
