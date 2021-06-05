import { createContext, useContext, useEffect, useRef, useState } from "react";
import reactDOM from "react-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import YouTube from "react-youtube";
import {
	Background,
	Container,
	Logo,
	ButtonLink,
	Feature,
	Text,
	FeatureCallOut,
	Link,
	Group,
	Picture,
	Profile,
	Dropdown,
	Search,
	SearchIcon,
	SearchInput,
	PlayButton,
	Overlay,
	Inner,
} from "./styles/header";

const HeaderFeatureContext = createContext();

export default function Header({ bg = true, children, ...restProps }) {
	return bg ? <Background {...restProps}>{children}</Background> : children;
}

Header.Feature = function HeaderFeature({ children, ...restProps }) {
	const [showVideo, setShowVideo] = useState(false);

	return (
		<HeaderFeatureContext.Provider value={{ showVideo, setShowVideo }}>
			<Feature {...restProps}>{children}</Feature>
		</HeaderFeatureContext.Provider>
	);
};

Header.FeatureCallOut = function HeaderFeatureCallOut({ children, ...restProps }) {
	return <FeatureCallOut {...restProps}>{children}</FeatureCallOut>;
};

Header.Profile = function HeaderProfile({ children, ...restProps }) {
	return <Profile {...restProps}>{children}</Profile>;
};

Header.Picture = function HeaderPicture({ src, ...restProps }) {
	return <Picture {...restProps} src={`/images/users/${src}.png`} />;
};

Header.Search = function HeaderSearch({ searchTerm, setSearchTerm, ...restProps }) {
	const [searchActive, setSearchActive] = useState("");

	const inputRef = useRef();

	useEffect(() => {
		if (searchActive) inputRef.current.focus();
	}, [searchActive]);

	return (
		<Search {...restProps}>
			<SearchIcon onClick={() => setSearchActive(searchActive => !searchActive)}>
				<img src="/images/icons/search.png" alt="Search" />
			</SearchIcon>

			<SearchInput
				ref={inputRef}
				value={searchTerm}
				onChange={({ target }) => setSearchTerm(target.value)}
				placeholder="Search films and series"
				active={searchActive}
			/>
		</Search>
	);
};

Header.Dropdown = function HeaderDropdown({ children, ...restProps }) {
	return <Dropdown {...restProps}>{children}</Dropdown>;
};

Header.Text = function HeaderText({ children, ...restProps }) {
	return <Text {...restProps}>{children}</Text>;
};

Header.TextLink = function HeaderTextLink({ children, ...restProps }) {
	return <Link {...restProps}>{children}</Link>;
};

Header.PlayButton = function HeaderPlayButton({ children, ...restProps }) {
	const { setShowVideo } = useContext(HeaderFeatureContext);

	return (
		<PlayButton {...restProps} onClick={() => setShowVideo(true)}>
			{children}
		</PlayButton>
	);
};

Header.Video = function HeaderVideo({ videoId, ...restProps }) {
	const { showVideo, setShowVideo } = useContext(HeaderFeatureContext);
	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	return showVideo
		? reactDOM.createPortal(
				<Overlay onClick={() => setShowVideo(false)}>
					<Inner>
						<YouTube {...restProps} videoId={videoId} opts={opts} />
					</Inner>
				</Overlay>,
				document.body
		  )
		: null;
};

Header.Frame = function HeaderFrame({ children, ...restProps }) {
	return <Container {...restProps}>{children}</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
	return <Group {...restProps}>{children}</Group>;
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
	return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
	return (
		<ReactRouterLink to={to}>
			<Logo {...restProps} />
		</ReactRouterLink>
	);
};
