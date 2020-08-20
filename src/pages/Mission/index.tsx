import React, { useState, useMemo, useEffect, ReactElement } from 'react';

import { View, Text } from 'react-native';

import { isSameDay, isSameMonth, isSameYear, isSameWeek } from 'date-fns';

import Page from '~/components/Page';
import SegmentedButtons from '~/components/SegmentedButtons';
import Chart from '~/components/Chart';
import Missions from '~/components/Missions';
import PeriodControlDay from '~/components/PeriodControl/day';
import PeriodControlWeek from '~/components/PeriodControl/week';
import PeriodControlMonth from '~/components/PeriodControl/month';
import PeriodControlYear from '~/components/PeriodControl/year';

import { translate } from '~/locales';

import { useMission } from '~/hooks/mission';
import convertSecondsInHour from '~/utils/convertSecondsInHour';
import period from '~/utils/period';

import { Info, CustomText, TextLeft, Number } from './styles';

const Mission: React.FC = () => {
  const { missions } = useMission();

  const [selectedIndex, setSelectedIndex] = useState(2);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myMissions, setMyMissions] = useState(missions);
  const [totalMissionsHours, setTotalMissionsHours] = useState(0);

  useEffect(() => {
    let missionsFiltered: Array<any> = [];
    if (selectedPeriod === 'day') {
      missionsFiltered = missions.filter(({ time }) =>
        isSameDay(selectedDate, time),
      );
    }

    if (selectedPeriod === 'week') {
      const filteredByWeek = missions.filter(({ time }) =>
        isSameWeek(selectedDate, time),
      );

      missionsFiltered = period.group(filteredByWeek);
    }

    if (selectedPeriod === 'month' || selectedPeriod === 'year') {
      const filtered = missions.filter(({ time }) => {
        if (selectedPeriod === 'month') return isSameMonth(selectedDate, time);
        return isSameYear(selectedDate, time);
      });

      missionsFiltered = period.group(filtered);
    }

    if (selectedPeriod === 'all') {
      missionsFiltered = period.group(missions);
    }

    setMyMissions(missionsFiltered);

    if (missionsFiltered.length > 0)
      setTotalMissionsHours(period.totalHours(missionsFiltered));
  }, [missions, selectedDate, selectedPeriod]);

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

  const DayText = ({ days }: { days: number }): ReactElement => {
    if (days > 0) {
      if (days > 1) return <CustomText> {translate('days')} </CustomText>;
      return <CustomText> {translate('day').toLowerCase()} </CustomText>;
    }
    return <CustomText />;
  };

  const { days, hours, minutes } = myTime;

  return (
    <Page title={translate('mission_title')}>
      <View style={{ flex: 1, height: '100%', width: '100%' }}>
        <SegmentedButtons
          selectedIndex={selectedIndex}
          onTabPress={setSelectedIndex}
          handlePeriod={setSelectedPeriod}
        />
        <View style={{ alignItems: 'center' }}>
          {selectedPeriod === 'day' && (
            <PeriodControlDay
              missions={missions}
              selectedDate={selectedDate}
              onChangeDate={setSelectedDate}
            />
          )}

          {selectedPeriod === 'week' && (
            <PeriodControlWeek
              missions={missions}
              selectedDate={selectedDate}
              onChangeDate={setSelectedDate}
            />
          )}

          {selectedPeriod === 'month' && (
            <PeriodControlMonth
              missions={missions}
              selectedDate={selectedDate}
              onChangeDate={setSelectedDate}
            />
          )}

          {selectedPeriod === 'year' && (
            <PeriodControlYear
              missions={missions}
              selectedDate={selectedDate}
              onChangeDate={setSelectedDate}
            />
          )}
        </View>

        <View
          style={{
            marginTop: selectedPeriod === 'all' ? '25%' : '10%',
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
                {days > 0 && <Number>{days}</Number>}
                <DayText days={days} />
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
