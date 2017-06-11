import React from "react";
import { Layer, Text } from "react-konva";

const Squares = ({
	unit,
	coordinates,
	gameState,
	win,
	gameOver,
	yourTurn,
	ownMark,
	move
	//all of the games information will be stores in array called game state
	//look at current coordinates the gives a new array based on the parameters we give
}) => {
	let squares = coordinates.map((position, index) => {
		let makeMove = move;
		let mark = gameState[index];
		let fill = "black";
		if (win && win.includes(index)) {
			fill = "lightgreen"; // if some one wins change colors thing (any of the squares part of the win index will change green)
		}
		//need to make sure user cant move unless its there turn//if game over or not yourTurn or square is already marked shouldnt be able to move their
		if (gameOver || !yourTurn || mark) {
			makeMove = () => console.log("nope!");
		}
		return (
			<Text
				key={index}
				index={index}
				x={position[0]}
				y={position[1]}
				fontSize={unit}
				width={unit}
				text={mark}
				fill={fill}
				fontFamily={"Helvetica"}
				align={"center"} //this means when u click on any on of the squares i should expect to see a console log that tells me that the index of the square that was clicked on and mark
				onClick={event => {
					let index = event.target.index;
					makeMove(index, ownMark);
				}}
			/>
		);
	});
	return (
		<Layer>
			{squares}
		</Layer>
	);
};

export default Squares;
