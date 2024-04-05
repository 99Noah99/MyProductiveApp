import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text,
	Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import bouton_style from "../../styles/bouton_style";
import * as Device from "expo-device";
import { AuthContext } from "../../context/AuthProvider";

const register = () => {
	//Valeur des inputs
	const [Nom, setNom] = useState("");
	const [Prenom, setPrenom] = useState("");
	const [Identifiant, setIdentifiant] = useState("");
	const [Password, setPassword] = useState("");

	const { register } = useContext(AuthContext); //récupération fonction register du context AuthContext créé dans le fichier AuthProvider.js
	let deviceName = Device.deviceName;

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
				<TouchableOpacity
					style={bouton_style.BoutonForme}
					onPress={() =>
						register(Nom, Prenom, Identifiant, Password, deviceName)
					}
				>
					<Text style={bouton_style.BoutonTexte}>Créer son compte</Text>
				</TouchableOpacity>
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
