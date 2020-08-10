import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Circle, Number } from './styles';

const Point: React.FC = () => {
  return (
    <Container>
      <Circle>
        <Icon name="dollar-sign" color="#FFFFFF" size={15} />
      </Circle>
      <Number>235</Number>
    </Container>
  );
};

export default Point;
