import React from 'react';

import { UserProvider } from './user';
import { MissionProvider } from './mission';

const AppProvider: React.FC = ({ children }) => {
  return (
    <MissionProvider>
      <UserProvider>{children}</UserProvider>
    </MissionProvider>
  );
};

export default AppProvider;
