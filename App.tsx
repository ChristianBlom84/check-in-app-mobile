import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import registerForPushNotificationsAsync from './utils/RegisterPushNotifications';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const App: React.FC = () => {
  const onPress = (): void => {
    registerForPushNotificationsAsync();
  };

  return (
    <View style={styles.container}>
      <Button title="Sign up for push notifications" onPress={onPress} />
    </View>
  );
};

export default App;
