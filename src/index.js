//setiing stuff up straight copy and boiler dont really understand this place but i followed instructions
//this is basically setting up the network
import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory, applyRouterMiddleware } from "react-router";
import Routes from "./routes";
import Relay from "react-relay";
import useRelay from "react-router-relay";
import { RelayNetworkLayer, urlMiddleware } from "react-relay-network-layer";
import { relayApiUrl } from "./config/urls";
import auth from "./utils/auth";

const createHeaders = idToken => {
	if (idToken) {
		return {
			Authorization: "Bearer " + idToken //returns as an object
		};
	} else {
		return {};
	}
};

Relay.injectNetworkLayer(
	new RelayNetworkLayer(
		[
			urlMiddleware({
				url: req => relayApiUrl
			}),
			next => req => {
				let idToken = auth.getToken();
				let headers = createHeaders(idToken);
				req.headers = {
					...req.headers,
					...headers
				};
				return next(req);
			}
		],
		{ disableBatchQuery: true }
	)
);

ReactDOM.render(
	<Router
		environment={Relay.Store} //realy relies on state mangemnt tool called flux .. realy keeps track on all infor it needs
		render={applyRouterMiddleware(useRelay)}
		history={browserHistory}
		routes={Routes}
	/>,
	document.getElementById("root")
);
