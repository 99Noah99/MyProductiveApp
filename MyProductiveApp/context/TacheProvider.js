export const TacheContext = createContext();
import React, { createContext, useState } from "react";

export const TacheProvider = ({ children }) => {
	const [ModalVisible, setModalVisible] = useState(false);

	return (
		<TacheContext.Provider
			value={{
				ModalVisible,
				setModalVisible,
			}}
		>
			{children}
		</TacheContext.Provider>
	);
};
