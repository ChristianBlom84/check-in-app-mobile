import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated
} from 'react-native';
import { Notifications } from 'expo';
import { Notification } from 'expo/build/Notifications/Notifications.types';
import { EventSubscription } from 'fbemitter';
import Spinner from '../Spinner';
import { retrieveBackend } from '../../utils/AsyncStorageUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  heading: {
    fontSize: 36,
    fontFamily: 'oswald',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  preamble: {
    marginLeft: 20,
    fontSize: 18,
    fontFamily: 'cabin',
    marginTop: 20,
    marginBottom: 20
  },
  list: {
    flex: 1,
    paddingHorizontal: 20
  },
  date: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    fontFamily: 'cabin'
  },
  item: {
    fontSize: 18,
    fontFamily: 'cabin',
    marginBottom: 18
  }
});

const Dashboard: React.FC<{ openModal: CallableFunction }> = ({
  openModal
}) => {
  const [notifications, setNotifications] = useState([]);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [notificationListener, setNotificationListener] = useState<
    EventSubscription
  >();
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  const getNotifications = async (): Promise<void> => {
    const backend = await retrieveBackend();
    const token = await Notifications.getExpoPushTokenAsync();
    const res = await fetch(`${backend}/api/push/all`, {
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
    setNotifications(body);
    setLoadingNotifications(false);
  };

  const handleNotification = (notification: Notification): void => {
    console.log(notification);
    getNotifications();

    if (notification.remote) {
      Notifications.presentLocalNotificationAsync({
        title: 'New Notification:',
        ios: {
          sound: true,
          _displayInForeground: true
        },
        body: notification.data.message
      });
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 400
    }).start();

    getNotifications();
    setNotificationListener(Notifications.addListener(handleNotification));
  }, []);

  console.log(notifications);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0]
              })
            }
          ]
        }
      ]}
    >
      <Text style={styles.heading}>Organisation Name</Text>
      <Text style={styles.preamble}>Last 5 notifications:</Text>
      {loadingNotifications ? (
        <Spinner />
      ) : (
        <View style={styles.list}>
          <FlatList
            data={notifications}
            keyExtractor={(item): string => item._id}
            renderItem={({ item }): React.ReactElement => (
              <TouchableOpacity onPress={(): void => openModal(item.message)}>
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleString()}
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.item}
                >
                  {item.message}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default Dashboard;
