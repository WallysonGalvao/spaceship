import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { translate } from '~/locales';

import { useUser } from '~/hooks/user';

import Page from '~/components/Page';
import Picker from '~/components/Picker';
import Carousel from '~/components/Carousel';
import Button from '~/components/Button';

import Astronaut from '~/assets/astronaut.svg';

import { Name, Question } from './styles';

const Home: React.FC = () => {
  const { user } = useUser();

  const navigation = useNavigation();
  const [selectedTimer, setSelectedTimer] = useState(0.8);
  const [missionName, setMissionName] = useState({
    value: 'study',
  });
  const { value } = missionName;
  const params = { missionName: value, missionValue: value, selectedTimer };
  return (
    <Page>
      <Name>
        {translate('home_welcome')} {user.username}!
      </Name>
      <Question>{translate('home_question')}</Question>

      <Picker selectedValue={value} setMissionName={setMissionName} />

      <Astronaut />

      <Carousel onChangeItem={setSelectedTimer} />

      <Button
        title={translate('home_button')}
        onPress={() => navigation.navigate('Timer', { ...params })}
      />
    </Page>
  );
};

export default Home;
