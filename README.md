## Making Waves Check-In App
This is the React Native repo for the Making Waves Check-In App. The initial project consists of a mobile app 
where users can check in to their organization and recieve push notification updates from the administrators. There is an 
accompanying node back-end to handle users, subscribed devices and push notifications, the code for that can be found at
https://github.com/ChristianBlom84/check-in-app-backend.

There is also a master backend that is meant to be used as an organization registry. It is meant to recieve the initial 
registration requests from new mobile devices and to return the correct organization's backend address, based on the subscribers 
email domain. This is then stored locally on the mobile device which communicates directly with the correct backend. The repo
for the master backend is located at https://github.com/ChristianBlom84/check-in-app-backend-master.

Finally there is a web based admin frontend where you can manage your organization's backend and send push notifications to all
subscribed devices. The repo for that is https://github.com/ChristianBlom84/check-in-app-admin-frontend. It's currently not meant
for the master backend - that is handled manually by direct database manipulation at the moment.

### Local setup
The mobile app is developed in React Native with Expo, see https://docs.expo.io/get-started/installation/ for tips on getting started
with Expo development. Quick start: after you npm install you should be able to just run npm start and be good to go.

When you run the backend locally, you need to make sure it accepts connections via LAN and set the PUSH_ENDPOINT const in the consts.tsx 
in the mobile app to your backend's IP and port. Expo also allows you to connect through their servers, but doing it through LAN is much
faster.