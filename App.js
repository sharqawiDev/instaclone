import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from 'redux'
import rootReducer from "./redux/reducers"
import thunk from "redux-thunk"
import Landing from './components/auth/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import MainScreen from "./components/Main"
import Add from './components/main/Add';
import Save from './components/main/Save';

const store = createStore(rootReducer, applyMiddleware(thunk))

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

export default class App extends Component {
  constructor(params) {
    super(params)
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    )

    if (!loggedIn)
      return (
        <NavigationContainer>
          <Stack.Navigator initialRoute="Landing" >
            <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRoute="Main" >
            <Stack.Screen name="Main" component={MainScreen}
            />
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="Save" component={Save} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}


