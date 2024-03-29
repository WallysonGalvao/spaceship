import React, { useMemo } from 'react';
import { getHours, getMinutes, getSeconds } from 'date-fns';
import * as duration from 'duration-fns';

import { PieChart } from 'react-native-svg-charts';

interface Props {
  missions: {
    id: number;
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

  const data = useMemo(() => {
    return missions.map(({ id, color, time }) => {
      const myTime = convertTimeToSeconds(time);
      return {
        key: `pie-${id}`,
        value: (myTime * 100) / totalMissionsHours,
        svg: {
          fill: color.toUpperCase(),
        },
      };
    });
  }, [missions, totalMissionsHours]);

  return (
    <PieChart
      style={{ height: 200 }}
      data={data}
      padAngle={0}
      innerRadius="40%"
    />
  );
};

export default Chart;
