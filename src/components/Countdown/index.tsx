import React from 'react';
import CountDown from 'react-native-countdown-component';

interface Props {
  timer: number | null;
}

const CustomCountdown: React.FC<Props> = ({ timer }) => {
  return (
    <CountDown
      size={40}
      until={timer}
      digitStyle={{
        backgroundColor: 'transparent',
        margin: 10,
      }}
      digitTxtStyle={{ color: '#FFF', fontSize: 60 }}
      separatorStyle={{ color: '#FFF' }}
      timeToShow={['M', 'S']}
      timeLabels={{ m: null, s: null }}
      showSeparator
    />
  );
};

export default CustomCountdown;
