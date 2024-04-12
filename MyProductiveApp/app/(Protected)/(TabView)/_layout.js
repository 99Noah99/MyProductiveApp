import React from "react";
import { Tabs, Stack } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import BoutonAjout from "../../../components/BoutonAjout";
import { TacheProvider } from "../../../context/TacheProvider";

export default function _layout() {
	return (
		<TacheProvider>
			<Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
				<Tabs.Screen
					name="TDB"
					options={{
						title: "Accueil",
						headerRight: () => <BoutonAjout />,
						tabBarIcon: ({ color }) => (
							<Entypo name="home" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="TacheNonAttribuer"
					options={{
						title: "Tâches à attribuer",
						headerTitleAlign: "center",
						tabBarIcon: ({ color }) => (
							<Entypo name="list" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="parametre"
					options={{
						title: "Paramètres",
						headerTitleAlign: "center",
						tabBarIcon: ({ color }) => (
							<Feather name="settings" size={24} color={color} />
						),
					}}
				/>
			</Tabs>
		</TacheProvider>
	);
}
