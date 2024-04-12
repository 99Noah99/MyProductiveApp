import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import { TacheContext } from "../context/TacheProvider";

const BoutonAjout = () => {
	const { setModalVisible } = useContext(TacheContext);

	return (
		<View>
			<TouchableOpacity
				style={styles.bouton_position}
				onPress={() => setModalVisible(true)}
			>
				<Text style={{ paddingRight: 6 }}>Nouveau</Text>
				<Entypo name="add-to-list" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default BoutonAjout;

const styles = StyleSheet.create({
	bouton_position: {
		paddingRight: 20,
		flexDirection: "row",
		alignItems: "center",
	},
});
