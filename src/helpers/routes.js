import { Redirect, Route } from "react-router";

//render handler args?
//check if user exists, redirect him if tries to access a route he shouldn't
export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
	return <Route {...rest}>{!user ? children : user ? <Redirect to={{ pathname: loggedInPath }} /> : null}</Route>;
}

export function ProtectedRoute({ user, children, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				console.log(user);
				if (user) return children;

				if (!user) return <Redirect to={{ pathname: "signin", state: { from: location } }} />; //docs for state's explanation

				return null;
			}}
		/>
	);
}
