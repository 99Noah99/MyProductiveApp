import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useRef } from "react";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "../../../context/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "@env";
import axios from "axios";

const TacheNonAttribuer = () => {
	const { user, token } = useContext(AuthContext);
	const [DataTache, setDataTache] = useState(null);
	const [IsRefresh, setIsRefresh] = useState(false);
	const swipeableRef = useRef(null); // Ref to access Swipeable methods
	let row = [];
	let prevOpenedRow;

	//permet de "dé" swipe toute les taches qui ont précédement été swipe
	useFocusEffect(
		React.useCallback(() => {
			return () => {
				if (swipeableRef.current) {
					swipeableRef.current.close(); // Close Swipeable when leaving the screen
				}
			};
		}, [])
	);

	useFocusEffect(
		React.useCallback(() => {
			getTaches(user, token);
			console.log("chargement des taches");
		}, [])
	);

	// ----------------------------- FONCTIONS ---------------------------------//
	async function getTaches(user, token) {
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

	async function deleteTache(token, item) {
		await axios({
			method: "post",
			url: `${API_URL}/api/deleteTache`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				tache: item.Id_Tache,
			},
		})
			.then((response) => {
				if (response.data.status == true) {
					console.log(response.data);
				}
			})
			.catch((error) => {
				console.log(error);
				console.log("erreur en JSON", error.toJSON());
				console.log("catch error delete Tache");
			});
	}

	// ------------------------------------------------------------------------ //

	// Design de chaque éléments du flatlist
	const renderItem = ({ item }) => {
		const closeRow = (item) => {
			console.log("closeRow : ", prevOpenedRow);
			if (prevOpenedRow && prevOpenedRow !== row[item.Id_Tache]) {
				prevOpenedRow.close();
			}
			prevOpenedRow = row[item.Id_Tache];
		};

		return (
			<Swipeable
				ref={(ref) => {
					// Appeler handleSwipe pour gérer la logique de fermeture
					// console.log("le ref : ", ref);
					if (swipeableRef.current && swipeableRef.current !== ref) {
						swipeableRef.current.close(); // Close other Swipeable when opening a new one
					}
					swipeableRef.current = ref;
					// Affecter la référence à row[index]
					row[item.Id_Tache] = ref;
				}}
				renderRightActions={() => swipeButton(item)} // Passer item à la fonction swipeButton
				friction={2}
				onSwipeableOpen={() => closeRow(item)}
			>
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
			</Swipeable>
		);
	};

	const swipeButton = (item) => (
		<View style={styles_items.swipeContaineur}>
			<TouchableOpacity
				style={styles_items.swipeBouton}
				onPress={() => {
					deleteTache(token, item);
					getTaches(user, token);
				}}
			>
				<AntDesign name="delete" size={32} color="red" />
			</TouchableOpacity>
			<TouchableOpacity>
				<AntDesign name="addfolder" size={32} color="black" />
			</TouchableOpacity>
		</View>
	);

	const keyExtractor = (item) => item.Id_Tache.toString();

	return (
		<GestureHandlerRootView>
			<SafeAreaView>
				{DataTache == null ? (
					<ActivityIndicator size="large" color="black" />
				) : (
					<FlatList
						data={DataTache}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
						refreshing={IsRefresh} // permet d'afficher le logo chargement
						onRefresh={async () => {
							// action lors du rafraichissement
							setIsRefresh(true);
							await getTaches(user, token);
							setIsRefresh(false);
						}}
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
		</GestureHandlerRootView>
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

	swipeContaineur: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
	},

	swipeBouton: {
		marginRight: 10,
	},
});
