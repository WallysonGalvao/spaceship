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
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const STORAGE_NAME = '@spaceship:user';

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  async function loadData(): Promise<void> {
    const response = await AsyncStorage.getItem(STORAGE_NAME);
    // console.log(`${STORAGE_NAME} ${JSON.stringify(response)}`);

    if (response) {
      setUser(JSON.parse(response));
    } else {
      await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(userMock));
    }
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

  return (
    <UserContext.Provider value={{ user, updateMyPlanet }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUser must be used within an UserProvider');

  return context;
}
