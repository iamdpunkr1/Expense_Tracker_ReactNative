// In App.js in a new project

import  React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login'
import Register from './screens/Register'
import Home from './screens/Home'
import GroupInfo from './screens/GroupInfo'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register}  options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home}  options={{headerShown:false}}/>
        <Stack.Screen name="GroupInfo" component={GroupInfo}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;