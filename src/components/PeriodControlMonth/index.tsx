import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  format,
  isToday,
  min,
  isSameMonth,
  subMonths,
  addMonths,
} from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Mission } from '~/hooks/mission';
import { Container, Text } from './styles';

interface Props {
  missions: Mission[];
  selectedDate: Date;
  onChangeDate(date: Date): void;
}

const PeriodControl: React.FC<Props> = ({
  missions,
  selectedDate,
  onChangeDate,
}) => {
  const selectedDateAsText = useMemo(() => {
    // MMMM - agosto (nome completo do mês)
    return format(selectedDate, 'MMMM', {
      locale: ptBr,
    });
  }, [selectedDate]);

  const isLastDay = useMemo(() => {
    const parsed = missions.map(mission => new Date(mission.time));
    const earliest = min(parsed);
    return isSameMonth(selectedDate, earliest);
  }, [selectedDate, missions]);

  const isTomorrow = useMemo(() => {
    return isToday(selectedDate);
  }, [selectedDate]);

  return (
    <Container>
      <TouchableOpacity
        disabled={isLastDay}
        onPress={() => onChangeDate(subMonths(selectedDate, 1))}
        style={{ padding: 15 }}
      >
        <Icon
          name="chevron-left"
          color={isLastDay ? 'red' : '#FFF'}
          size={20}
        />
      </TouchableOpacity>
      <Text>{selectedDateAsText}</Text>
      <TouchableOpacity
        disabled={isTomorrow}
        onPress={() => onChangeDate(addMonths(selectedDate, 1))}
        style={{ padding: 15 }}
      >
        <Icon
          name="chevron-right"
          color={isTomorrow ? 'red' : '#FFF'}
          size={20}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default PeriodControl;
