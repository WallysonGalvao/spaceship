import React, { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Page from '~/components/Page';
import Card from '~/components/Card';

import planets from '~/res/planets';

import { translate } from '~/locales';
import { useUser } from '~/hooks/user';

const Planets: React.FC = () => {
  const { user, updateMyPlanet } = useUser();
  const [selectedPlanet, setSelectedPlanet] = useState(user.myPlanet);

  const handleLongPress = useCallback(
    (name: string): void => {
      setSelectedPlanet(name);
      updateMyPlanet(name);
    },
    [updateMyPlanet],
  );

  return (
    <Page title={translate('planets_title')}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {planets.map(({ id, name, price, description }) => (
          <TouchableOpacity
            key={id}
            disabled={!(user.credits >= price)}
            onLongPress={() => handleLongPress(name)}
          >
            <Card
              name={name}
              price={price}
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
