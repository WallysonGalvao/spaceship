import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from 'react';
import fireAuth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-community/async-storage';

import { STORAGE_AUTH, STORAGE_USER } from '~/config/constants';
import { useUser } from './user';

interface Auth {
  /* name: string; */
  email: string;
}

interface AuthState {
  auth: Auth;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  auth: Auth;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const { updateUser } = useUser();
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const auth = await AsyncStorage.getItem(STORAGE_AUTH);
      console.log(`${STORAGE_AUTH} ${JSON.stringify(auth)}`);

      if (auth) setData({ auth: JSON.parse(auth) });
      setLoading(false);

      /* fireAuth().signOut();

      await AsyncStorage.removeItem(STORAGE_AUTH);

      setData({} as AuthState); */
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(
    async ({ email, password }) => {
      await fireAuth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user.email) {
            setData({ email: res.user.email });

            AsyncStorage.setItem(
              STORAGE_AUTH,
              JSON.stringify({ email: res.user.email }),
            );
          }
        })
        .catch(error => console.error(error));

      const response = await firestore().collection('users').doc(email).get();

      const user = response.data();

      if (user) {
        const { name, planets, myPlanet, credits } = user;
        updateUser({ name, planets, myPlanet, credits });
        await AsyncStorage.setItem(
          STORAGE_USER,
          JSON.stringify({ name, planets, myPlanet, credits }),
        );
      }
    },
    [updateUser],
  );

  const signUp = useCallback(async ({ name, email, password }) => {
    await fireAuth().createUserWithEmailAndPassword(email, password);
    await fireAuth()
      .signInWithEmailAndPassword('wallyson.galvao@gmail.com', '123456')
      .then(res => {
        if (res.user.email) {
          firestore()
            .collection('users')
            .doc(email)
            .set({
              name,
              planets: [1],
              myPlanet: 'mercury',
              credits: 0,
            })
            .then(resp => {
              console.log(`User added! ${resp}`);
            })
            .catch(error => console.error(error));
        }
      });

    fireAuth().signOut();
  }, []);

  const signOut = useCallback(async () => {
    fireAuth().signOut();

    await AsyncStorage.removeItem(STORAGE_AUTH);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth: data.auth, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
