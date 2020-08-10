import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Rocket from '../../assets/rocket.svg';
import Chart from '../../assets/chart.svg';
import Planet from '../../assets/planet-menu.svg';

import { Container, Button } from './styles';

const Menu: React.FC = () => {
  const navigation = useNavigation();
  const { name: routeName } = useRoute();

  const handleColor = (currentRoute: string): string => {
    const currentColor = routeName === currentRoute ? '#E9E9E9' : '#272051';
    return currentColor;
  };

  return (
    <Container>
      <Button onPress={() => navigation.navigate('Home')}>
        <Rocket width={130} height={30} fill={handleColor('Home')} />
      </Button>
      <Button onPress={() => navigation.navigate('Mission')}>
        <Chart width={130} height={30} fill={handleColor('Mission')} />
      </Button>
      <Button onPress={() => navigation.navigate('Planets')}>
        <Planet width={130} height={30} fill={handleColor('Planets')} />
      </Button>
    </Container>
  );
};

export default Menu;
