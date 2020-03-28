import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent
} from 'react-native';

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
  modalInside: {
    height: '100%',
    width: '100%'
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
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const pressHandler = (e: GestureResponderEvent): void => {
    e.stopPropagation();
    Animated.timing(opacity, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200
    }).start();
    setTimeout(() => {
      setModalOpen(false);
    }, 300);
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.background, { opacity, background: 'none' }]}>
      <TouchableOpacity
        style={styles.background}
        onPress={(e: GestureResponderEvent): void => pressHandler(e)}
      >
        <Animated.View
          style={[
            styles.modal,
            {
              transform: [
                {
                  scale: opacity
                }
              ]
            }
          ]}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalInside}>
            <Text style={styles.text}>{text}</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Modal;
