import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import NavDrawer from "../components/NavDrawer";
import { Header, Main } from "../styled/Template";

injectTapEventPlugin();
//capital H lets it know its react js not html
class Template extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<NavDrawer />
					<Header>
						TicTacMoe
					</Header>
					<Main>
						{this.props.children}
					</Main>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Template;
