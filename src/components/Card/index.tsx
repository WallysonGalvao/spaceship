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
import { useUser } from '~/hooks/user';

interface Props {
  name: string;
  price: number;
  description: string;
  dimension: number;
  selectedPlanet: string;
}

const Card: React.FC<Props> = ({
  name,
  price,
  description,
  dimension,
  selectedPlanet,
}) => {
  const { user } = useUser();
  const isAvailable = useMemo(() => {
    return !(user.credits >= price);
  }, [price, user.credits]);

  const isSelected = useMemo(() => {
    return selectedPlanet === name;
  }, [selectedPlanet, name]);

  return (
    <Container isSelected={isSelected} isAvailable={isAvailable}>
      <ImageContainer>
        <PlanetIcon icon={name} dimension={dimension} />
      </ImageContainer>

      <Name>{translate(name)}</Name>
      <Description>{description}</Description>

      <Footer>
        <Point value={price} />
        <CustomButton enabled={!isAvailable}>
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
