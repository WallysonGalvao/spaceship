import React from 'react';

import { Text } from 'react-native';
import Page from '~/components/Page';

const New: React.FC = () => {
  return (
    <Page title="Página teste">
      <Text style={{ color: '#FFF' }}>Novo teste</Text>
    </Page>
  );
};

export default New;
