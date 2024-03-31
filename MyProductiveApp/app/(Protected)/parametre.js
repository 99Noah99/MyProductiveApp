import React, { useState, useContext } from "react";
import { Link } from "expo-router";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import bouton_style from "../../styles/bouton_style";
import { AuthContext } from "../../context/AuthProvider";

const parametre = () => {
	const { user, token, logout } = useContext(AuthContext);
	return (
		<SafeAreaView style={styles.AccueilParam}>
			<View style={styles.BtnPosition}>
				<TouchableOpacity
					style={bouton_style.BoutonForme}
					onPress={() => logout(user, token)}
				>
					<Text style={bouton_style.BoutonTexte}>Se déconnecter</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	AccueilParam: {
		backgroundColor: "white", //ou #042C28
		flex: 1,
	},

	BtnPosition: {
		flex: 2,
		rowGap: 30,
		marginVertical: 50,
		justifyContent: "center", // Alignement horizontal centré
		alignItems: "center", // Alignement vertical centré (optionnel)
	},
});

export default parametre;
