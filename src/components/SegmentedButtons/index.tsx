import React from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const SegmentedButtons: React.FC = () => {
  return (
    <SegmentedControlTab
      values={['Dia', 'Semana', 'Mês', 'Ano', 'Todos']}
      tabStyle={{
        backgroundColor: '#302B4E',
        borderWidth: 0,
        height: 40,
      }}
      tabTextStyle={{ fontSize: 14, color: '#FFFFFF' }}
      activeTabStyle={{
        color: 'red',
        backgroundColor: '#CE2949',
        borderRadius: 5,
      }}
      selectedIndex={1}
    />
  );
};

export default SegmentedButtons;
