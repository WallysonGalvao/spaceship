import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #ce2949;
  border-radius: 32px;
  align-self: center;
  padding: 15px 25px;
`;

export const ButtonText = styled.Text`
  font-family: 'Montserrat-Regular';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;
