import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';

interface Props {
  children: [React.FC];
}

const styles = StyleSheet.create({
  layout: {
    flex: 1
  }
});

const Layout: React.FC = ({ children }) => {
  return (
    <View style={styles.layout}>
      <Header />
      {children}
    </View>
  );
};

export default Layout;
