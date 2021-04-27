import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './components/auth/Landing';

const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyBoVvMndWJBOiko9QX_nbIFraKdJq3_k0w",
  authDomain: "instaclone-c2a89.firebaseapp.com",
  projectId: "instaclone-c2a89",
  storageBucket: "instaclone-c2a89.appspot.com",
  messagingSenderId: "900045562842",
  appId: "1:900045562842:web:262e31c510cce05cd016e3"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute="Landing" >
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
