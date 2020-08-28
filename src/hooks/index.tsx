import React from 'react';
import { AuthProvider } from './auth';
import { UserProvider } from './user';
import { MissionProvider } from './mission';

const AppProvider: React.FC = ({ children }) => (
  <MissionProvider>
    <UserProvider>
      <AuthProvider>{children}</AuthProvider>
    </UserProvider>
  </MissionProvider>
);

export default AppProvider;

/* import React from 'react';
import { AuthProvider } from './auth';
import { UserProvider } from './user';
import { MissionProvider } from './mission';

const AppProvider: React.FC = ({ children }) => (
  <MissionProvider>
    <UserProvider>
      <AuthProvider>{children}</AuthProvider>
    </UserProvider>
  </MissionProvider>
);

export default AppProvider;
 */
