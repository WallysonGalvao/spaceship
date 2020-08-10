import React from 'react';
import { ScrollView } from 'react-native';

import Page from '../../components/Page';
import Card from '../../components/Card';

const Planets: React.FC = () => {
  return (
    <Page title="Sistema Solar">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {[1, 2].map(() => (
          <Card />
        ))}
      </ScrollView>
    </Page>
  );
};

export default Planets;
