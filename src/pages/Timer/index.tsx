import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Venus from '../../assets/planets/venus.svg';

import Page from '../../components/Page';
import Button from '../../components/Button';

import { MissionName, Time, TimeContainer } from './styles';

interface IParams {
  missionName: string;
  selectedTimer: number;
}

const Timer: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IParams;
  const { missionName, selectedTimer } = routeParams;

  return (
    <Page>
      <MissionName style={{ color: '#FFF' }}>{missionName}</MissionName>

      <TimeContainer>
        <Venus />
      </TimeContainer>

      <Time>{selectedTimer}</Time>

      <Button title="Abandonar missão :(" onPress={() => navigation.goBack()} />
    </Page>
  );
};

export default Timer;
