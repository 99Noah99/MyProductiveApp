import React from 'react'
import {Stack, Tabs} from "expo-router"
import { View } from 'react-native'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        flex: 1,  
        headerTitleStyle: {
          fontWeight: 'bold',
        },    
      }}
    >
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="TDB" options={{title:'Tableau de bord', headerBackVisible: true}}/>
    </Stack>

    
  )
}
