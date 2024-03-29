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
		// const inAuthGroup = segments[0] === "(Connexion)";
		// const isUndefined = segments[0] == undefined;
		// if (!user && !inAuthGroup && isUndefined) {
		// 	router.push("");
		// } else {
		// 	router.push("/TDB");
		// }
		console.log("reload");
	}, [user, segments]);

	const varStorage = async (user, token) => {
		await SecureStore.setItemAsync("user", user); //const userString = JSON.stringify(user);
		await SecureStore.setItemAsync("token", token);
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

				register: (Nom, Prenom, Identifiant, Password, deviceName) => {
					if (!Nom || !Prenom || !Identifiant || !Password) {
						Alert.alert("Champs requis", "Veuillez remplir tous les champs");
						return;
					} else {
						axios({
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
								console.log(response.data);
								if (response.data.status == true) {
									setUser(response.data.user);
									setToken(response.data.token);
									//varStorage(user, token);
								} else {
									// vérif du type de reponse pour affichage alert
									if (
										response.data.message_erreur !== null &&
										typeof response.data.message_erreur === "object"
									) {
										console.log(typeof response.data.message_erreur);
										let response_api = Object.values(
											response.data.message_erreur
										)[0][0];
										Alert.alert("Erreur", response_api);
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
								if (response.data.status == true) {
									setUser(response.data.user);
									setToken(response.data.token);
									//varStorage(user, token);
								} else {
									if (
										response.data.message_erreur !== null &&
										typeof response.data.message_erreur === "object"
									) {
										console.log(typeof response.data.message_erreur);
										let response_api = Object.values(
											response.data.message_erreur
										)[0][0];
										Alert.alert("Erreur", response_api);
									}
									//Si c'est ce type string
									else {
										console.log(typeof response.data.message_erreur);
										Alert.alert("Erreur", response.data.message_erreur);
									}
								}
							})
							.catch((error) => {
								console.log("on arrive dans le catch de l'erreur");
								console.log(error.response.data);
							});
					}
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
