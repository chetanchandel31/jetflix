import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import { FooterContainer } from "../containers/footer";
import { HeaderContainer } from "../containers/header";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Signin() {
	const { firebase } = useContext(FirebaseContext);
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	const handleSignIn = e => {
		e.preventDefault();

		firebase
			.auth()
			.signInWithEmailAndPassword(emailAddress, password)
			.then(() => {
				history.push(ROUTES.BROWSE);
			})
			.catch(error => {
				setEmailAddress("");
				setPassword("");
				setError(error.message);
			});
	};

	const isInvalid = password === "" || emailAddress === "";

	return (
		<>
			<HeaderContainer hideSignInBtn>
				<Form>
					<Form.Title>Sign In</Form.Title>
					{error && <Form.Error>{error}</Form.Error>}

					<Form.Base onSubmit={handleSignIn} method="POST">
						<Form.Input placeholder="Email address" value={emailAddress} onChange={({ target }) => setEmailAddress(target.value)} />
						<Form.Input type="password" autoComplete="off" placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
						<Form.Submit disabled={isInvalid} type="submit">
							Sign In
						</Form.Submit>
					</Form.Base>

					<Form.Text>
						New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
					</Form.Text>
					<Form.Text>
						Dummy crdentials
						<div>
							email: test@test.test <br />
							password: testtest
						</div>
					</Form.Text>
					<Form.TextSmall>This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.</Form.TextSmall>
				</Form>
			</HeaderContainer>
			<FooterContainer />
		</>
	);
}
