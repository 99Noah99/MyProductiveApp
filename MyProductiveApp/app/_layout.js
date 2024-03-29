import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthProvider";

export default function _layout() {
	return (
		<AuthProvider>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#FFFAE4",
					},
					headerTintColor: "black",
					flex: 1,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(Protected)" options={{ headerShown: false }} />
				<Stack.Screen name="(Connexion)" options={{ headerShown: false }} />
			</Stack>
		</AuthProvider>
	);
}
