import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { View } from 'react-native';

import Page from '../../components/Page';
import SegmentedButtons from '../../components/SegmentedButtons';
import Chart from '../../components/Chart';
import Missions from '../../components/Missions';

import { useMission } from '../../hooks/mission';
import convertSecondsInHour from '../../utils/convertSecondsInHour';

import missions from '../../res/missions';

import {
  PeriodControl,
  PeriodControlText,
  Info,
  CustomText,
  TextLeft,
  Number,
} from './styles';

const Mission: React.FC = () => {
  const { completedMissions, totalMissionsHours } = useMission();

  const hours = useMemo(() => {
    const value = convertSecondsInHour(totalMissionsHours.time);
    return value;
  }, [totalMissionsHours.time]);

  return (
    <Page title="Missões">
      <SegmentedButtons />

      <PeriodControl>
        <Icon name="chevron-left" color="#FFFFFF" size={20} />
        <PeriodControlText>12 - 28 de julho de 2020</PeriodControlText>
        <Icon name="chevron-right" color="#FFFFFF" size={20} />
      </PeriodControl>

      <View
        style={{
          marginTop: '10%',
          top: 10,
          marginBottom: '10%',
        }}
      >
        <Chart
          missions={missions}
          totalMissionsHours={totalMissionsHours.time}
        />
      </View>

      {missions.map(({ color, name, time }) => (
        <Missions key={name} color={color} name={name} time={time} />
      ))}

      <Info>
        <TextLeft>{totalMissionsHours.name}</TextLeft>
        <CustomText>
          <Number>{hours.hour}</Number> {hours.hour > 1 ? 'horas ' : 'hora '}
          <Number>{hours.minutes > 0 && hours.minutes}</Number>
          {hours.minutes > 0 ? ' minutos' : ''}
        </CustomText>
      </Info>

      <Info>
        <TextLeft>{completedMissions.name}</TextLeft>
        <Number style={{ marginRight: 5 }}>{completedMissions.total}</Number>
      </Info>
    </Page>
  );
};

export default Mission;
