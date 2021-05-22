import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { SelectProfileContainer } from "./profile";
import { Header, Loading } from "../components/";
import { ReleaseBody } from "../components/loading/styles/loading";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";

export function BrowseContainer({ slides }) {
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);
	const { firebase } = useContext(FirebaseContext);
	const user = firebase.auth().currentUser || {};

	useEffect(() => {
		// console.log(profile, "profile");
		setTimeout(() => setLoading(false), 3000);
		//eslint-disable-next-line
	}, [profile.displayName]);

	//make it if-else
	return profile.displayName ? (
		<>
			{loading ? <Loading src={user.photoURL} /> : <ReleaseBody />}
			<Header src="joker1" dontShowOnSmallViewPort>
				<Header.Frame>
					<Header.Group>
						<Header.Logo to={ROUTES.HOME} src={logo} alt="Jetflix" />
						<Header.TextLink>Series</Header.TextLink>
						<Header.TextLink>Films</Header.TextLink>
					</Header.Group>
					<Header.Group>
						<Header.Profile>
							<Header.Picture src={user.photoURL} />
							<Header.Dropdown>
								<Header.Group>
									<Header.Picture src={user.photoURL} />
									<Header.TextLink>{user.displayName}</Header.TextLink>
								</Header.Group>
							</Header.Dropdown>
						</Header.Profile>
					</Header.Group>
				</Header.Frame>
				<Header.Feature>
					<Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
					<Header.Text>
						Firebase is an incredible platform, some of their recent additions like Cloud Functions for static hosting are pretty amazing. However, I’d like to
						share a serious blindspot that I came across while preparing for a product launch. The intent of this post is in no way to discourage anyone from
						using Firebase. I love Firebase and I recommend you give it a go! This is just an important learning that I wanted to share — hopefully it can
						prevent you from getting stuck in the same position as me.
					</Header.Text>
				</Header.Feature>
			</Header>
		</>
	) : (
		<SelectProfileContainer user={user} setProfile={setProfile} />
	);
}
