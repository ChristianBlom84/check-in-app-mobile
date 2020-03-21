import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  InteractionManager
} from 'react-native';
import { Notifications } from 'expo';
import { GET_NOTIFICATIONS_ENDPOINT } from '../../consts/consts';

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
    marginBottom: 10
  }
});

const Dashboard: React.FC = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async (): Promise<void> => {
      const token = await Notifications.getExpoPushTokenAsync();
      const res = await fetch(GET_NOTIFICATIONS_ENDPOINT, {
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
    };

    getNotifications();
  }, []);

  console.log(notifications);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Organisation Name</Text>
      <Text style={styles.preamble}>Last 5 notifications:</Text>
      <View style={styles.list}>
        <FlatList
          data={notifications}
          renderItem={({ item }): React.ReactElement => (
            <>
              <Text key={item.date} style={styles.date}>
                {new Date(item.date).toLocaleString()}
              </Text>
              <Text key={item._id} style={styles.item}>
                {item.message}
              </Text>
            </>
          )}
        />
      </View>
    </View>
  );
};

export default Dashboard;
