import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

interface ButtonProps extends RectButtonProps {
  color?: keyof typeof theme.colors;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  padding: 18px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.main};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
