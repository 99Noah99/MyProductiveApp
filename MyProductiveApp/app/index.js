import React from 'react'
import { Link } from 'expo-router';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Bouton from '../components/Bouton';


export default function Accueil() {
  return (
    <SafeAreaView style={{flex : 1}}>
      <View style={styles.Acceuilbackground}>
        <View style={styles.ImageContaineur}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/accueil.png')}
          />
        </View>
        
        <View>
          <Link href="/TDB"> 
            <Bouton texte='Aller au Tableau de Bord'/>
          </Link>         
        </View>
        
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  Acceuilbackground: {
    backgroundColor: 'white', //ou #042C28
    flex: 1,
  },
  
  tinyLogo: {
    width: 350,
    height: 300,
    borderRadius: 25,    
  },

  ImageContaineur: {
    flex: 1,
    justifyContent: 'center', // Alignement horizontal centré
    alignItems: 'center', // Alignement vertical centré (optionnel)
  },
});