import { StyleSheet, Text, View } from 'react-native'
import React, {forwardRef} from 'react'

const Bouton = forwardRef(({texte}, ref) => {
    return (
        <View style={styles.BoutonForme}>
            <Text style={styles.BoutonTexte}>{texte}</Text>
        </View>
    );
  });





const styles = StyleSheet.create({
    BoutonTexte: {
        fontSize: 25,
     },

    BoutonForme: {
        marginLeft:'auto',
        marginRight:'auto',
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#FFFAE4',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 15,

    }
})

export default Bouton;