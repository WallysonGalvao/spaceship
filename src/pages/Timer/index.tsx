import React, { useCallback, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import Page from '~/components/Page';
import CircularProgress from '~/components/CircularProgress';
import Countdown from '~/components/Countdown';
import Button from '~/components/Button';

import { translate } from '~/locales';

import { MissionName } from './styles';

interface IParams {
  missionName: string;
  missionValue: string;
  selectedTimer: number;
}

const Timer: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as IParams;
  const { missionName, missionValue, selectedTimer } = routeParams;
  const [timer, setTimer] = useState(selectedTimer || null);

  const exitMission = useCallback(() => {
    setTimer(null);
    navigation.goBack();
  }, [navigation]);

  return (
    <Page>
      <MissionName>{translate(`item_${missionName}`)}</MissionName>

      <CircularProgress timer={timer} />

      <Countdown missionValue={missionValue} timer={timer} />

      <Button title={translate('timer_button')} onPress={exitMission} />
    </Page>
  );
};

export default Timer;
