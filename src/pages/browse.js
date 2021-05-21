import { BrowseContainer } from "../containers/browse";
import { useContent } from "../hooks";
import selectionFilter from "../utils/selection-filter";

export default function Browse() {
	//get series and films
	const { series } = useContent("series");
	const { films } = useContent("films");
	//have slides
	const slides = selectionFilter({ series, films });
	console.log(slides);
	//pass it to browse container

	return <BrowseContainer slides={slides} />;
}
