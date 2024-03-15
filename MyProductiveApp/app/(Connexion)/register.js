import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import bouton_style from "../../styles/bouton_style";
import { API_URL } from "@env";
import axios from "axios";

const register = () => {
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Identifiant, setIdentifiant] = useState("");
  const [Password, setPassword] = useState("");

  const formPost = () => {
    if (!Nom || !Prenom || !Identifiant || !Password) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs");
      return;
    } else {
      axios({
        method: "post",
        url: `${API_URL}/api/register`,
        data: {
          Nom: Nom,
          Prenom: Prenom,
          Identifiant: Identifiant,
          Password: Password,
        },
      })
        .then((response) => {
          console.log(response.data);
          // let reponse1 = response.data.message;
          // Alert.alert("ALLELUIA", reponse1);
        })
        .catch((error) => {
          console.error("Erreur lors de la requête API :", error);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.InputPosition}>
        <TextInput
          style={styles.Input}
          onChangeText={setNom}
          value={Nom}
          placeholder="Votre Nom"
        />
        <TextInput
          style={styles.Input}
          onChangeText={setPrenom}
          value={Prenom}
          placeholder="Votre Prénom"
        />
        <TextInput
          style={styles.Input}
          onChangeText={setIdentifiant}
          value={Identifiant}
          placeholder="Créer un Identifiant"
        />
        <TextInput
          style={styles.Input}
          onChangeText={setPassword}
          value={Password}
          placeholder="Créer votre mot de passe"
          secureTextEntry={false}
        />
      </View>

      <View style={styles.BtnPosition}>
        <Link href="" asChild>
          <TouchableOpacity style={bouton_style.BoutonForme} onPress={formPost}>
            <Text style={bouton_style.BoutonTexte}>Créer son compte</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  InputPosition: {
    flex: 2,
    justifyContent: "center",
  },

  Input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },

  BtnPosition: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
});
