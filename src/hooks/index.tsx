import React from 'react';

import { MissionProvider } from './mission';

const AppProvider: React.FC = ({ children }) => {
  return <MissionProvider>{children}</MissionProvider>;
};

export default AppProvider;
