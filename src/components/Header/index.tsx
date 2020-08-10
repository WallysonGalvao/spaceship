import React from 'react';
import { useRoute } from '@react-navigation/native';

import Point from '../Point';

import { Container, Title } from './styles';

interface Props {
  title: string;
}
const Header: React.FC<Props> = ({ title }) => {
  const { name: routeName } = useRoute();

  const isTimer = routeName !== 'Timer';

  return (
    <Container timer={isTimer}>
      {isTimer && <Title>{title}</Title>}

      <Point />
    </Container>
  );
};

export default Header;
