import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const modalHeight = window.innerHeight + 100;

console.log(modalHeight);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(47, 128, 237, 0.5)',
    zIndex: 20
  },
  modal: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '80%',
    height: '60%',
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 30,
    shadowOffset: { width: 2, height: 5 },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3
  }
});

interface Props {
  text: string;
}

const Modal: React.FC<Props> = ({ text }) => {
  return (
    <View style={styles.background}>
      <View style={styles.modal}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default Modal;
