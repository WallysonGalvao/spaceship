import React, { useMemo, ReactElement } from 'react';
import { getHours, getMinutes } from 'date-fns';
import {
  Container,
  Left,
  Right,
  Circle,
  Name,
  TimeText,
  Number,
} from './styles';

import { translate } from '~/locales';

interface Props {
  color: string;
  name: string;
  time: number;
}

const Missions: React.FC<Props> = ({ color, name, time }) => {
  const myTime = useMemo(() => {
    const hours = getHours(time);
    const minutes = getMinutes(time);
    return { hours, minutes };
  }, [time]);

  const HourText = ({ hour }: { hour: number }): ReactElement => {
    if (hour > 0) {
      if (hour > 1) return <TimeText> {translate('hours')} </TimeText>;
      return <TimeText> {translate('hour')} </TimeText>;
    }
    return <TimeText />;
  };

  const { hours, minutes } = myTime;

  return (
    <Container>
      <Left>
        <Circle color={color} />
        <Name>{translate(`item_${name}`)}</Name>
      </Left>
      <Right>
        <TimeText>
          {hours > 0 && <Number>{hours}</Number>}
          <HourText hour={hours} />
          {minutes > 0 && <Number>{minutes}</Number>}
          {minutes > 0 ? ` ${translate('minutes')}` : ''}
        </TimeText>
      </Right>
    </Container>
  );
};

export default Missions;
