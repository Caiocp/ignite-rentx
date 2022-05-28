import React from 'react';
import theme from '../../styles/theme';

import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: keyof typeof theme.colors;
  onPress?: () => void;
}

export function Button({ title, color = 'main', onPress }: Props) {
  return (
    <Container color={color} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
