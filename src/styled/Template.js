import React from "react";
import styled from "styled-components";
import { media } from "../utils/media";

export const Header = styled.header`
	text-align: center;
	font-size: 2em;
	font-family: 'Roboto', sans-serif; // getting nice font
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto; //centers automatically the container
	width: 80%; //this will make it compatible with mobile divices
	min-height: 80vh; // vh stands for viewer height which obv depend on the screen
	${media.handheld`
		width: 100%;
	`}
`;

export const Main = props => {
	return (
		<Container>
			{props.children}
		</Container>
	);
};
