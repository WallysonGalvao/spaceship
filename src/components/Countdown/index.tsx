import React, { useCallback, useMemo } from 'react';
import CountDown from 'react-native-countdown-component';
import { useMission } from '../../hooks/mission';

interface Props {
  timer: number | null;
  missionValue: string;
}

const CustomCountdown: React.FC<Props> = ({ missionValue, timer }) => {
  const { updateMissionTime } = useMission();

  const seconds = useMemo(() => {
    if (timer) return timer * 60;
    return timer;
  }, [timer]);

  const handleFinish = useCallback(() => {
    if (timer) updateMissionTime({ name: missionValue, timer });
  }, [missionValue, timer, updateMissionTime]);

  return (
    <CountDown
      size={40}
      until={seconds}
      digitStyle={{
        backgroundColor: 'transparent',
        margin: 10,
      }}
      digitTxtStyle={{
        letterSpacing: 5,
        color: '#FFF',
        fontSize: 60,
      }}
      separatorStyle={{ color: '#FFF' }}
      timeToShow={['M', 'S']}
      timeLabels={{ m: null, s: null }}
      showSeparator
      onFinish={handleFinish}
    />
  );
};

export default CustomCountdown;
