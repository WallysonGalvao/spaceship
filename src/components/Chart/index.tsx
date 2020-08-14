import React, { useMemo } from 'react';
import Pie from 'react-native-pie';
import { getHours, getMinutes, getSeconds } from 'date-fns';
import * as duration from 'duration-fns';

interface Props {
  missions: {
    name: string;
    time: number;
    color: string;
  }[];
  totalMissionsHours: number;
}

const Chart: React.FC<Props> = ({ missions, totalMissionsHours }) => {
  const convertTimeToSeconds = (time: number): number => {
    const hours = getHours(time);
    const minutes = getMinutes(time);
    const seconds = getSeconds(time);
    return duration.toSeconds({ hours, minutes, seconds });
  };

  const sections = useMemo(() => {
    return missions.map(({ color, time }) => {
      const myTime = convertTimeToSeconds(time);
      return {
        color,
        percentage: (myTime * 100) / totalMissionsHours,
      };
    });
  }, [missions, totalMissionsHours]);

  return (
    <Pie radius={110} innerRadius={45} sections={sections} strokeCap="butt" />
  );
};

export default Chart;
