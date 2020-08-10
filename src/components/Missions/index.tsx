import React from "react";

import {
  Container,
  Left,
  Right,
  Circle,
  Name,
  TimeText,
  Number,
} from "./styles";

interface Props {
  circle?: boolean;
  circleColor: string;
  name: string;
  time?: {
    hour?: number;
    seconds?: number;
  };
  total?: number;
}

const Missions: React.FC<Props> = ({
  circle,
  circleColor,
  name,
  time,
  total,
}) => {
  return (
    <Container>
      <Left>
        {circle && <Circle circleColor={circleColor} />}
        <Name>{name}</Name>
      </Left>
      <Right>
        {time && (
          <TimeText>
            <Number>{time.hour}</Number> {time.hour && "horas "}
            <Number>{time.seconds}</Number> {time.seconds && "minutos"}
          </TimeText>
        )}
        {total && <Number>{total}</Number>}
      </Right>
    </Container>
  );
};

export default Missions;
