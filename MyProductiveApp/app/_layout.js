import React from 'react'
import {Stack, Tabs} from "expo-router"

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
      <Stack.Screen name="(TableauDeBord)" options={{headerShown: false}}/>
      <Stack.Screen name="(Connexion)" options={{headerShown: false}}/>

    </Stack>

    
  )
}
