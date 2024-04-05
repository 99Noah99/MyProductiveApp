import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Modal,
	TouchableWithoutFeedback,
	TouchableOpacity,
	ImageBackground,
	TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { TacheContext } from "../../context/TacheProvider";

const TDB = () => {
	const { ModalVisible, setModalVisible } = useContext(TacheContext);
	const [tacheActive, setTacheActive] = useState(true);
	const [groupeActive, setGroupeActive] = useState(false);
	const [TacheIntitule, setTacheIntitule] = useState("");

	const tacheContainer = () => {
		setTacheActive(true);
		setGroupeActive(false);
	};

	const groupeContainer = () => {
		setGroupeActive(true);
		setTacheActive(false);
	};

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
									source={require("../../assets/images/modal_header2.jpg")}
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

								{tacheActive && (
									<TextInput
										style={styles.Input}
										onChangeText={setTacheIntitule}
										value={TacheIntitule}
										placeholder="Votre tache"
									/>
								)}

								{groupeActive && (
									<View>
										<Text>Groupe Container</Text>
									</View>
								)}
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
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
	},

	Modal_contenu: {
		backgroundColor: "white",
		width: 330,
		height: 450,
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
		backgroundColor: "#E9E9E9",
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
