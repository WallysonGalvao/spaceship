import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Timer from './pages/Timer';
import Mission from './pages/Mission';
import Planets from './pages/Planets';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="Home" component={Home} />
    <Auth.Screen name="Timer" component={Timer} />
    <Auth.Screen name="Mission" component={Mission} />
    <Auth.Screen name="Planets" component={Planets} />
  </Auth.Navigator>
);

export default AppRoutes;
