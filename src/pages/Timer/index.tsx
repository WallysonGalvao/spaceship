import React, { useCallback, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Venus from '../../assets/planets/venus.svg';

import Page from '../../components/Page';
import Countdown from '../../components/Countdown';
import Button from '../../components/Button';

import { MissionName, TimeContainer } from './styles';

interface IParams {
  missionName: string;
  selectedTimer: number;
}

const Timer: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IParams;
  const { missionName, selectedTimer } = routeParams;
  const [timer, setTimer] = useState(selectedTimer || null);

  const exitMission = useCallback(() => {
    setTimer(null);
    navigation.goBack();
  }, [navigation]);

  return (
    <Page>
      <MissionName style={{ color: '#FFF' }}>{missionName}</MissionName>

      <TimeContainer>
        <Venus width={180} height={180} />
      </TimeContainer>

      <Countdown timer={timer} />

      <Button title="Abandonar missão :(" onPress={exitMission} />
    </Page>
  );
};

export default Timer;
