import React from 'react';

import { View } from 'react-native';
import { CustomButton, Title } from './styles';

interface Props {
  title: string;
  onPress(): void;
}

const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <CustomButton onPress={onPress}>
      <View accessible>
        <Title>{title}</Title>
      </View>
    </CustomButton>
  );
};

export default Button;
