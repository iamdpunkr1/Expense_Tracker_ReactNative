// In App.js in a new project

import  React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login'
import Register from './screens/Register'
import DrawerNavigator from './navigation/DrawerNavigator'
import Authstack from './navigation/Authstack'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Authstack/>
    </NavigationContainer>
  );
}

export default App;