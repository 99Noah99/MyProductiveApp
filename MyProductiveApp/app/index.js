import { Link } from 'expo-router';
import { StyleSheet, Text,View, SafeAreaView } from 'react-native';


export default function Page() {
  return (
    <SafeAreaView >
      <View style={styles.Acceuilbackground}>
        <Link href="/login" style={styles.Pageslink}>Go to Login</Link>
        <Link href="/accueil" style={styles.Pageslink}>Go to Accueil</Link>
      </View>
    </SafeAreaView>

  )
  
  
  
}

const styles = StyleSheet.create({
  Acceuilbackground: {
    backgroundColor: '#ccc',
    flex: 1,
  }

});