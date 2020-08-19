import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import userMock from '../res/user';

interface User {
  username: string;
  missions: Array<number>;
  planets: Array<number>;
  myPlanet: string;
  credits: number;
}

interface UserContextData {
  user: User;
  updateMyPlanet(planet: string): void;
  updateCredits(credit: number): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const STORAGE_NAME = '@spaceship:user';

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  async function loadData(): Promise<void> {
    const response = await AsyncStorage.getItem(STORAGE_NAME);
    console.log(`${STORAGE_NAME} ${JSON.stringify(response)}`);
    console.log(`${STORAGE_NAME} ${typeof response}`);

    /* if (response) {
      const parsed = JSON.parse(response);
      if (parsed.length > 0) {
        console.log(JSON.stringify(response));
        setUser(parsed);
      } else {
        setUser(userMock);
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(userMock));
      }
    } */

    setUser(userMock);
    await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(userMock));
  }

  useEffect(() => {
    loadData();
  }, []);

  const updateMyPlanet = useCallback(
    (planet: string) => {
      const updateUser = { ...user };
      updateUser.myPlanet = planet;
      setUser(updateUser);
    },
    [user],
  );

  const updateCredits = useCallback(
    (credits: number) => {
      const updateUser = { ...user };
      updateUser.credits += credits;
      setUser(updateUser);
    },
    [user],
  );

  return (
    <UserContext.Provider value={{ user, updateMyPlanet, updateCredits }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUser must be used within an UserProvider');

  return context;
}
