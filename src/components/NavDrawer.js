import React, { Component } from "react"; //framework
import Drawer from "material-ui/Drawer"; // rest is importing libraries and dependencies u can use
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";

import { Link } from "react-router";
import { NavToggleButton } from "../styled/NavDrawer"; //this will go in the style
// create a nav Drawer
// imported from material-ui
class NavDrawer extends Component {
	state = {
		open: false,
		width: 250
	};

	toggle = () => {
		this.setState((prevState, props) => {
			return {
				open: !prevState.open
			};
		});
	};

	render() {
		return (
			<div>
				<NavToggleButton
					toggle={this.toggle}
					width={this.state.width}
					open={this.state.open}
				/>
				<Drawer open={this.state.open}>
					<div
						style={{
							height: "200px",
							width: "100%",
							backgroundColor: "salmon"
						}}
					>
						LoginContainer
					</div>
					<Divider />
					<Link to={"/"}>
						<MenuItem onTouchTap={this.toggle} primaryText={"Play"} />
					</Link>
					<Link to={"/profile"}>
						<MenuItem onTouchTap={this.toggle} primaryText={"Profile"} />
					</Link>
				</Drawer>
			</div>
		);
	}
}

export default NavDrawer;
