import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const CreateTache = () => {
	const [TacheIntitule, setTacheIntitule] = useState("");
	const [statut, setStatut] = useState(null);
	const [groupe, setGroupe] = useState(null);

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
					// renderItem={renderItem}
				/>
			</View>

			<View style={styles.dropdown_containeur}>
				<Text style={{ marginHorizontal: 5, fontSize: 16 }}>Attribuer :</Text>
				<Dropdown
					style={styles.dropdown}
					data={data}
					search={false}
					autoScroll={false}
					maxHeight={200}
					labelField="label" //indique ce qui est considérer comme label dans le data
					valueField="value" // indique ce qui est considérer comme value dans le data
					placeholder="attribuer à un groupe"
					value={statut}
					onChange={(item) => {
						setStatut(item.value);
					}}
					// renderItem={renderItem}
				/>
			</View>

			<View style={styles.bouton_containeur}>
				<TouchableOpacity style={styles.bouton}>
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
		elevation: 5,
		backgroundColor: "white",
	},

	bouton_text: {
		fontSize: 16,
		fontWeight: "600",
		color: "orange",
	},
});
