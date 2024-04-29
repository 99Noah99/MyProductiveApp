import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../context/AuthProvider";
import { API_URL } from "@env";
import axios from "axios";

const AssignTacheToGroupe = (parametre) => {
	const { tache_info, setModalVisible, getTaches } = parametre;
	const { token } = useContext(AuthContext);
	const [DataGroupe, setDataGroupe] = useState(null);
	const [groupe, setGroupe] = useState(null);

	useEffect(() => {
		async function getGroupesForDropdown(token) {
			await axios({
				method: "get",
				url: `${API_URL}/api/getGroupes`,
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((response) => {
					if (response.data.status == true) {
						setDataGroupe(response.data.groupes);
					}
				})
				.catch((error) => {
					console.log(error);
					console.log("erreur en JSON", error.toJSON());
					console.log("catch error du getGroupe Dropdown assignTacheToGroupe");
				});
		}
		getGroupesForDropdown(token);
	}, []);

	// ----------------------------- FONCTIONS ---------------------------------//

	async function AssignTacheToGroupe(token, tache_info, groupe) {
		await axios({
			method: "post",
			url: `${API_URL}/api/AssignTacheToGroupe`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				Tache: tache_info,
				groupe: groupe,
			},
		})
			.then((response) => {
				if (response.data.status == true) {
					setModalVisible(false);
					getTaches(token);
				}
			})
			.catch((error) => {
				console.log(error);
				console.log("erreur en JSON", error.toJSON());
				console.log(
					"catch error erreur lors de l'assignement d'une tache non attribuer, a un groupe"
				);
			});
	}

	return (
		<View style={styles.containeur}>
			<Text style={styles.Input}>Tâche : {tache_info.Intitule}</Text>

			<View style={styles.dropdown_containeur}>
				<Text style={{ marginHorizontal: 5, fontSize: 16 }}>Attribuer :</Text>

				{DataGroupe == null ? (
					<ActivityIndicator size="small" color="black" />
				) : (
					<Dropdown
						style={styles.dropdown}
						data={DataGroupe}
						search={false}
						autoScroll={false}
						maxHeight={200}
						labelField="Nom_Groupe" //indique ce qui est considérer comme label dans le data
						valueField="Id_Groupe" // indique ce qui est considérer comme value dans le data
						placeholder="attribuer à un groupe"
						value={groupe}
						onChange={(item) => {
							setGroupe(item.Id_Groupe);
						}}
					/>
				)}
			</View>

			<View style={styles.bouton_containeur}>
				<TouchableOpacity
					style={styles.bouton}
					onPress={() => setModalVisible(false)}
				>
					<Text style={styles.bouton_text}>Annuler</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.bouton}
					onPress={() => AssignTacheToGroupe(token, tache_info, groupe)}
				>
					<Text style={styles.bouton_text}>Attribuer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default AssignTacheToGroupe;

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
		backgroundColor: "white",
		borderRadius: 5,
		textAlign: "center",
		elevation: 3,
		padding: 10,
	},

	dropdown_containeur: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 7,
	},

	dropdown: {
		marginHorizontal: 5,
		width: "60%",
		height: 40,
		backgroundColor: "white",
		borderRadius: 12,
		padding: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 3,
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
