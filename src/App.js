import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Browse, Home, Signin, Signup } from "./pages";

function App() {
	return (
		<Router>
			<Route exact path={ROUTES.BROWSE}>
				<Browse />
			</Route>
			<Route exact path={ROUTES.SIGN_IN}>
				<Signin />
			</Route>
			<Route exact path={ROUTES.SIGN_UP}>
				<Signup />
			</Route>
			<Route exact path={ROUTES.HOME}>
				<Home />
			</Route>
		</Router>
	);
}

export default App;
