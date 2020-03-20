import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import icon from '../../assets/icon-transparent.png';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2F80ED',
    maxHeight: 75,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10,
    marginLeft: -25
  },
  heading: {
    fontSize: 20
  }
});

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={icon} />
      <Text style={styles.heading}>Check-in Safe</Text>
    </View>
  );
};

export default Header;
