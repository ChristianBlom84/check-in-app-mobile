import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  InteractionManager
} from 'react-native';
import { validate } from 'validate.js';
import registerForPushNotificationsAsync from './utils/RegisterPushNotifications';
import { emailConstraints } from './validation/constraints';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#325ea6',
    padding: 15,
    width: 275,
    maxWidth: '90%',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: 275,
    maxWidth: '90%',
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  notificationView: {
    width: '100%',
    height: 60,
    position: 'absolute',
    top: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationText: {
    color: 'white',
    fontSize: 20
  },
  dangerView: {
    backgroundColor: 'red'
  },
  successView: {
    backgroundColor: 'green'
  }
});

interface Errors {
  emailAddress: string[];
  registration: string;
}

const initialErrorState: Errors = {
  emailAddress: [],
  registration: ''
};

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(initialErrorState);
  const [success, setSuccess] = useState('');

  const onChange = (text): void => {
    setEmail(text);
    if (errors.emailAddress.length > 0 || errors.registration.length > 0) {
      setErrors(initialErrorState);
    }
  };

  const onPress = async (): Promise<void> => {
    const validationResult = validate(
      { emailAddress: email },
      emailConstraints
    );
    if (validationResult) {
      setErrors(validationResult);
    }
    if (!validationResult) {
      setErrors(initialErrorState);
      const res = await registerForPushNotificationsAsync(email);
      if (res.error) {
        console.log(res);
        setErrors({ emailAddress: [], registration: res.error });
        InteractionManager.runAfterInteractions(() => {
          setTimeout(() => setErrors(initialErrorState), 3000);
        });
      } else {
        InteractionManager.runAfterInteractions(() => {
          setTimeout(() => setSuccess('You are now checked in!'), 3000);
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {success ? (
        <View style={[styles.notificationView, styles.successView]}>
          <Text style={styles.notificationText}>{success}</Text>
        </View>
      ) : null}
      {errors.registration ? (
        <View style={[styles.notificationView, styles.dangerView]}>
          <Text style={styles.notificationText}>{errors.registration}</Text>
        </View>
      ) : null}
      {errors.emailAddress.length > 0 ? (
        <View style={[styles.notificationView, styles.dangerView]}>
          {errors.emailAddress.map(error => (
            <Text key={error} style={styles.notificationText}>
              {error}
            </Text>
          ))}
        </View>
      ) : null}
      <TextInput
        style={styles.input}
        value={email}
        placeholder="E-mail"
        textContentType="emailAddress"
        onChangeText={(text): void => onChange(text)}
        onSubmitEditing={onPress}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Sign up for push notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
