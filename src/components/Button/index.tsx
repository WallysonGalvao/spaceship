import React from 'react';

import { CustomButton, Title } from './styles';

interface Props {
  title: string;
  onPress(): void;
}

const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <CustomButton onPress={onPress}>
      <Title>{title}</Title>
    </CustomButton>
  );
};

export default Button;
