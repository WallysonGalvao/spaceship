import React from 'react';
import { Text } from 'react-native';

import Mercury from '../../assets/planets/mercury.svg';

import Point from '../Point';

import {
  Container,
  ImageContainer,
  Name,
  Description,
  Footer,
  CustomButton,
  CustomText,
} from './styles';

const Card: React.FC = () => {
  return (
    <Container>
      <ImageContainer>
        <Mercury />
      </ImageContainer>
      <Name>Mercúrio</Name>
      <Description>
        É o planeta mais rápido do Sistema Solar e também é o mais próximo do
        sol. Da superfície de Mercúrio, o sol aparenta ser três vezes maior que
        quando visto da Terra. Um dia em Mercúrio leva 59 dias terrestres.
      </Description>
      <Footer>
        <Point />
        <CustomButton>
          <CustomText>Desbloqueado</CustomText>
        </CustomButton>
      </Footer>
    </Container>
  );
};

export default Card;
