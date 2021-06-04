import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase";
import { SelectProfileContainer } from "./profile";
import { Card, Header, Loading, Player } from "../components/";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { FooterContainer } from "./footer";
import Fuse from "fuse.js";

export function BrowseContainer({ slides }) {
	const [category, setCategory] = useState("films");
	const [searchTerm, setSearchTerm] = useState("");
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);
	const [slideRows, setSlideRows] = useState([]);

	const { firebase } = useContext(FirebaseContext);
	const user = firebase.auth().currentUser || {};

	useEffect(() => {
		// console.log(profile, "profile");
		setTimeout(() => setLoading(false), 3000);
		//eslint-disable-next-line
	}, [profile.displayName]);

	useEffect(() => {
		setSlideRows(slides[category]);
	}, [slides, category]);

	useEffect(() => {
		const fuse = new Fuse(slides[category], { keys: ["data.title"] });
		const result = fuse.search(searchTerm).map(({ item }) => item);

		if (result.length > 0 && searchTerm.length > 2) setSlideRows(result);
		if (searchTerm.length === 0) setSlideRows(slides[category]);
		// eslint-disable-next-line
	}, [searchTerm]);

	if (profile.displayName) {
		return (
			<>
				{loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
				<Header src="joker1" dontShowOnSmallViewPort>
					<Header.Frame>
						<Header.Group>
							<Header.Logo to={ROUTES.HOME} src={logo} alt="Jetflix" />
							<Header.TextLink active={category === "films" ? "true" : "false"} onClick={() => setCategory("films")}>
								Films
							</Header.TextLink>
							<Header.TextLink active={category === "series" ? "true" : "false"} onClick={() => setCategory("series")}>
								Series
							</Header.TextLink>
						</Header.Group>
						<Header.Group>
							<Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
							<Header.Profile>
								<Header.Picture src={user.photoURL} />
								<Header.Dropdown>
									<Header.Group>
										<Header.Picture src={user.photoURL} />
										<Header.TextLink>{user.displayName}</Header.TextLink>
									</Header.Group>
									<Header.Group>
										<Header.TextLink onClick={() => firebase.auth().signOut()}>Sign out</Header.TextLink>
									</Header.Group>
								</Header.Dropdown>
							</Header.Profile>
						</Header.Group>
					</Header.Frame>
					<Header.Feature>
						<Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
						<Header.Text>
							Firebase is an incredible platform, some of their recent additions like Cloud Functions for static hosting are pretty amazing. However, I’d like
							to share a serious blindspot that I came across while preparing for a product launch. The intent of this post is in no way to discourage anyone
							from using Firebase. I love Firebase and I recommend you give it a go! This is just an important learning that I wanted to share — hopefully it
							can prevent you from getting stuck in the same position as me.
						</Header.Text>
						<Header.PlayButton>Play</Header.PlayButton>
					</Header.Feature>
				</Header>

				<Card.Group>
					{slideRows.map(slideItem => (
						<Card key={`${category}-${slideItem.title.toLowerCase()}`}>
							<Card.Title>{slideItem.title /*crime, children etc */}</Card.Title>

							<Card.Entities>
								{slideItem.data.map(item => (
									<Card.Item key={item.docId} item={item}>
										<Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />

										<Card.Meta>
											<Card.SubTitle>{item.title}</Card.SubTitle>
											<Card.Text>{item.description}</Card.Text>
										</Card.Meta>
									</Card.Item>
								))}
							</Card.Entities>

							<Card.Feature category={category}>
								<Player>
									<Player.Button />
									<Player.Video src="/videos/bunny.mp4" />
								</Player>
							</Card.Feature>
						</Card>
					))}
				</Card.Group>

				<FooterContainer />
			</>
		);
	} else {
		return <SelectProfileContainer user={user} setProfile={setProfile} />;
	}
}
