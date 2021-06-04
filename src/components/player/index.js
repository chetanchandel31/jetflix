import { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Container, Button, Overlay, Inner } from "./styles/player";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { FeatureContext } from "../card";

export const PlayerContext = createContext();

export default function Player({ children, ...restProps }) {
	const [showPlayer, setShowPlayer] = useState(false);

	return (
		<PlayerContext.Provider value={{ showPlayer, setShowPlayer }}>
			<Container {...restProps}>{children}</Container>
		</PlayerContext.Provider>
	);
}

Player.Video = function PlayerVideo({ src, ...restProps }) {
	const [videoId, setVideoId] = useState("ByXuk9QqQkk");
	const { showPlayer, setShowPlayer } = useContext(PlayerContext);
	const { itemFeature } = useContext(FeatureContext);
	const movieName = itemFeature.title;

	useEffect(() => {
		movieTrailer(movieName)
			.then(res => {
				const searchParams = new URL(res).searchParams;
				const videoID = searchParams.get("v");
				if (videoID) setVideoId(videoID);
			})
			.catch(() => {
				console.log("couldn't find trailer, playing default video");
				setVideoId("ByXuk9QqQkk");
			});
	}, [movieName]);

	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	return showPlayer
		? ReactDOM.createPortal(
				<Overlay onClick={() => setShowPlayer(false)} {...restProps}>
					<Inner>
						{/* <video id="netflix-player" controls>
							<source src={src} type="video/mp4" />
						</video> */}

						<YouTube videoId={videoId} opts={opts} />
						{/* <Close /> */}
					</Inner>
				</Overlay>,
				document.body
		  )
		: null;
};

Player.Button = function PlayerButton({ ...restProps }) {
	const { setShowPlayer } = useContext(PlayerContext);

	return (
		<Button {...restProps} onClick={() => setShowPlayer(showPlayer => !showPlayer)}>
			Play
		</Button>
	);
};
