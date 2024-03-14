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
      <Stack.Screen name="register" options={{title:'Créer un compte', headerBackVisible: true, headerTitleAlign: 'center'}}/>

    </Stack>

    
  )
}
