import React, { useState, useMemo, useEffect } from 'react';

import { View } from 'react-native';

import { isToday, isSameDay } from 'date-fns';
import Page from '~/components/Page';
import SegmentedButtons from '~/components/SegmentedButtons';
import PeriodControl from '~/components/PeriodControl';
import Chart from '~/components/Chart';
import Missions from '~/components/Missions';

import { translate } from '~/locales';

import { useMission } from '~/hooks/mission';
import convertSecondsInHour from '~/utils/convertSecondsInHour';

import missions from '~/res/missions';

import { Info, CustomText, TextLeft, Number } from './styles';

const Mission: React.FC = () => {
  const { completedMissions, totalMissionsHours } = useMission();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('Day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myMissions, setMyMissions] = useState(missions);

  const hours = useMemo(() => {
    const value = convertSecondsInHour(totalMissionsHours.time);
    return value;
  }, [totalMissionsHours.time]);

  useEffect(() => {
    const missionsFiltered = missions.filter(mission =>
      isSameDay(selectedDate, mission.time),
    );
    setMyMissions(missionsFiltered);
  }, [selectedDate]);

  return (
    <Page title={translate('mission_title')}>
      <SegmentedButtons
        selectedIndex={selectedIndex}
        onTabPress={setSelectedIndex}
        handlePeriod={setSelectedPeriod}
      />

      <PeriodControl
        selectedDate={selectedDate}
        onChangeDate={setSelectedDate}
      />

      <View
        style={{
          marginTop: '20%',
          top: 10,
          marginBottom: '10%',
        }}
      >
        <Chart
          missions={myMissions}
          totalMissionsHours={totalMissionsHours.time}
        />
      </View>

      {myMissions.map(({ color, name, time }) => (
        <Missions key={name} color={color} name={name} time={time} />
      ))}

      <Info>
        <TextLeft>{totalMissionsHours.name}</TextLeft>
        <CustomText>
          <Number>{hours.hour}</Number>{' '}
          {hours.hour > 1 ? `${translate('hours')} ` : `${translate('hour')} `}
          <Number>{hours.minutes > 0 && hours.minutes}</Number>
          {hours.minutes > 0 ? ` ${translate('minutes')}` : ''}
        </CustomText>
      </Info>

      <Info>
        <TextLeft>{completedMissions.name}</TextLeft>
        <Number style={{ marginRight: 5 }}>{completedMissions.total}</Number>
      </Info>
    </Page>
  );
};

export default Mission;
