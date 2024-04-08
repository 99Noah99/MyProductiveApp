import { API_URL } from "@env";
import axios from "axios";
import { Alert } from "react-native";

export async function createTache(user, token, TacheIntitule, statut, groupe) {
	console.log("tache intitule : ", TacheIntitule);
	console.log("statut : ", statut);
	console.log("groupe : ", groupe);
	if (!TacheIntitule || !statut || !groupe) {
		Alert.alert("Champs requis", "Veuillez remplir tous les champs");
		return;
	} else {
		await axios({
			method: "post",
			url: `${API_URL}/api/createTache`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				user: user,
				TacheIntitule: TacheIntitule,
				statut: statut,
				groupe: groupe,
			},
		})
			.then((response) => {
				if (response.data.status == true) {
					console.log(response);
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
				console.log(error);
				console.log("du catch error");
			});
	}
}

// export function getGroupes(user, token) {
// 	axios({
// 		method: "post",
// 		url: `${API_URL}/api/getGroupes`,
// 		headers: { Authorization: `Bearer ${token}` },
// 		data: {
// 			user: user,
// 		},
// 	})
// 		.then((response) => {
// 			if (response.data.status == true) {
// 				console.log("le resulte response", response.data.groupes);
// 				return response.data.groupes;
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			console.log("du catch error");
// 		});
// }

// export function getGroupes(user, token) {
// 	return new Promise((resolve, reject) => {
// 		axios({
// 			method: "post",
// 			url: `${API_URL}/api/getGroupes`,
// 			headers: { Authorization: `Bearer ${token}` },
// 			data: { user: user },
// 		})
// 			.then((response) => {
// 				if (response.data.status == true) {
// 					console.log("le resulte response", response.data.groupes);
// 					resolve(response.data.groupes); // Résoudre la promesse avec les groupes
// 				} else {
// 					reject(new Error("Erreur lors de la récupération des groupes")); // Rejeter la promesse avec une erreur
// 				}
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 				console.log("du catch error");
// 				reject(error); // Rejeter la promesse avec l'erreur
// 			});
// 	});
// }

// export async function getGroupes(user, token) {
//     try {
//         const response = await axios({
//             method: "post",
//             url: `${API_URL}/api/getGroupes`,
//             headers: { Authorization: `Bearer ${token}` },
//             data: { user: user },
//         });

//         if (response.data.status === true) {
//             console.log("le resulte response", response.data.groupes);
//             return response.data.groupes;
//         } else {
//             throw new Error("Erreur lors de la récupération des groupes");
//         }
//     } catch (error) {
//         console.log(error);
//         console.log("du catch error");
//         throw error; // Rejeter la promesse avec l'erreur
//     }
// }
