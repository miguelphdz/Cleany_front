import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/theme'

export default function _layout() {
  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarInactiveTintColor: COLORS.lightgray,
        tabBarActiveTintColor: COLORS.black,
        tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopWidth: 0,
            position: "absolute",
            elevation: 0,
            height: 40,
            paddingBottom: 8
        }
    }}
    >
        <Tabs.Screen 
        name = 'index'
        options={{
            tabBarIcon: ({size, color}) => <Ionicons name='home-outline' size={size} color={color}/>,
        }}
        />
        <Tabs.Screen
        name = 'messages'
        options={{
            tabBarIcon: ({size, color}) => <Ionicons name='navigate-outline' size={size} color={color}/>,
        }}
        />
        <Tabs.Screen
        name = 'profile'
        options={{
            tabBarIcon: ({size, color}) => <Ionicons name='person-outline' size={size} color={color}/>,
        }}
        />
    </Tabs>
  )
}