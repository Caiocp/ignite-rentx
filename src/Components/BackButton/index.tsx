import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import theme from '../../styles/theme';
import { Container } from './styles';

interface Props extends BorderlessButtonProps {
  color?: keyof typeof theme.colors;
}

export function BackButton({ color, ...rest }: Props) {
  const styledTheme = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ?? styledTheme.colors.text}
      />
    </Container>
  );
}
