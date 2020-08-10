import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Page from '../../components/Page';
import Picker from '../../components/Picker';
import Button from '../../components/Button';

import Astronaut from '../../assets/astronaut.svg';

import { Name, Question } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [missionName, setMissionName] = useState({
    label: 'Estudar',
    value: 'study',
  });
  const { label, value } = missionName;
  return (
    <Page>
      <Name>Bem vinda a bordo, Rayssa!</Name>
      <Question>Qual será nossa missão de hoje?</Question>

      <Picker selectedValue={value} setMissionName={setMissionName} />

      <Astronaut />

      <Button
        title="Iniciar missão"
        onPress={() => navigation.navigate('Timer', { missionName: label })}
      />
    </Page>
  );
};

export default Home;
