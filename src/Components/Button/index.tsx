import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import theme from '../../styles/theme';

import { Container, Title } from './styles';

interface Props {
  title: string;
  color?: keyof typeof theme.colors;
  onPress?: () => void;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color = 'main',
  onPress,
  enabled = true,
  loading = false,
}: Props) {
  const theme = useTheme();

  return (
    <Container
      color={color}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
