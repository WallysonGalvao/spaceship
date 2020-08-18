import React, { useCallback, useMemo } from 'react';
import { PickerProps } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { translate } from '~/locales';

import { Container } from './styles';
import { useMission } from '~/hooks/mission';

interface Props extends PickerProps {
  setMissionName(mission: { value: string }): void;
}

const CustomPicker: React.FC<Props> = ({ selectedValue, setMissionName }) => {
  const { missions } = useMission();

  const pickerValues = useMemo(() => {
    const filtered = missions
      .filter(mission => mission.id)
      .map(mission => ({ id: mission.id, value: mission.name }));

    const values = filtered.filter(
      (value, index, self) =>
        self.map(x => x.value).indexOf(value.value) === index,
    );
    return values;
  }, [missions]);

  const handleValueChange = useCallback(
    itemIndex => {
      const value = pickerValues[itemIndex];
      setMissionName({ ...value });
    },
    [setMissionName, pickerValues],
  );

  return (
    <Container>
      <Picker
        selectedValue={selectedValue}
        style={{
          height: 50,
          width: 140,
          color: '#FFFFFF',
        }}
        onValueChange={(_, itemIndex) => handleValueChange(itemIndex)}
      >
        {pickerValues.map(({ id, value }) => (
          <Picker.Item
            key={id}
            label={translate(`item_${value}`)}
            value={value}
          />
        ))}
      </Picker>
    </Container>
  );
};

export default CustomPicker;
