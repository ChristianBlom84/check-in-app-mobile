import React, { Fragment } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import spinner from '../assets/spinner.gif';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    height: 256,
    width: 256
  }
});

const Spinner: React.FC = () => (
  <View style={styles.container}>
    <Image source={spinner} style={styles.spinner} />
  </View>
);

export default Spinner;
