import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface CardProps {
  isSelected: boolean;
  isAvailable: boolean;
}

export const Container = styled.View<CardProps>`
  width: 240px;
  height: 380px;

  background: #302b4e;
  border-radius: 24px;
  padding: 20px;

  border-color: #302b4e;
  border-width: 3px;

  ${props =>
    props.isAvailable &&
    css`
      border-color: #ce2949;
    `}

  ${props =>
    props.isSelected &&
    css`
      border-color: #ee5f40;
    `}

  
  margin-left: 20px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  margin-bottom: 10px;
`;

export const Name = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;

  color: #ffffff;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-family: 'Montserrat-Regular';
  font-size: 12px;

  color: #ffffff;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 40px;
`;

export const CustomButton = styled(RectButton)`
  width: 104px;
  height: 40px;
  background: #ce2949;
  border-radius: 10px;

  justify-content: center;
  align-self: center;
`;

export const CustomText = styled.Text`
  font-size: 12px;
  align-self: center;
  justify-content: center;
  font-size: 12px;

  color: #ffffff;
`;
