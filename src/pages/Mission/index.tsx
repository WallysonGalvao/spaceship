import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import DonutChart from '../../assets/donut-chart.svg';

import Page from '../../components/Page';
import SegmentedButtons from '../../components/SegmentedButtons';
import Missions from '../../components/Missions';

import missions from '../../res/missions';

import { PeriodControl, PeriodControlText } from './styles';

const Mission: React.FC = () => {
  return (
    <Page title="Missões">
      <SegmentedButtons />

      <PeriodControl>
        <Icon name="chevron-left" color="#FFFFFF" size={20} />
        <PeriodControlText>12 - 28 de julho de 2020</PeriodControlText>
        <Icon name="chevron-right" color="#FFFFFF" size={20} />
      </PeriodControl>

      <DonutChart style={{ marginTop: 50, marginBottom: 50 }} />
      {missions.map(({ circle, circleColor, name, time, total }) => (
        <Missions
          key={name}
          circle={circle}
          circleColor={circleColor}
          name={name}
          time={time}
          total={total}
        />
      ))}
    </Page>
  );
};

export default Mission;
