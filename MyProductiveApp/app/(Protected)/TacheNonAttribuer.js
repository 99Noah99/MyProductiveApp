import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { AuthContext } from "../../context/AuthProvider";
import { API_URL } from "@env";
import axios from "axios";

const TacheNonAttribuer = () => {
	const { user, token } = useContext(AuthContext);
	const [DataTache, setDataTache] = useState(null);

	useFocusEffect(
		React.useCallback(() => {
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
							console.log("response du getTaches", response.data.taches);
							setDataTache(response.data.taches);
						}
					})
					.catch((error) => {
						console.log(error);
						console.log("catch error du getTaches");
					});
			}
			getTaches(user, token);
			console.log("chargement des taches");
		}, [])
	);

	// Design de chaque éléments du flatlist
	const renderItem = ({ item }) => (
		<View style={{ padding: 10 }}>
			<Text>{item.Intitule}</Text>
			{/* Vous pouvez afficher d'autres informations ici si nécessaire */}
		</View>
	);

	const keyExtractor = (item) => item.Id_Tache.toString();

	return (
		<SafeAreaView>
			<FlatList
				data={DataTache}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
			/>
		</SafeAreaView>
	);
};

export default TacheNonAttribuer;
