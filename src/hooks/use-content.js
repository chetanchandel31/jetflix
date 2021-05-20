import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";

export default function useContent(target) {
	const [content, setContent] = useState([]);
	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		const collectionRef = firebase.firestore().collection(target);
		collectionRef
			.get()
			.then(snapshot => {
				const allContent = snapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id }));
				setContent(allContent);
			})
			.catch(err => {
				console.log(err.message);
			});
		// eslint-disable-next-line
	}, []);

	return { [target]: content };
}
