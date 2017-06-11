import React from "react";
import Relay from "react-relay"; //will have access to a prop we call ciewer queries
import { Route, IndexRoute } from "react-router";
import Template from "../containers/Template";
import Home from "../containers/Home";
import Profile from "../containers/Profile";
import auth from "../utils/auth";

const ViewerQueries = {
	viewer: () => Relay.QL`query { viewer }`
}; //each object has access to ViewerQueries

const userOnly = (nextState, replace) => {
	if (!auth.getToken()) {
		replace("/");
	}
};

//make sure each of the routes has access to an object called viewer and that viewer will correspond to the query

const createRoutes = () => {
	return (
		<Route path="/" component={Template} auth={auth} queries={ViewerQueries}>
			<IndexRoute component={Home} queries={ViewerQueries} />
			<Route
				path="/profile"
				component={Profile}
				queries={ViewerQueries}
				onEnter={userOnly}
			/>
		</Route>
	);
};

const Routes = createRoutes();

export default Routes;
