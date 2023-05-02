import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import React from 'react'
import DrawerNavigator from './DrawerNavigator'
const Stack = createNativeStackNavigator()

const Authstack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register}  options={{headerShown:false}}/>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}  options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default Authstack