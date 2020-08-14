import React, { useMemo } from 'react';

import { View } from 'react-native';

import Point from '../Point';
import PlanetIcon from '../PlanetIcon';

import {
  Container,
  ImageContainer,
  Name,
  Description,
  Footer,
  CustomButton,
  CustomText,
} from './styles';

import { translate } from '~/locales';

interface Props {
  name: string;
  price: number | string;
  locked: boolean;
  description: string;
  selectedPlanet: string;
}

const myMoney = 80;

const Card: React.FC<Props> = ({
  name,
  price,
  description,
  selectedPlanet,
}) => {
  const isAvailable = useMemo(() => {
    return !(myMoney >= price);
  }, [price]);

  const isSelected = useMemo(() => {
    return selectedPlanet === name;
  }, [selectedPlanet, name]);

  return (
    <Container isSelected={isSelected} isAvailable={isAvailable}>
      <ImageContainer>
        <PlanetIcon icon={name} dimension={90} />
      </ImageContainer>

      <Name>{translate(name)}</Name>
      <Description>{description}</Description>
      <Footer>
        <Point value={price} />
        <CustomButton>
          <View accessible>
            <CustomText>
              {isAvailable
                ? translate('solar_system_card_button_locked')
                : translate('solar_system_card_button_unlocked')}
            </CustomText>
          </View>
        </CustomButton>
      </Footer>
    </Container>
  );
};

export default Card;
