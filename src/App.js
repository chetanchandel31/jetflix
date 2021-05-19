import * as ROUTES from "./constants/routes";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Browse, Home, Signin, Signup } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";

function App() {
	let user = "";

	return (
		<Router>
			<Switch>
				<IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.SIGN_IN} exact>
					<Signin />
				</IsUserRedirect>
				<IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.SIGN_IN} exact>
					<Signup />
				</IsUserRedirect>
				<ProtectedRoute user={user} path={ROUTES.BROWSE} exact>
					<Browse />
				</ProtectedRoute>
				<IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path={ROUTES.HOME} exact>
					<Home />
				</IsUserRedirect>
			</Switch>
		</Router>
	);
}

export default App;
