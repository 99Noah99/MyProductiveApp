import React from 'react'
import { Link } from 'expo-router';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
// import Bouton from '../components/Bouton';
import bouton_style from '../styles/bouton_style';


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
        
        <View style={styles.BtnPosition}>
          <Link href="/(TableauDeBord)/TDB" asChild> 
            <TouchableOpacity style={bouton_style.BoutonForme}>
              <Text style={bouton_style.BoutonTexte}>Aller au tableau de Bord</Text>
            </TouchableOpacity>
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
    marginTop: 200,
    justifyContent: 'center', // Alignement horizontal centré
    alignItems: 'center', // Alignement vertical centré (optionnel)
  },

  BtnPosition: {
    flex: 1,
    justifyContent: 'center', // Alignement horizontal centré
    alignItems: 'center', // Alignement vertical centré (optionnel)
  }
});