import React, { useEffect, useState, Fragment } from 'react';
import { Notifications } from 'expo';
import * as Font from 'expo-font';
import Subscribe from './components/pages/Subscribe';
import Dashboard from './components/pages/Dashboard';
import Layout from './components/layout/Layout';
import Modal from './components/Modal';
import Spinner from './components/Spinner';
import {
  retrieveBackend,
  retrieveAllStorageKeys
} from './utils/AsyncStorageUtils';

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
  const [checkingRegistration, setCheckingRegistration] = useState(true);
  const [modalText, setModalText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

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
      const backend = await retrieveBackend();

      if (backend) {
        const token = await Notifications.getExpoPushTokenAsync();
        const res = await fetch(`${backend}/api/subscribers/check-device`, {
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
        console.log(body);
        setDeviceRegistered(body);
      }
      setCheckingRegistration(false);
    };

    checkRegistration();
  }, []);

  const openModal = (text: string): void => {
    setModalOpen(true);
    setModalText(text);
  };

  return fontLoaded ? (
    <Fragment>
      {modalOpen ? (
        <Modal text={modalText} setModalOpen={setModalOpen} />
      ) : null}
      <Layout>
        {checkingRegistration ? (
          <Spinner />
        ) : deviceRegistered.registered ? (
          <Dashboard openModal={openModal} />
        ) : (
          <Subscribe setDeviceRegistered={setDeviceRegistered} />
        )}
      </Layout>
    </Fragment>
  ) : null;
};

export default App;
