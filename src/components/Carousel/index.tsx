import React, { ReactElement } from 'react';
import Carousel from 'react-native-snap-carousel';

import { scrollInterpolator, animatedStyles } from '~/utils/animations';

import ArrowUp from '~/assets/arrow-up.svg';

import { Container, ArrowContainer, ItemContainer, ItemLabel } from './styles';

interface Props {
  onChangeItem(value: number): void;
}

const CarouselPicker: React.FC<Props> = ({ onChangeItem }) => {
  const data = [0.1, 35, 40, 45, 50, 55, 60];

  const renderItem = ({ item }: { item: number }): ReactElement => {
    return (
      <ItemContainer>
        <ItemLabel>{item}</ItemLabel>
      </ItemContainer>
    );
  };

  const handleSnapToItem = (indexValue: number): void => {
    const value = data[indexValue];
    if (onChangeItem) onChangeItem(value);
  };

  return (
    <Container>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={350}
        itemWidth={75}
        containerCustomStyle={{ marginTop: 50, height: 40 }}
        inactiveSlideShift={0}
        onSnapToItem={handleSnapToItem}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView
      />
      <ArrowContainer>
        <ArrowUp width={13} height={6} />
      </ArrowContainer>
    </Container>
  );
};

export default CarouselPicker;
