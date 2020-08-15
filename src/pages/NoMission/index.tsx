import React from 'react';
import { View, Text } from 'react-native';
import Page from '~/components/Page';
import { translate } from '~/locales';

const NoMissions: React.FC = () => {
  return (
    <Page title={translate('mission_title')}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Text
          style={{
            color: '#FFF',
            fontSize: 32,
            fontFamily: 'Montserrat-Regular',
          }}
        >
          Você ainda não completou nenhuma missão!
        </Text>
      </View>
    </Page>
  );
};

export default NoMissions;
