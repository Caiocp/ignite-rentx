import React from 'react';

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

export function ImageSlider({ imagesUrls }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CardImageWrapper>
        <CardImage source={{ uri: imagesUrls[0] }} resizeMode="contain" />
      </CardImageWrapper>
    </Container>
  );
}
