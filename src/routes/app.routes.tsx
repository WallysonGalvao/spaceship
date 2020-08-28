import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '~/pages/Home';
import Timer from '~/pages/Timer';
import Mission from '~/pages/Mission';
import Planets from '~/pages/Planets';
import New from '~/pages/New';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }}>
    <Auth.Screen name="Home" component={Home} />
    <Auth.Screen name="Timer" component={Timer} />
    <Auth.Screen name="Mission" component={Mission} />
    <Auth.Screen name="Planets" component={Planets} />
    <Auth.Screen name="New" component={New} />
  </Auth.Navigator>
);

export default AppRoutes;
