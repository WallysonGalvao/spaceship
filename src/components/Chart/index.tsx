import React, { useMemo } from 'react';
import Pie from 'react-native-pie';

interface Props {
  missions: {
    name: string;
    time: number;
    color: string;
  }[];
  totalMissionsHours: number;
}

const Chart: React.FC<Props> = ({ missions, totalMissionsHours }) => {
  const sections = useMemo(() => {
    return missions.map(mission => ({
      color: mission.color,
      percentage: (mission.time * 100) / 10800,
    }));
  }, [missions, totalMissionsHours]);

  return (
    <Pie radius={110} innerRadius={45} sections={sections} strokeCap="butt" />
  );
};

export default Chart;
