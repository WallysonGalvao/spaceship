import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format, isToday, addDays, subDays, min, isBefore } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
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
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBr,
    });
  }, [selectedDate]);

  const isLastDay = useMemo(() => {
    const parsed = missions.map(mission => new Date(mission.time));
    const earliest = min(parsed);
    return isBefore(selectedDate, earliest);
  }, [selectedDate, missions]);

  return (
    <Container>
      <TouchableNativeFeedback
        disabled={isLastDay}
        onPress={() => onChangeDate(subDays(selectedDate, 1))}
        style={{ padding: 15 }}
      >
        <Icon name="chevron-left" color="#FFFFFF" size={20} />
      </TouchableNativeFeedback>
      <Text>{isToday(selectedDate) ? 'Hoje' : selectedDateAsText}</Text>
      <TouchableOpacity
        onPress={() => onChangeDate(addDays(selectedDate, 1))}
        style={{ padding: 15 }}
      >
        <Icon name="chevron-right" color="#FFFFFF" size={20} />
      </TouchableOpacity>
    </Container>
  );
};

export default PeriodControl;
