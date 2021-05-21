import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { SelectProfileContainer } from "./profile";

export function BrowseContainer({ slides }) {
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);
	const { firebase } = useContext(FirebaseContext);
	const user = firebase.auth().currentUser || {};

	useEffect(() => {
		console.log(profile, "profile");
		setTimeout(() => setLoading(false), 3000);
	}, [profile.displayName]);

	return <SelectProfileContainer user={user} setProfile={setProfile} />;
}
