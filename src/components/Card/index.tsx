import React from 'react';

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

interface Props {
  name: string;
  description: string;
}

const Card: React.FC<Props> = ({ name, description }) => {
  return (
    <Container>
      <ImageContainer>
        <Mercury />
      </ImageContainer>
      <Name>{name}</Name>
      <Description>{description}</Description>
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
