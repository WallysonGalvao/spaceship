import React from 'react';
import { useRoute } from '@react-navigation/native';

import Point from '../Point';

import { Container, Title } from './styles';
import { useUser } from '~/hooks/user';

interface Props {
  title: string;
}
const Header: React.FC<Props> = ({ title }) => {
  const { user } = useUser();
  const { name: routeName } = useRoute();

  const isTimer = routeName !== 'Timer';

  return (
    <Container timer={isTimer}>
      {isTimer && <Title>{title}</Title>}
      <Point value={user.credits} />
    </Container>
  );
};

export default Header;
