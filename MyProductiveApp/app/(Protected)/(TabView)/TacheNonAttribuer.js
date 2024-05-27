import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	Modal,
	TouchableWithoutFeedback,
	ImageBackground,
} from "react-native";
import React, { useState, useContext, useRef } from "react";
import { useFocusEffect } from "expo-router";

//import packages pour gestion du swipe
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

//import Icones
import { AntDesign } from "@expo/vector-icons";

//Import outils requetes
import { API_URL } from "@env";
import axios from "axios";

// Import des contextes
import { AuthContext } from "../../../context/AuthProvider";

//Ajout de composant externe
import AssignTacheToGroupe from "../../../components/AssignTacheToGroupe";

const TacheNonAttribuer = () => {
	const { token } = useContext(AuthContext);
	const [DataTache, setDataTache] = useState(null);
	const [IsRefresh, setIsRefresh] = useState(false);
	const [ModalVisible, setModalVisible] = useState(false);
	const [TacheInfoForModal, setTacheInfoForModal] = useState(null);
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
			if (token) {
				getTaches(token);
			}
			console.log("chargement des taches");
		}, [token])
	);

	// ----------------------------- FONCTIONS ---------------------------------//
	async function getTaches(token) {
		await axios({
			method: "get",
			url: `${API_URL}/api/getTaches`,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.data.status == true) {
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
					console.log("tache supprime" + response.data);
					getTaches(token);
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
				}}
			>
				<AntDesign name="delete" size={32} color="red" />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					setTacheInfoForModal(item);
					setModalVisible(true);
				}}
			>
				<AntDesign name="addfolder" size={32} color="black" />
			</TouchableOpacity>
		</View>
	);

	const keyExtractor = (item) => item.Id_Tache.toString();

	return (
		<GestureHandlerRootView>
			<SafeAreaView>
				<Modal
					visible={ModalVisible}
					onRequestClose={() => setModalVisible(false)}
					onBackdropPress={() => setModalVisible(false)}
					animationType="slide"
					transparent={true}
				>
					<TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
						<View style={styles_Modal.Modal_position}>
							<TouchableWithoutFeedback>
								<View
									style={[
										styles_Modal.Modal_contenu,
										styles_Modal.Modal_Shadow_android,
										styles_Modal.Modal_Shadow_ios,
									]}
								>
									<ImageBackground
										source={require("../../../assets/images/modal_header4.jpg")}
										style={styles_Modal.Modal_header}
									>
										<Text style={styles_Modal.Modal_header_text}>
											Attribuer la Tâche
										</Text>
									</ImageBackground>

									{/* Contenu du modal  */}
									<AssignTacheToGroupe
										tache_info={TacheInfoForModal}
										setModalVisible={setModalVisible}
										getTaches={getTaches}
									/>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
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
							await getTaches(token);
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

const styles_Modal = StyleSheet.create({
	Modal_position: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.6)", // blanc avec 50% d'opacité
	},

	Modal_contenu: {
		flexDirection: "column",
		alignItems: "flex-start",
		backgroundColor: "white",
		width: 330,
		height: 280,
		borderRadius: 15,
		alignItems: "center",
	},

	Modal_Shadow_ios: {
		shadowColor: "#202020",
		shadowOffset: {
			width: 6,
			height: 6,
		},
		shadowOpacity: 0.6,
		shadowRadius: 4,
	},

	Modal_Shadow_android: {
		elevation: 12,
		shadowColor: "#202020",
	},

	Modal_header: {
		width: "100%",
		height: 50,
		overflow: "hidden",
		resizeMode: "repeat",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		justifyContent: "center",
		alignItems: "center",
	},

	Modal_header_text: {
		fontSize: 30,
		fontWeight: "bold",
		color: "white",
		textShadowColor: "black", // Couleur de la bordure
		textShadowRadius: 10, // Rayon de la bordure
	},
});
