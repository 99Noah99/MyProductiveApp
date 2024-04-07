import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../context/AuthProvider";
import { TacheContext } from "../context/TacheProvider";
import { API_URL } from "@env";
import axios from "axios";

//Import function request api
// import { getGroupes } from "../fonction/Tache_function";

const CreateTache = () => {
	const { setModalVisible } = useContext(TacheContext);
	const [TacheIntitule, setTacheIntitule] = useState("");
	const [DataGroupe, setDataGroupe] = useState([
		{ Nom_Groupe: "ne pas attribuer", Id_Groupe: 0 },
	]);
	const [statut, setStatut] = useState(null);
	const [groupe, setGroupe] = useState(null);
	const { user, token } = useContext(AuthContext);

	useEffect(() => {
		async function getGroupes(user, token) {
			await axios({
				method: "post",
				url: `${API_URL}/api/getGroupes`,
				headers: { Authorization: `Bearer ${token}` },
				data: {
					user: user,
				},
			})
				.then((response) => {
					if (response.data.status == true) {
						console.log("le resulte response", response.data.groupes);
						setDataGroupe((prevDataGroupe) => [
							...prevDataGroupe, // Copie des données existantes
							...response.data.groupes, // Ajout des nouvelles données à la fin
						]);
					}
				})
				.catch((error) => {
					console.log(error);
					console.log("du catch error");
				});
		}
		getGroupes(user, token);
	}, []);

	const data = [
		{ label: "URGENT", value: "urgent" },
		{ label: "important", value: "important" },
		{ label: "moyen", value: "moyen" },
		{ label: "faible", value: "faible" },
	];

	return (
		<View style={styles.containeur}>
			<TextInput
				style={styles.Input}
				onChangeText={setTacheIntitule}
				value={TacheIntitule}
				placeholder="Votre tache"
			/>
			<View style={styles.dropdown_containeur}>
				<Text style={{ marginHorizontal: 5, fontSize: 16 }}>
					Prioritisation :
				</Text>
				<Dropdown
					style={styles.dropdown}
					data={data}
					search={false}
					autoScroll={false}
					maxHeight={200}
					labelField="label" //indique ce qui est considérer comme label dans le data
					valueField="value" // indique ce qui est considérer comme value dans le data
					placeholder="Choisissez un statut"
					value={statut}
					onChange={(item) => {
						setStatut(item.value);
					}}
				/>
			</View>

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
							setGroupe(item.value);
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

				<TouchableOpacity style={styles.bouton}>
					<Text style={styles.bouton_text}>Ajouter</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CreateTache;

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
