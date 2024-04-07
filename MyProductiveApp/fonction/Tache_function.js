import { API_URL } from "@env";
import axios from "axios";

export function getGroupes(user, token) {
	axios({
		method: "post",
		url: `${API_URL}/api/getGroupes`,
		headers: { Authorization: `Bearer ${token}` },
		data: {
			user: user,
		},
	})
		.then((response) => {
			if (response.data.status == true) {
				console.log("le resulte response", response.data.groupes);
				return response.data.groupes;
			}
		})
		.catch((error) => {
			console.log(error);
			console.log("du catch error");
		});
}

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
