import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { TacheContext } from "../context/TacheProvider";
import { API_URL } from "@env";
import axios from "axios";

const CreateGroupe = ({ getGroupes }) => {
	const { setModalVisible } = useContext(TacheContext);
	const [Nom_Groupe, setNom_Groupe] = useState("");
	const [Description, setDescription] = useState("");
	const { user, token } = useContext(AuthContext);

	async function createGroupe(user, token, Nom_Groupe, Description) {
		if (!Nom_Groupe || !Description) {
			Alert.alert("Champs requis", "Veuillez remplir tous les champs");
			return;
		} else {
			await axios({
				method: "post",
				url: `${API_URL}/api/createGroupe`,
				headers: { Authorization: `Bearer ${token}` },
				data: {
					user: user,
					Nom_Groupe: Nom_Groupe,
					Description: Description,
				},
			})
				.then((response) => {
					if (response.data.status == true) {
						console.log(response.data);
						// après l'ajout d'un nouveau groupe on récupère de nouveau tout les groupes
						getGroupes(user, token);

						//on ferme le Modal
						setModalVisible(false);
					} else {
						// vérif si type de réponse est objet
						if (
							response.data.message_erreur !== null &&
							typeof response.data.message_erreur === "object"
						) {
							let response_api = Object.values(
								response.data.message_erreur
							)[0][0];
							Alert.alert("Erreur", response_api);
						}
						//Si c'est ce type string
						else {
							Alert.alert("Erreur", response.data.message_erreur);
						}
					}
				})
				.catch((error) => {
					console.log(error);
					console.log("du catch error du createGroupe ");
				});
		}
	}

	return (
		<View style={styles.containeur}>
			<TextInput
				style={styles.Input}
				onChangeText={setNom_Groupe}
				value={Nom_Groupe}
				placeholder="Nom du groupe"
			/>

			<TextInput
				multiline={true}
				style={StyleSheet.compose(styles.Input, styles.Input_mutiligne)}
				onChangeText={setDescription}
				value={Description}
				placeholder="Description"
			/>

			<View style={styles.bouton_containeur}>
				<TouchableOpacity
					style={styles.bouton}
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<Text style={styles.bouton_text}>Annuler</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.bouton}
					onPress={() => createGroupe(user, token, Nom_Groupe, Description)}
				>
					<Text style={styles.bouton_text}>Ajouter</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CreateGroupe;

const styles = StyleSheet.create({
	containeur: {
		flex: 1,
		width: "100%",
		alignItems: "center",
	},

	Input: {
		width: "80%",
		height: 40,
		margin: 12,
		borderWidth: 0.5,
		borderRadius: 10,
		padding: 10,
	},

	Input_mutiligne: {
		height: "auto",
		maxHeight: 100,
	},

	bouton_containeur: {
		position: "absolute",
		bottom: 20,
		flexDirection: "row",
	},

	bouton: {
		marginHorizontal: 55,
		padding: 8,
		borderRadius: 10,
		borderColor: "black",
		borderWidth: 0.5,
		elevation: 4,
		backgroundColor: "white",
	},

	bouton_text: {
		fontSize: 16,
		fontWeight: "600",
		color: "orange",
	},
});
