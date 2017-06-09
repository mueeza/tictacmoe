import React from "react";
import styled from "styled-components";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Menu from "material-ui/svg-icons/navigation/menu";

const StayVisible = styled.div`// addind it to the toggle
	position: absolute;
	margin-left: ${props => (props.open ? `${props.width}px` : "none")}; // setting width if drawer is open
	transition: margin .2s;
`;

export const NavToggleButton = props => {
	// make syre toggel as acces to props
	return (
		<StayVisible {...props}>
			<FloatingActionButton onTouchTap={props.toggle}>
				<Menu />
			</FloatingActionButton>
		</StayVisible>
	);
};
