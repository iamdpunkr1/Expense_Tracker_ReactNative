import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import GroupInfo from '../screens/GroupInfo'
import Expenses from '../screens/Expenses'

const Stack = createNativeStackNavigator()

const GroupStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Dash" component={Home}/>
        <Stack.Screen name="GroupInfo" component={GroupInfo}/>
        <Stack.Screen name="Expenses" component={Expenses}/>
    </Stack.Navigator>
  )
}

export default GroupStack