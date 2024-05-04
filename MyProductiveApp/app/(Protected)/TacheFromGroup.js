import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { useFocusEffect, useLocalSearchParams, Stack } from "expo-router";
import { AuthContext } from "../../context/AuthProvider";
import { API_URL } from "@env";
import axios from "axios";

const TacheFromGroup = () => {
	const { token } = useContext(AuthContext);
	const { Id_Groupe, Nom_Groupe } = useLocalSearchParams();
	const [DataTache, setDataTache] = useState(null);

	async function getTaches(token, Id_Groupe) {
		await axios({
			method: "get",
			url: `${API_URL}/api/getTaches`,
			headers: { Authorization: `Bearer ${token}` },
			params: {
				Id_Groupe: Id_Groupe,
			},
		})
			.then((response) => {
				if (response.data.status == true) {
					console.log(response.data.message);
					console.log(response.data.taches);
					setDataTache(response.data.taches);
				}
			})
			.catch((error) => {
				console.log(error);
				console.log("erreur en JSON", error.toJSON());
				console.log("catch error du getTaches");
			});
	}

	useFocusEffect(
		React.useCallback(() => {
			if (token) {
				getTaches(token, Id_Groupe);
			}
		}, [token])
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
		<SafeAreaView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					title: Nom_Groupe, // permet de changer le nom du header dynamiquement en fonction du groupe
					headerStyle: { backgroundColor: "#f4511e" },
					headerTintColor: "white",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
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

export default TacheFromGroup;

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
