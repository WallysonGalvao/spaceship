import React from 'react';
import { ScrollView } from 'react-native';

import Page from '../../components/Page';
import Card from '../../components/Card';

import planets from '../../res/planets';

const Planets: React.FC = () => {
  return (
    <Page title="Sistema Solar">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {planets.map(({ id, name, icon, description }) => (
          <Card key={id} name={name} icon={icon} description={description} />
        ))}
      </ScrollView>
    </Page>
  );
};

export default Planets;
