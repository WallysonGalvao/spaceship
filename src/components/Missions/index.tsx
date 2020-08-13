import React, { useMemo, ReactElement } from 'react';
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
  color: string;
  name: string;
  time: number;
}

const Missions: React.FC<Props> = ({ color, name, time }) => {
  const hours = useMemo(() => {
    const values = convertSecondsInHour(time);
    return values;
  }, [time]);

  const HourText = ({ hour }: { hour: number }): ReactElement => {
    if (hour > 0) {
      if (hour > 1) return <TimeText> horas </TimeText>;
      return <TimeText> hora </TimeText>;
    }
    return <TimeText />;
  };

  return (
    <Container>
      <Left>
        <Circle color={color} />
        <Name>{name}</Name>
      </Left>
      <Right>
        <TimeText>
          {hours.hour > 0 && <Number>{hours.hour}</Number>}
          <HourText hour={hours.hour} />
          {hours.minutes > 0 && <Number>{hours.minutes}</Number>}
          {hours.minutes > 0 ? ' minutos' : ''}
        </TimeText>
      </Right>
    </Container>
  );
};

export default Missions;
