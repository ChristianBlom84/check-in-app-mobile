import React, { useEffect, useState } from 'react';
import { Notifications } from 'expo';
import * as Font from 'expo-font';
import { CHECK_REGISTRATION_ENDPOINT } from './consts/consts';
import Subscribe from './components/pages/Subscribe';
import Dashboard from './components/pages/Dashboard';
import Layout from './components/layout/Layout';

const initialRegisteredState = {
  registered: false,
  withEmail: '',
  source: ''
};

const App: React.FC = () => {
  const [deviceRegistered, setDeviceRegistered] = useState(
    initialRegisteredState
  );
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    (async (): Promise<void> => {
      await Font.loadAsync({
        cabin: require('./assets/fonts/Cabin/Cabin-Regular.ttf'),
        oswald: require('./assets/fonts/Oswald/static/Oswald-Regular.ttf')
      });

      setFontLoaded(true);
    })();
  });

  useEffect(() => {
    const checkRegistration = async (): Promise<void> => {
      const token = await Notifications.getExpoPushTokenAsync();
      const res = await fetch(CHECK_REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pushToken: token
        })
      });
      const body = await res.json();
      setDeviceRegistered(body);
    };

    checkRegistration();
  }, []);

  return fontLoaded ? (
    <Layout>{deviceRegistered ? <Subscribe /> : <Subscribe />}</Layout>
  ) : null;
};

export default App;
