import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import React from 'react'
import DrawerNavigator from './DrawerNavigator'
import { useAuthContext } from '../hooks/useAuthContext';

const Stack = createNativeStackNavigator()

const Authstack = () => {
  const {user} = useAuthContext()
  return (
    <Stack.Navigator initialRouteName={user==null ? "Login" : "DrawerNavigator"} screenOptions={{
                                    headerShown:false , 
                                    animationTypeForReplace:'push',
                                    animation:'simple_push'}} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

export default Authstack