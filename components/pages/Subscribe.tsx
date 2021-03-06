import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
  ScrollView
} from 'react-native';
import { validate } from 'validate.js';
import registerForPushNotificationsAsync from '../../utils/RegisterPushNotifications';
import { PUSH_ENDPOINT } from '../../consts/consts';
import { formConstraints } from '../../validation/constraints';
import { storeBackend } from '../../utils/AsyncStorageUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  preamble: {
    marginBottom: 30,
    fontSize: 18,
    fontFamily: 'cabin'
  },
  formGroup: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: '#325ea6',
    padding: 15,
    marginTop: 20,
    width: '100%',
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
    width: '100%',
    fontFamily: 'cabin',
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
  label: {
    alignSelf: 'flex-start',
    fontSize: 20
  },
  notificationView: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: -125,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'cabin'
  },
  dangerView: {
    backgroundColor: 'red'
  },
  successView: {
    backgroundColor: 'green'
  }
});

interface Errors {
  email: string[];
  name: string[];
  registration: string;
}

const initialErrorState: Errors = {
  email: [],
  name: [],
  registration: ''
};

const Subscribe: React.FC<{ setDeviceRegistered: CallableFunction }> = ({
  setDeviceRegistered
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState(initialErrorState);
  const [success, setSuccess] = useState('');

  const onCheckedIn = async (): Promise<void> => {
    setSuccess('You are now checked in!');
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        setSuccess('');
        setDeviceRegistered({ registered: true });
      }, 3000);
    });
  };

  const getServerAddress = async (): Promise<string> => {
    try {
      const res = await fetch(`${PUSH_ENDPOINT}/api/subscribers/address`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      });
      const body = await res.json();
      const { serverAddress } = body;

      return serverAddress;
    } catch (error) {
      console.log(error);
      setErrors({ email: [], name: [], registration: error.message });
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => setErrors(initialErrorState), 3000);
      });
    }
  };

  const onChange = (text: string, fieldName: string): void => {
    if (fieldName === 'name') {
      setName(text);
    } else {
      setEmail(text);
    }
    if (
      errors.email.length > 0 ||
      errors.registration.length > 0 ||
      errors.name.length > 0
    ) {
      setErrors(initialErrorState);
    }
  };

  const onPress = async (): Promise<void> => {
    const validationResult = await validate({ email, name }, formConstraints);
    console.log(validationResult);
    if (validationResult) {
      setErrors(validationResult);
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => setErrors(initialErrorState), 3000);
      });
    }
    if (!validationResult) {
      setErrors(initialErrorState);

      try {
        const serverAddress = await getServerAddress();
        if (serverAddress) {
          await storeBackend(serverAddress);
          const res = await registerForPushNotificationsAsync(name, email);
          onCheckedIn();
        } else {
          setErrors({
            email: [],
            name: [],
            registration: 'There is no organization with that email domain.'
          });
          InteractionManager.runAfterInteractions(() => {
            setTimeout(() => setErrors(initialErrorState), 3000);
          });
        }
      } catch (error) {
        console.log(error);
        setErrors({ email: [], name: [], registration: error.message });
        InteractionManager.runAfterInteractions(() => {
          setTimeout(() => setErrors(initialErrorState), 3000);
        });
      }
    }
  };

  return (
    <ScrollView>
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
        {errors.name && errors.name.length > 0 ? (
          <View style={[styles.notificationView, styles.dangerView]}>
            {errors.name.map(error => (
              <Text key={error} style={styles.notificationText}>
                {error}
              </Text>
            ))}
          </View>
        ) : null}
        {errors.email && errors.email.length > 0 ? (
          <View
            style={[
              styles.notificationView,
              styles.dangerView,
              errors.name.length > 0 ? { bottom: -65 } : {}
            ]}
          >
            {errors.email.map(error => (
              <Text key={error} style={styles.notificationText}>
                {error}
              </Text>
            ))}
          </View>
        ) : null}
        <View style={styles.formGroup}>
          <Text style={styles.preamble}>
            Sign up with your name and company email to mark yourself as safe
            and recieve important status updates from your organization.
          </Text>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            placeholder="John Doe"
            textContentType="name"
            autoCorrect={false}
            onChangeText={(text): void => onChange(text, 'name')}
            onSubmitEditing={onPress}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="john@example.com"
            textContentType="emailAddress"
            autoCorrect={false}
            onChangeText={(text): void => onChange(text, 'email')}
            onSubmitEditing={onPress}
          />
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>
              Sign up for push notifications
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Subscribe;
