import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { SelectProfileContainer } from "./profile";
import { Loading } from "../components/";

export function BrowseContainer({ slides }) {
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);
	const { firebase } = useContext(FirebaseContext);
	const user = firebase.auth().currentUser || {};

	useEffect(() => {
		console.log(profile, "profile");
		setTimeout(() => setLoading(false), 3000);
		//eslint-disable-next-line
	}, [profile.displayName]);

	// prettier-ignore
	//make it if/else
	return profile.displayName ? (loading ? <Loading src={user.photoURL} /> : null) : <SelectProfileContainer user={user} setProfile={setProfile} />;
}
