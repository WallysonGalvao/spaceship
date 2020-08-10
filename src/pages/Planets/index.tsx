import React from 'react';
import { ScrollView } from 'react-native';

import Page from '../../components/Page';
import Card from '../../components/Card';

import planets from '../../res/planets';

interface PlanetProp {
  id: number;
  name: string;
  description: string;
}

const Planets: React.FC = () => {
  return (
    <Page title="Sistema Solar">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {planets.map(({ id, name, description }: PlanetProp) => (
          <Card key={id} name={name} description={description} />
        ))}
      </ScrollView>
    </Page>
  );
};

export default Planets;
