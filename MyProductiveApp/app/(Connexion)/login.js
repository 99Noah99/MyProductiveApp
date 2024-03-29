import React, { useState, useContext } from "react";
import { Link } from "expo-router";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import bouton_style from "../../styles/bouton_style";
import * as Device from "expo-device";
import { AuthContext } from "../../context/AuthProvider";

export default function Login() {
	const [Identifiant, setIdentifiant] = useState("");
	const [Password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	let deviceName = Device.deviceName;

	return (
		<SafeAreaView style={styles.AccueilParam}>
			<View style={styles.ImageContaineur}>
				<Image
					style={styles.Logo}
					source={require("../../assets/images/accueil.png")}
				/>
			</View>

			<View style={styles.InputPosition}>
				<TextInput
					style={styles.Input}
					onChangeText={setIdentifiant}
					value={Identifiant}
					placeholder="Identifiant"
					keyboardType="default"
				/>
				<TextInput
					style={styles.Input}
					onChangeText={setPassword}
					value={Password}
					placeholder="Mot de passe"
					keyboardType="default"
					secureTextEntry={false} //mot de passe visible ou non
				/>
			</View>

			<View style={styles.BtnPosition}>
				<TouchableOpacity
					style={bouton_style.BoutonForme}
					onPress={() => login(Identifiant, Password, deviceName)}
				>
					<Text style={bouton_style.BoutonTexte}>Se connecter</Text>
				</TouchableOpacity>

				<Link href="/(Connexion)/register" asChild>
					<TouchableOpacity>
						<Text>Se créer un compte</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	AccueilParam: {
		backgroundColor: "white", //ou #042C28
		flex: 1,
	},

	Logo: {
		width: 200,
		height: 200,
		borderRadius: 25,
	},

	ImageContaineur: {
		flex: 3,
		justifyContent: "center", // Alignement horizontal centré
		alignItems: "center", // Alignement vertical centré (optionnel)
	},

	BtnPosition: {
		flex: 2,
		rowGap: 30,
		marginVertical: 50,
		justifyContent: "center", // Alignement horizontal centré
		alignItems: "center", // Alignement vertical centré (optionnel)
	},

	InputPosition: {
		flex: 1,
	},

	Input: {
		height: 50,
		margin: 12,
		borderWidth: 1,
		borderRadius: 15,
		padding: 10,
	},
});
