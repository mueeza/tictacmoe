import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import RaisedButton from "material-ui/RaisedButton";

injectTapEventPlugin();
class Template extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<header>
						<h1>TicTacMoe</h1>
						<RaisedButton
							label={"Test Button"} // text that appears in button
							primary={true}
							onTouchTap={() => {
								console.log("Hello i Work");
							}}
						/>
					</header>
					<main>
						{this.props.children}
					</main>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Template;
