import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import DonutChart from '../../assets/donut-chart.svg';

import Page from '../../components/Page';
import SegmentedButtons from '../../components/SegmentedButtons';
import Missions from '../../components/Missions';

import { useMission } from '../../hooks/mission';
import convertSecondsInHour from '../../utils/convertSecondsInHour';

import missions from '../../res/missions';

import { PeriodControl, PeriodControlText, Info, CustomText } from './styles';

const Mission: React.FC = () => {
  const { completedMissions, totalMissionsHours } = useMission();

  const hours = useMemo(() => {
    return convertSecondsInHour(totalMissionsHours.time);
  }, [totalMissionsHours.time]);

  return (
    <Page title="Missões">
      <SegmentedButtons />

      <PeriodControl>
        <Icon name="chevron-left" color="#FFFFFF" size={20} />
        <PeriodControlText>12 - 28 de julho de 2020</PeriodControlText>
        <Icon name="chevron-right" color="#FFFFFF" size={20} />
      </PeriodControl>

      <DonutChart style={{ marginTop: 50, marginBottom: 50 }} />
      {missions.map(({ circleColor, name, time }) => (
        <Missions
          key={name}
          circleColor={circleColor}
          name={name}
          time={time}
        />
      ))}

      <Info>
        <CustomText>{totalMissionsHours.name}</CustomText>
        <CustomText>
          <CustomText>{hours.hour}</CustomText> {hours.hour && 'horas '}
          <CustomText>{hours.minutes}</CustomText> {hours.minutes && 'minutos'}
        </CustomText>
      </Info>

      <Info>
        <CustomText>{completedMissions.name}</CustomText>
        <CustomText>{completedMissions.total}</CustomText>
      </Info>
    </Page>
  );
};

export default Mission;
