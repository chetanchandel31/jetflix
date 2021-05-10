import { Container, Pane, Title, SubTitle, Image, Inner, Item } from "./styles/jumbotron";

export default function Jumbotron({ children, direction = "row", ...restProps }) {
	return (
		<Item direction={direction}>
			<Inner>{children}</Inner>
		</Item>
	);
}

Jumbotron.Container = function JumbotronContainer({ children, ...restProps }) {
	//just render children and pass props to container (which is just a styled div)
	return <Container {...restProps}>{children}</Container>;
};

Jumbotron.Pane = function JumbotronPane({ children, ...restProps }) {
	return <Pane {...restProps}>{children}</Pane>;
};

Jumbotron.Title = function JumbotronTitle({ children, ...restProps }) {
	return <Title {...restProps}>{children}</Title>;
};

Jumbotron.SubTitle = function JumbotronSubTitle({ children, ...restProps }) {
	return <SubTitle {...restProps}>{children}</SubTitle>;
};

Jumbotron.Image = function JumbotronImage({ ...restProps }) {
	return <Image {...restProps} />;
};
