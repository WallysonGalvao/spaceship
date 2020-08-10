import React, { useCallback } from 'react';
import { PickerProps } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { Container } from './styles';

import pickerValues from '../../res/pickerValues';

interface Props extends PickerProps {
  setMissionName(mission: { label: string; value: string }): void;
}

const CustomPicker: React.FC<Props> = ({ selectedValue, setMissionName }) => {
  const handleValueChange = useCallback(
    itemIndex => {
      const value = pickerValues[itemIndex];
      setMissionName({ ...value });
    },
    [setMissionName],
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
        {pickerValues.map(({ id, label, value }) => (
          <Picker.Item key={id} label={label} value={value} />
        ))}
      </Picker>
    </Container>
  );
};

export default CustomPicker;
