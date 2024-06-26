import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Modal,
	TouchableWithoutFeedback,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	ActivityIndicator,
	Dimensions,
	Pressable,
	Alert,
	Vibration,
} from "react-native";
import React, { useContext, useState } from "react";
import { useFocusEffect, router } from "expo-router";

//Ajout de composant externe
import CreateTache from "../../../components/CreateTache";
import CreateGroupe from "../../../components/CreateGroupe";

// Import des contextes
import { TacheContext } from "../../../context/TacheProvider";
import { AuthContext } from "../../../context/AuthProvider";

//Import outils requetes
import { API_URL } from "@env";
import axios from "axios";

const TDB = () => {
	const { user, token } = useContext(AuthContext);
	const { ModalVisible, setModalVisible } = useContext(TacheContext);
	const [tacheActive, setTacheActive] = useState(true);
	const [groupeActive, setGroupeActive] = useState(false);
	const [DataGroupe, setDataGroupe] = useState(null);
	const [IsRefresh, setIsRefresh] = useState(false);
	const screenWidth = Dimensions.get("window").width;
	const squareSize = (screenWidth - 10) / 2 - 10;

	const tacheContainer = () => {
		setTacheActive(true);
		setGroupeActive(false);
	};

	const groupeContainer = () => {
		setGroupeActive(true);
		setTacheActive(false);
	};

	async function getGroupes(token) {
		console.log("le token du get groupe", token);
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
				console.log("catch error du getGroupe Dropdown page TDB");
			});
	}

	async function deleteGroupe(user, token, groupe) {
		await axios({
			method: "post",
			url: `${API_URL}/api/deleteGroupe`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				user: user,
				groupe: groupe,
			},
		})
			.then((response) => {
				if (response.data.status == true) {
					console.log("groupe supprimer");
					getGroupes(token);
				}
			})
			.catch((error) => {
				console.log(error);
				console.log("erreur en JSON", error.toJSON());
				console.log("catch error de l'alerte de suppresion");
			});
	}

	//Execute fonction getGroupes à chaque ouverture de la page
	useFocusEffect(
		React.useCallback(() => {
			if (token) {
				getGroupes(token);
			}
		}, [token])
	);
	const AlertSuppgroupe = (item) => {
		Vibration.vibrate(200);
		Alert.alert(
			"Suppression du Groupe",
			`Voulez-vous vraiment supprimer le groupe ${item.Nom_Groupe} ainsi que ses tâches ?`,
			[
				{
					text: "Annuler",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},

				{
					text: "Supprimer",
					onPress: () => {
						deleteGroupe(user, token, item);
					},
					style: "destructive",
				},
			],
			{
				cancelable: true, // Empêche de fermer l'alerte en appuyant en dehors de celle-ci ou en appuyant sur le bouton de retour
			}
		);
	};

	const renderItem = ({ item }) => (
		<Pressable
			onPress={() =>
				router.push({
					pathname: "../TacheFromGroup",
					params: {
						Id_Groupe: item.Id_Groupe,
						Nom_Groupe: item.Nom_Groupe,
					},
				})
			}
			onLongPress={() => AlertSuppgroupe(item)}
		>
			<View
				style={StyleSheet.compose(styles_items.containeur, {
					width: squareSize,
					height: squareSize,
				})}
			>
				<ImageBackground
					source={require("../../../assets/images/modal_header4.jpg")}
					style={styles_items.image}
				>
					<Text style={styles_items.text_nom_groupe}>{item.Nom_Groupe}</Text>
				</ImageBackground>
				<Text style={styles_items.text_description}>{item.Description}</Text>
				<Text style={styles_items.text_nb}>
					Nombre de tâches :{item.nombre_taches}
				</Text>
			</View>
		</Pressable>
	);

	const keyExtractor = (item) => item.Id_Groupe.toString();

	return (
		<SafeAreaView>
			<Modal
				visible={ModalVisible}
				onRequestClose={() => setModalVisible(false)}
				onBackdropPress={() => setModalVisible(false)}
				animationType="slide"
				transparent={true}
			>
				<TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
					<View style={styles.Modal_position}>
						<TouchableWithoutFeedback>
							<View
								style={[
									styles.Modal_contenu,
									styles.Modal_Shadow_android,
									styles.Modal_Shadow_ios,
								]}
							>
								<ImageBackground
									source={require("../../../assets/images/modal_header4.jpg")}
									style={styles.Modal_header}
								>
									<Text style={styles.Modal_header_text}>Créer</Text>
								</ImageBackground>

								<View style={styles.container_choix}>
									<View style={styles.buttonChoixContainer}>
										<TouchableOpacity
											onPress={() => tacheContainer()}
											style={StyleSheet.compose(
												styles.button_choix,
												tacheActive ? styles.button_choix_active : null
											)}
										>
											<Text>Tâche</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.buttonChoixContainer}>
										<TouchableOpacity
											onPress={() => groupeContainer()}
											style={StyleSheet.compose(
												styles.button_choix,
												groupeActive ? styles.button_choix_active : null
											)}
										>
											<Text>Groupe</Text>
										</TouchableOpacity>
									</View>
								</View>

								{/* Contenu du modal  */}
								{tacheActive && <CreateTache getGroupes={getGroupes} />}

								{groupeActive && <CreateGroupe getGroupes={getGroupes} />}
								{/* Fin contenu du modal  */}
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			{DataGroupe == null ? (
				<ActivityIndicator size="large" color="black" />
			) : (
				<FlatList
					data={DataGroupe}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					numColumns={2}
					columnWrapperStyle={styles_items.colonne_flatlist}
					refreshing={IsRefresh} // permet d'afficher le logo chargement
					onRefresh={async () => {
						// action lors du rafraichissement
						setIsRefresh(true);
						await getGroupes(token);
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
							<Text>Aucun groupe à afficher</Text>
						</View>
					}
				/>
			)}
		</SafeAreaView>
	);
};

export default TDB;

const styles = StyleSheet.create({
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
		height: 380,
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
		color: "white",
		fontWeight: "bold",
		textShadowColor: "black", // Couleur de la bordure
		textShadowRadius: 10, // Rayon de la bordure
	},

	container_choix: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingLeft: 15,
		paddingRight: 15,
	},

	buttonChoixContainer: {
		width: "50%",
		paddingHorizontal: 5,
	},

	button_choix: {
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		padding: 8,
		borderRadius: 10,
		borderColor: "black",
		borderWidth: 0.5,
	},

	button_choix_active: {
		elevation: 5,
		backgroundColor: "#FFE3C6",
	},

	Input: {
		width: "80%",
		height: 40,
		margin: 12,
		borderWidth: 0.5,
		borderRadius: 10,
		padding: 10,
	},
});

const styles_items = StyleSheet.create({
	containeur: {
		marginVertical: 10,
		backgroundColor: "white",
		// width: "45%",
		// margin: 10,
		// aspectRatio: 1,
		borderBlockColor: "black",
		borderWidth: 0.4,
		borderRadius: 10,
		elevation: 5,
		shadowColor: "#202020",
		shadowOffset: {
			width: 6,
			height: 6,
		},
		shadowOpacity: 0.6,
		shadowRadius: 4,
	},

	colonne_flatlist: {
		justifyContent: "space-evenly",
	},

	image: {
		padding: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: "hidden",
		resizeMode: "repeat",
		height: 45,
		justifyContent: "center",
	},

	text_nom_groupe: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
		textShadowColor: "black", // Couleur de la bordure
		textShadowRadius: 10, // Rayon de la bordure
	},

	text_description: {
		marginTop: 10,
		textAlign: "center",
	},

	text_nb: {
		flex: 1,
		fontSize: 16,
		fontWeight: "700",
		textAlignVertical: "center",
		textAlign: "center",
	},
});
