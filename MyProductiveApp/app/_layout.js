import React from 'react'
import {Stack, Tabs} from "expo-router"
import { View } from 'react-native'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFAE4',
        },
        headerTintColor: 'black',
        flex: 1,  
        headerTitleStyle: {
          fontWeight: 'bold',
        },    
      }}
    >
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="TDB" options={{title:'Tableau de bord', headerBackVisible: true, headerTitleAlign: 'center'}}/>
    </Stack>

    
  )
}
