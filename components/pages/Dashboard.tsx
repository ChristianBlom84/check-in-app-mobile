import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import { Notifications } from 'expo';
import { GET_NOTIFICATIONS_ENDPOINT } from '../../consts/consts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});

const getNotifications = async (): Promise<void> => {
  const token = await Notifications.getExpoPushTokenAsync();
  const res = await fetch(GET_NOTIFICATIONS_ENDPOINT, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pushToken: token
    })
  });
  const body = await res.json();
};

const Dashboard: React.FC = () => {
  useEffect(() => {});

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
};

export default Dashboard;
