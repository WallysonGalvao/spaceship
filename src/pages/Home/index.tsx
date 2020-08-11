import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Page from '../../components/Page';
import Picker from '../../components/Picker';
import Carousel from '../../components/Carousel';
import Button from '../../components/Button';

import Astronaut from '../../assets/astronaut.svg';

import { Name, Question } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTimer, setSelectedTimer] = useState(30);
  const [missionName, setMissionName] = useState({
    label: 'Estudar',
    value: 'study',
  });
  const { label, value } = missionName;
  const params = { missionName: label, selectedTimer };
  return (
    <Page>
      <Name>Bem vinda a bordo, Rayssa!</Name>
      <Question>Qual será nossa missão de hoje?</Question>

      <Picker selectedValue={value} setMissionName={setMissionName} />

      <Astronaut />

      <Carousel onChangeItem={setSelectedTimer} />

      <Button
        title="Iniciar missão"
        onPress={() => navigation.navigate('Timer', { ...params })}
      />
    </Page>
  );
};

export default Home;
