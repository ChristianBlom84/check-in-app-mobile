import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native';

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
    paddingHorizontal: 30,
    paddingVertical: 30,
    zIndex: 30,
    shadowOffset: { width: 2, height: 5 },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  text: {
    fontSize: 18,
    fontFamily: 'cabin'
  }
});

interface Props {
  text: string;
  setModalOpen: (state: boolean) => void;
}

const Modal: React.FC<Props> = ({ text, setModalOpen }) => {
  const pressHandler = (e: GestureResponderEvent): void => {
    e.stopPropagation();
    setModalOpen(false);
  };

  return (
    <TouchableOpacity
      style={styles.background}
      onPress={(e: GestureResponderEvent): void => pressHandler(e)}
    >
      <View style={styles.modal}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Modal;
