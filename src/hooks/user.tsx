import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_USER, STORAGE_AUTH } from '~/config/constants';

interface User {
  name: string;
  planets: Array<number>;
  myPlanet: string;
  credits: number;
}

interface UserContextData {
  user: User;
  updateUser(user: User): void;
  updateMyPlanet(planet: string): void;
  updateCredits(credit: number): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);

  async function loadData(): Promise<void> {
    const response = await AsyncStorage.getItem(STORAGE_USER);
    console.log(`${STORAGE_USER} ${JSON.stringify(response)}`);

    if (response) {
      const parsed = JSON.parse(response);
      if (parsed) setUser(parsed);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const updateFirabase = useCallback(async currentUser => {
    const response = await AsyncStorage.getItem(STORAGE_AUTH);

    if (response) {
      const { auth } = JSON.parse(response);
      firestore()
        .collection('users')
        .doc(auth.email)
        .update({ ...currentUser });
    }
  }, []);

  const updateMyPlanet = useCallback(
    (planet: string) => {
      const updateUser = { ...user };
      updateUser.myPlanet = planet;
      setUser(updateUser);
      updateFirabase(updateUser);
    },
    [user, updateFirabase],
  );

  const updateCredits = useCallback(
    (credits: number) => {
      const updateUser = { ...user };
      updateUser.credits += credits;
      setUser(updateUser);
      updateFirabase(updateUser);
    },
    [user, updateFirabase],
  );

  const updateUser = useCallback(async (currentUser: User) => {
    setUser(currentUser);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, updateUser, updateMyPlanet, updateCredits }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUser must be used within an UserProvider');

  return context;
}
