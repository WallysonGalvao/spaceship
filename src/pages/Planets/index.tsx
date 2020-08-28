import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

import { STORAGE_PLANETS } from '~/config/constants';
import { translate } from '~/locales';
import { useUser } from '~/hooks/user';

import Page from '~/components/Page';
import Card from '~/components/Card';

interface Planet {
  id: string;
  name: string;
  description: string;
  price: number;
  dimension: number;
}

const Planets: React.FC = () => {
  const { user, updateMyPlanet } = useUser();
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState(user.myPlanet);

  const getFromStorage = async (): Promise<Planet[]> => {
    const jsonValue = await AsyncStorage.getItem(STORAGE_PLANETS);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  };

  const setInStorage = async (data: Planet[]): Promise<void> => {
    AsyncStorage.setItem(STORAGE_PLANETS, JSON.stringify(data));
  };

  const getFromFirestore = useCallback(async () => {
    firestore()
      .collection('planets')
      .onSnapshot(snapshot => {
        const data: Planet[] = [];
        snapshot.forEach(doc => {
          const { name, description, price, dimension } = doc.data();
          data.push({
            id: doc.id,
            name,
            description,
            price,
            dimension,
          });
        });

        if (data) {
          data.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
          setInStorage(data);
          setPlanets(data);
        }
      });
  }, []);

  const loadPlanets = useCallback(async () => {
    const response = await getFromStorage();
    if (response) setPlanets(response);
    else getFromFirestore();
  }, [getFromFirestore]);

  useEffect(() => {
    loadPlanets();
  }, [loadPlanets]);

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
        {planets.map(({ id, name, price, description, dimension }) => (
          <TouchableOpacity
            key={id}
            disabled={!(user.credits >= price)}
            onLongPress={() => handleLongPress(name)}
          >
            <Card
              name={name}
              price={price}
              description={description}
              dimension={dimension}
              selectedPlanet={selectedPlanet}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Page>
  );
};

export default Planets;
