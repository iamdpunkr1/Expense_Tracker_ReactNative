import {Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import GroupStack from './GroupStack'
import Graph from '../screens/Graph'
import Analysis from '../screens/Analysis'
import CustomDrawer from '../partials/CustomDrawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'

import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#d7261b',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={GroupStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Graph"
        component={Graph}
        options={{
          drawerIcon: ({color}) => (
            <Foundation name="graph-pie" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Analysis"
        component={Analysis}
        options={{
          drawerIcon: ({color}) => (
            <Foundation name="graph-trend" size={22} color={color} />
          ),
        }}
      />

    </Drawer.Navigator>
  )
}

export default DrawerNavigator

