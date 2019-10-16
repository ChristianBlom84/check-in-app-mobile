import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { PUSH_ENDPOINT } from '../consts/consts';

interface PushResponse {
  error?: string;
}

const registerForPushNotificationsAsync = async (
  email: string
): Promise<PushResponse> => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return { error: 'Permission for push notices not granted' };
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  try {
    console.log('POST-ing to ', PUSH_ENDPOINT, 'With ', email);
    const res = await fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pushToken: token,
        email
      })
    });
    const body = await res.json();
    return body;
  } catch (err) {
    console.error(err);
  }
};

export default registerForPushNotificationsAsync;
