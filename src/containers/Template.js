import React, { Component } from "react";
import Relay from "react-relay";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import NavDrawer from "../components/NavDrawer";
import SiteHeader from "../styled/SiteHeader";
import Main from "../styled/Main";
import "../utils/global.css";

injectTapEventPlugin();
//capital H lets it know its react js not html
class Template extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<NavDrawer
						auth={this.props.route.auth}
						authenticated={this.props.viewer.user}
					/>
					<SiteHeader />
					<Main>
						{this.props.children}
					</Main>
				</div>
			</MuiThemeProvider>
		);
	}
}

//if no one is signed in return will be null
//this gets the user thats currentky working
export default Relay.createContainer(Template, {
	fragments: {
		viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `
	}
});
