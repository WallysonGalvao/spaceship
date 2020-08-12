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
  color: string;
  name: string;
  time: number;
}

const Missions: React.FC<Props> = ({ color, name, time }) => {
  const hours = useMemo(() => {
    const values = convertSecondsInHour(time);

    const { hour, minutes } = values;

    let hourText = '';
    if (hour !== 0 && hour === 1) hourText = `${hour} hora `;
    else if (hour !== 0 && hour > 1) hourText = `${hour} horas `;

    let minutesText = '';
    if (minutes > 0) minutesText = `${minutes} minutos`;

    return { hour: hourText, minutes: minutesText };
  }, [time]);

  return (
    <Container>
      <Left>
        <Circle color={color} />
        <Name>{name}</Name>
      </Left>
      <Right>
        <TimeText>
          <Number>{hours.hour}</Number>
          <Number>{hours.minutes}</Number>
        </TimeText>
      </Right>
    </Container>
  );
};

export default Missions;
