import { AsyncStorage } from 'react-native';

export const storeBackend = async (server: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('backendServer', server);
  } catch (error) {
    console.error(error.message);
  }
};

export const retrieveBackend = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem('backendServer');
    if (value !== null) {
      return value;
    }

    return;
  } catch (error) {
    console.error(error.message);
  }
};
