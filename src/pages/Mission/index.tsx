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

import { PeriodControl, PeriodControlText, Info, CustomText } from './styles';

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

      <View style={{ marginTop: 50, marginBottom: 50 }}>
        <Chart
          missions={missions}
          totalMissionsHours={totalMissionsHours.time}
        />
      </View>

      {missions.map(({ color, name, time }) => (
        <Missions key={name} color={color} name={name} time={time} />
      ))}

      <Info>
        <CustomText>{totalMissionsHours.name}</CustomText>
        <CustomText>
          <CustomText>{hours.hour}</CustomText> {hours.hour && 'horas '}
          <CustomText>{hours.minutes > 0 && hours.minutes}</CustomText>
          {hours.minutes > 0 ? ' minutos' : ''}
        </CustomText>
      </Info>

      <Info>
        <CustomText>{completedMissions.name}</CustomText>
        <CustomText style={{ marginRight: 5 }}>
          {completedMissions.total}
        </CustomText>
      </Info>
    </Page>
  );
};

export default Mission;
