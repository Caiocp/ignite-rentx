import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 8px;
  height: 8px;
  border-radius: 4px;

  margin-left: 8px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
`;

export const CardImageWrapper = styled.View`
  justify-content: center;
  align-items: center;

  width: ${Dimensions.get('window').width}px;
  height: 132px;
`;

export const CardImage = styled.Image`
  width: 280px;
  height: 132px;
`;
