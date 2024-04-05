import { Alert } from "react-native";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(); // création du contexte
import { API_URL } from "@env";
import axios from "axios";
import { router, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const segments = useSegments();

	useEffect(() => {
		if (!user && segments[0] === "(Protected)") {
			router.push("");
		} else if (
			user &&
			(segments[0] == undefined || segments[0] === "(Connexion)")
		) {
			router.replace("/(Protected)/TDB");
		}
		console.log("reload du AuthProvider");
	}, [user, segments]);

	const varStorage = async (user, token) => {
		await SecureStore.setItemAsync("user", JSON.stringify(user));
		await SecureStore.setItemAsync("token", JSON.stringify(token));
	};

	const varSuppressionStorage = async (user, token) => {
		await SecureStore.deleteItemAsync("user");
		await SecureStore.deleteItemAsync("token");
	};

	return (
		<AuthContext.Provider
			value={{
				loading,
				setLoading,
				user,
				setUser,
				token,
				setToken,

				register: async (Nom, Prenom, Identifiant, Password, deviceName) => {
					if (!Nom || !Prenom || !Identifiant || !Password) {
						Alert.alert("Champs requis", "Veuillez remplir tous les champs");
						return;
					} else {
						await axios({
							method: "post",
							url: `${API_URL}/api/register`,
							data: {
								Nom: Nom,
								Prenom: Prenom,
								Identifiant: Identifiant,
								Password: Password,
								deviceName: deviceName,
							},
						})
							.then((response) => {
								if (response.data.status == true) {
									varStorage(response.data.user, response.data.token);
									setUser(response.data.user);
									setToken(response.data.token);
								} else {
									// vérif si type de réponse est objet
									if (
										response.data.message_erreur !== null &&
										typeof response.data.message_erreur === "object"
									) {
										let response_api = Object.values(
											response.data.message_erreur
										)[0][0];
										Alert.alert("Erreur", response_api);
										// type de la réponse autre (string)
									} else {
										console.log(typeof response.data.message_erreur);
										Alert.alert("Erreur", response.data.message_erreur);
									}
								}
							})
							.catch((error) => {
								console.log(error);
							});
					}
				},

				login: async (Identifiant, Password, deviceName) => {
					if (!Identifiant || !Password) {
						Alert.alert("Champs requis", "Veuillez remplir tous les champs");
						return;
					} else {
						setLoading(true);
						await axios({
							method: "post",
							url: `${API_URL}/api/login`,
							data: {
								Identifiant: Identifiant,
								Password: Password,
								deviceName: deviceName,
							},
						})
							.then((response) => {
								setLoading(false);
								if (response.data.status == true) {
									varStorage(response.data.user, response.data.token);
									console.log(SecureStore.getItemAsync("user"));
									setUser(response.data.user);
									setToken(response.data.token);
								} else {
									// vérif si type de réponse est objet
									if (
										response.data.message_erreur !== null &&
										typeof response.data.message_erreur === "object"
									) {
										let response_api = Object.values(
											response.data.message_erreur
										)[0][0];
										Alert.alert("Erreur", response_api);
									}
									//Si c'est ce type string
									else {
										Alert.alert("Erreur", response.data.message_erreur);
									}
								}
							})
							.catch((error) => {
								setLoading(false);
								console.log(error);
								console.log(error.response.data);
							});
					}
				},

				logout: async (user, token) => {
					await axios({
						method: "post",
						url: `${API_URL}/api/logout`,
						headers: { Authorization: `Bearer ${token}` },
						data: {
							user: user,
						},
					})
						.then((response) => {
							if (response.data.status == true) {
								varSuppressionStorage();
								setUser(null);
								setToken(null);
								console.log(response.data);
							}
						})
						.catch((error) => {
							console.log(error);
							console.log("du catch error");
							console.log(error.response.data);
						});
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
