import { Link } from 'expo-router';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';


export default function Page() {
  return (
    <SafeAreaView style={{flex : 1}}>


      <View style={styles.Acceuilbackground}>
        <Link href="/TableauDeBord/TDB">Go to TDB</Link>
      </View>
    </SafeAreaView>

  )
  
  
  
}

const styles = StyleSheet.create({
  Acceuilbackground: {
    backgroundColor: 'darkslategrey', //ou #042C28
    flex: 1,
  }

});