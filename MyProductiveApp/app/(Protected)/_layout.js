import React from "react";
import { Tabs } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import BoutonAjout from "../../components/BoutonAjout";
import { TacheProvider } from "../../context/TacheProvider";

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
					name="parametre"
					options={{
						title: "Paramètres",
						tabBarIcon: ({ color }) => (
							<Feather name="settings" size={24} color={color} />
						),
					}}
				/>
			</Tabs>
		</TacheProvider>
	);
}
