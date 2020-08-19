import React, { useState, useMemo, useEffect, ReactElement } from 'react';

import { View, Text } from 'react-native';

import { isSameDay, getHours, getMinutes, getSeconds } from 'date-fns';
import * as duration from 'duration-fns';
import Page from '~/components/Page';
import SegmentedButtons from '~/components/SegmentedButtons';
import PeriodControl from '~/components/PeriodControl';
import Chart from '~/components/Chart';
import Missions from '~/components/Missions';

import { translate } from '~/locales';

import { useMission } from '~/hooks/mission';
import convertSecondsInHour from '~/utils/convertSecondsInHour';

import { Info, CustomText, TextLeft, Number } from './styles';

const Mission: React.FC = () => {
  const { missions } = useMission();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('Day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myMissions, setMyMissions] = useState(missions);
  const [totalMissionsHours, setTotalMissionsHours] = useState(0);

  useEffect(() => {
    const missionsFiltered = missions.filter(({ time }) =>
      isSameDay(selectedDate, time),
    );

    // console.log(`=====================================`);
    // console.log(`missions: ${JSON.stringify(missions, null, 2)}`);

    setMyMissions(missionsFiltered);

    // console.log(`missionsFiltered ${JSON.stringify(missionsFiltered)}`);

    if (missionsFiltered.length > 0) {
      const allHours = missionsFiltered
        .filter(mission => mission.time)
        .map(({ time }) => {
          const hours = getHours(time);
          const minutes = getMinutes(time);
          const seconds = getSeconds(time);
          return duration.toSeconds({ hours, minutes, seconds });
        })
        .reduce((a, b) => a + b);

      setTotalMissionsHours(allHours);
    } else {
      setTotalMissionsHours(0);
    }
  }, [missions, selectedDate]);

  const myTime = useMemo(() => {
    const value = convertSecondsInHour(totalMissionsHours);
    return value;
  }, [totalMissionsHours]);

  const HourText = ({ hour }: { hour: number }): ReactElement => {
    if (hour > 0) {
      if (hour > 1) return <CustomText> {translate('hours')} </CustomText>;
      return <CustomText> {translate('hour')} </CustomText>;
    }
    return <CustomText />;
  };

  const { hours, minutes } = myTime;

  return (
    <Page title={translate('mission_title')}>
      <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <SegmentedButtons
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
          handlePeriod={setSelectedPeriod}
        />
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <PeriodControl
            missions={missions}
            selectedDate={selectedDate}
            onChangeDate={setSelectedDate}
          />
        </View>

        <View
          style={{
            marginTop: '10%',
            bottom: 20,
          }}
        >
          {myMissions.length === 0 ? (
            <Text style={{ color: '#FFF', fontSize: 24, alignSelf: 'center' }}>
              Sem missões completadas
            </Text>
          ) : (
            <Chart
              missions={myMissions}
              totalMissionsHours={totalMissionsHours}
            />
          )}
        </View>

        {myMissions.length !== 0 && (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 0,
            }}
          >
            {myMissions.map(({ id, color, name, time }) => (
              <Missions key={id} color={color} name={name} time={time} />
            ))}

            <Info>
              <TextLeft>{translate('mission_total_time')}</TextLeft>
              <CustomText>
                {hours > 0 && <Number>{hours}</Number>}
                <HourText hour={hours} />
                {minutes > 0 && <Number>{minutes}</Number>}
                {minutes > 0 ? ` ${translate('minutes')}` : ''}
              </CustomText>
            </Info>

            <Info>
              <TextLeft>{translate('mission_completed')}</TextLeft>
              <Number style={{ marginRight: 5 }}>{myMissions.length}</Number>
            </Info>
          </View>
        )}
      </View>
    </Page>
  );
};

export default Mission;
