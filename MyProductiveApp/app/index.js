import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { AuthContext } from "../context/AuthProvider";

const index = () => {
	const { loading, setLoading } = useContext(AuthContext);
	const { setUser, setToken } = useContext(AuthContext);

	useEffect(() => {
		async function getValueFor() {
			let resultUser = await SecureStore.getItemAsync("user");
			let resultToken = await SecureStore.getItemAsync("token");
			if (resultUser && resultToken) {
				console.log("reload du index");
				setUser(resultUser);
				setToken(resultToken);
				setLoading(false);
				router.replace("/(Protected)/TDB");
			} else {
				console.log("reload du index");
				setLoading(false);
				router.replace("/(Connexion)/login");
			}
		}
		getValueFor();
	}, []); // [] signifie execution 1 seule fois au chargement du composant

	if (loading == true) {
		return (
			<View style={[styles.container]}>
				<ActivityIndicator size="large" color="black" />
				<Text style={{ textAlign: "center" }}>En cours de chargement</Text>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
});

export default index;
