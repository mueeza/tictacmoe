import React from "react";
import { Route, IndexRoute } from "react-router";
import Template from "../containers/Template";
import TicTacMoe from "../containers/TicTacMoe";
import Profile from "../containers/Profile";
// import Relay from "react-relay";

// const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` };
//object
//make sure each of the routes has access to an object called viewer and that viewer will correspond to the query

const createRoutes = () => {
	return (
		<Route path="/" component={Template}>
			<IndexRoute component={TicTacMoe} />
			<Route path={"/profile"} component={Profile} />
		</Route>
	);
};

const Routes = createRoutes();

export default Routes;
