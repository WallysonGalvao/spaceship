import React, { useMemo } from 'react';
import {
  Container,
  Left,
  Right,
  Circle,
  Name,
  TimeText,
  Number,
} from './styles';

import convertSecondsInHour from '../../utils/convertSecondsInHour';

interface Props {
  circleColor: string;
  name: string;
  time: number;
}

const Missions: React.FC<Props> = ({ circleColor, name, time }) => {
  const hours = useMemo(() => {
    return convertSecondsInHour(time);
  }, [time]);

  return (
    <Container>
      <Left>
        <Circle circleColor={circleColor} />
        <Name>{name}</Name>
      </Left>
      <Right>
        <TimeText>
          <Number>{hours.hour}</Number> {hours.hour && 'horas '}
          <Number>{hours.minutes}</Number> {hours.minutes && 'minutos'}
        </TimeText>
      </Right>
    </Container>
  );
};

export default Missions;
