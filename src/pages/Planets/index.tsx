import React, { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Page from '~/components/Page';
import Card from '~/components/Card';

import { translate } from '~/locales';

import planets from '~/res/planets';

const Planets: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState('mercury');

  const handleLongPress = useCallback((name: string): void => {
    setSelectedPlanet(name);
  }, []);

  return (
    <Page title={translate('planets_title')}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {planets.map(({ id, name, price, locked, description }) => (
          <TouchableOpacity key={id} onLongPress={() => handleLongPress(name)}>
            <Card
              name={name}
              price={price}
              locked={locked}
              description={description}
              selectedPlanet={selectedPlanet}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Page>
  );
};

export default Planets;
