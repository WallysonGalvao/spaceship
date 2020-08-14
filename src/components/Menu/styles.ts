import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-evenly;

  padding: 10px;

  position: absolute;
  bottom: 10px;
`;

export const Button = styled(RectButton)``;
