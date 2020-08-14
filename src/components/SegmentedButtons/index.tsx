import React, { useMemo, useCallback } from 'react';
import SegmentedControlTab, {
  SegmentedControlTabProperties,
} from 'react-native-segmented-control-tab';

import { translate } from '~/locales';

interface Props extends SegmentedControlTabProperties {
  handlePeriod: (index: string) => void;
}

const SegmentedButtons: React.FC<Props> = ({
  selectedIndex,
  onTabPress,
  handlePeriod,
}) => {
  const periods = ['day', 'week', 'month', 'year', 'all'];
  const values = useMemo(() => {
    return periods.map(period => translate(period));
  }, [periods]);

  const handleIndexChange = useCallback(
    index => {
      if (onTabPress && handlePeriod) {
        onTabPress(index);
        handlePeriod(periods[index]);
      }
    },
    [onTabPress, handlePeriod, periods],
  );

  return (
    <SegmentedControlTab
      values={values}
      tabStyle={{
        backgroundColor: '#302B4E',
        borderWidth: 0,
        height: 40,
      }}
      tabTextStyle={{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        color: '#FFFFFF',
      }}
      activeTabStyle={{
        color: 'red',
        backgroundColor: '#CE2949',
        borderRadius: 5,
      }}
      selectedIndex={selectedIndex}
      onTabPress={handleIndexChange}
    />
  );
};

export default SegmentedButtons;
