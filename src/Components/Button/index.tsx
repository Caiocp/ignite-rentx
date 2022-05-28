import React from 'react';
import theme from '../../styles/theme';

import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: keyof typeof theme.colors;
}

export function Button({ title, color, ...rest }: Props) {
  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}
