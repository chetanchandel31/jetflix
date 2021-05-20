import { useContent } from "../hooks";

export default function Browse() {
	//get series and films
	//have slides
	//pass it to browse container
	const { series } = useContent("series");
	const { films } = useContent("films");
	console.log(series);
	console.log(films);

	return <div>hello from browse</div>;
}
