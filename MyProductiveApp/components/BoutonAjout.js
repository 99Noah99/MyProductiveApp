import { View, TouchableOpacity, StyleSheet } from "react-native";
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
				<Entypo name="add-to-list" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default BoutonAjout;

const styles = StyleSheet.create({
	bouton_position: {
		paddingRight: 20,
	},
});
