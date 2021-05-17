import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebase = Firebase.initializeApp({
	apiKey: "AIzaSyADGwFXIiisFvYYHq62yRpeDhAPWtLk8xA",
	authDomain: "jetflix-f83c1.firebaseapp.com",
	projectId: "jetflix-f83c1",
	storageBucket: "jetflix-f83c1.appspot.com",
	messagingSenderId: "897163360423",
	appId: "1:897163360423:web:d498e36dc8989c83270382",
});

export { firebase };
