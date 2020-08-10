import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';

import Menu from '../Menu';
import Header from '../Header';

import { Content } from './styles';

interface Props {
  title?: string;
}

const Page: React.FC<Props> = ({ title = '', children }) => {
  const { name: routeName } = useRoute();

  return (
    <LinearGradient colors={['#2F0A40', '#180427']} style={{ flex: 1 }}>
      <Header title={title} />
      <Content>{children}</Content>
      {routeName !== 'Timer' && <Menu />}
    </LinearGradient>
  );
};

export default Page;
