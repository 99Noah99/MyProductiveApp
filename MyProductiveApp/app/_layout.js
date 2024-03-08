import React from 'react'
import {Stack, Tabs} from "expo-router"

const _layout = () => {
  return (
    // <Tabs>
    //     {/* <Stack.Screen name="login" options={{title:'Connexion', headerBackVisible: true}}/>
    //     <Stack.Screen name="accueil" options={{title:'Accueil', headerBackVisible: true}}/> */}
    // </Tabs>
    // <Stack
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: 'black',
    //     },
    //     headerTintColor: '#fff',  
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },    
    //   }}
    // />

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
      <Stack.Screen name="index" options={{title:'MyProductiveApp', headerBackVisible: true}}/>
      <Stack.Screen name="login" options={{title:'Vous etes connecter', headerBackVisible: true}}/>
    </Stack>

  )
}

export default _layout