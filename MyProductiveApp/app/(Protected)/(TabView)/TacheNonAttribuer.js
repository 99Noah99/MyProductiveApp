import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "../../../context/AuthProvider";
import { API_URL } from "@env";
import axios from "axios";

const TacheNonAttribuer = () => {
	const { user, token } = useContext(AuthContext);
	const [DataTache, setDataTache] = useState(null);

	useFocusEffect(
		React.useCallback(() => {
			async function getTaches(user, token) {
				console.log("ip :", API_URL);
				await axios({
					method: "post",
					url: `${API_URL}/api/getTaches`,
					headers: { Authorization: `Bearer ${token}` },
					data: {
						user: user,
					},
				})
					.then((response) => {
						if (response.data.status == true) {
							// console.log("response du getTaches", response.data.taches);
							setDataTache(response.data.taches);
						}
					})
					.catch((error) => {
						console.log(error);
						console.log("erreur en JSON", error.toJSON());
						console.log("catch error du getTaches");
					});
			}
			getTaches(user, token);
			console.log("chargement des taches");
		}, [])
	);

	// Design de chaque éléments du flatlist
	const renderItem = ({ item }) => (
		<View style={styles_items.containeur}>
			<Text style={styles_items.text_intitule}>{item.Intitule}</Text>
			{item.Statut == "urgent" ? (
				<Text
					style={StyleSheet.compose(styles_items.text_statut, {
						backgroundColor: "#FF7171",
					})}
				>
					{item.Statut}
				</Text>
			) : item.Statut === "important" ? (
				<Text
					style={StyleSheet.compose(styles_items.text_statut, {
						backgroundColor: "#FFE3A2",
					})}
				>
					{item.Statut}
				</Text>
			) : item.Statut === "moyen" ? (
				<Text
					style={StyleSheet.compose(styles_items.text_statut, {
						backgroundColor: "#FFFF75",
					})}
				>
					{item.Statut}
				</Text>
			) : (
				<Text
					style={StyleSheet.compose(styles_items.text_statut, {
						backgroundColor: "#B4FFB8",
					})}
				>
					{item.Statut}
				</Text>
			)}
		</View>
	);

	const keyExtractor = (item) => item.Id_Tache.toString();

	return (
		<SafeAreaView>
			{DataTache == null ? (
				<ActivityIndicator size="large" color="black" />
			) : (
				<FlatList
					data={DataTache}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					ListEmptyComponent={
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text>Aucune tâche à afficher</Text>
						</View>
					}
				/>
			)}
		</SafeAreaView>
	);
};

export default TacheNonAttribuer;

const styles_items = StyleSheet.create({
	containeur: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginHorizontal: 10,
		marginVertical: 7,
		padding: 10,
		borderRadius: 10,
		backgroundColor: "white",

		//Shadow
		elevation: 2,
		shadowColor: "#202020",
		shadowOffset: {
			width: 6,
			height: 6,
		},
		shadowOpacity: 0.6,
		shadowRadius: 4,
	},

	text_intitule: {
		flex: 1,
		fontSize: 17,
	},

	text_statut: {
		fontSize: 14,
		borderRadius: 10,
		textAlignVertical: "center",
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
});
