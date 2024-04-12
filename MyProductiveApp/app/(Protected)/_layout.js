import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
	return (
		<Stack>
			<Stack.Screen name="(TabView)" options={{ headerShown: false }} />
			<Stack.Screen name="TacheFromGroup" />
		</Stack>
	);
}
