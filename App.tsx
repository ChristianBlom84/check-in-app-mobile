import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
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
  }
});

interface Errors {
  emailAddress: string[];
}

const initialState: Errors = {
  emailAddress: []
};

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(initialState);

  const onChange = (text): void => {
    setEmail(text);
    if (errors.emailAddress.length > 0) {
      setErrors(initialState);
    }
  };

  const onPress = (): void => {
    const validationResult = validate(
      { emailAddress: email },
      emailConstraints
    );
    console.log(validationResult);
    if (validationResult) {
      setErrors(validationResult);
      console.log(errors);
    }
    if (!validationResult) {
      setErrors(initialState);
      registerForPushNotificationsAsync(email);
    }
  };

  return (
    <View style={styles.container}>
      {errors.emailAddress.length > 0
        ? errors.emailAddress.map(error => <Text key={error}>{error}</Text>)
        : null}
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
