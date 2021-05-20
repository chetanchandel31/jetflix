import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";

// populate/clear user's details from local storage upon login/logout
export default function useAuthListener() {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.auth().onAuthStateChanged(authUser => {
			if (authUser) {
				localStorage.setItem("authUser", JSON.stringify(authUser));
				setUser(authUser);
			} else {
				localStorage.removeItem("authUser");
				setUser(null);
			}
		});

		return () => listener();
		// eslint-disable-next-line
	}, []);

	return { user };
}
