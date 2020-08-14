import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  format,
  isToday,
  addDays,
  subDays,
  min,
  isBefore,
  isAfter,
} from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { Container, Text } from './styles';

// Dia 12 - 1597201200000
// Dia 13 - 1597287600000
// Dia 14 - 1597374000000

const missions = [
  {
    color: '#CE2949',
    name: 'study',
    time: 1597206600000,
    // Dia 12
    // 1,5 horas - 5400 segundos
  },
  {
    color: '#E08432',
    name: 'exercise',
    time: 1597289400000,
    // Dia 13
    // 0,5 hora - 1800 segundos
  },
  {
    color: '#EE5F40',
    name: 'read',
    time: 1597377600000,
    // Dia 14
    // 1 hora = 3600 segundos
  },
];

interface Props {
  selectedDate: Date;
  onChangeDate(date: Date): Date;
}

const PeriodControl: React.FC<Props> = ({ selectedDate, onChangeDate }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBr,
    });
  }, [selectedDate]);

  const isLastDay = useMemo(() => {
    const parsed = missions.map(mission => new Date(mission.time));
    const earliest = min(parsed);
    return isBefore(subDays(selectedDate, 1), earliest);
  }, [selectedDate]);

  return (
    <Container>
      <TouchableNativeFeedback
        disabled={isLastDay}
        onPress={() => onChangeDate(subDays(selectedDate, 1))}
      >
        <Icon name="chevron-left" color="#FFFFFF" size={20} />
      </TouchableNativeFeedback>
      <Text>{isToday(selectedDate) ? 'Hoje' : selectedDateAsText}</Text>
      <TouchableOpacity onPress={() => onChangeDate(addDays(selectedDate, 1))}>
        <Icon name="chevron-right" color="#FFFFFF" size={20} />
      </TouchableOpacity>
    </Container>
  );
};

export default PeriodControl;
