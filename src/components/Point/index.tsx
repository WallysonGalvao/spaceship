import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Circle, Number } from './styles';
import { translate } from '~/locales';

interface Props {
  value: number | string;
}

const Point: React.FC<Props> = ({ value }) => {
  const point = useMemo(() => {
    const myValue = typeof value === 'string' ? translate(value) : value;
    return myValue;
  }, [value]);

  return (
    <Container>
      <Circle>
        <Icon name="dollar-sign" color="#FFFFFF" size={15} />
      </Circle>
      <Number>{point === 0 ? translate('free') : point}</Number>
    </Container>
  );
};

export default Point;
