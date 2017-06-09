import React from "react"; //framework
import { Layer, Line, Text } from "react-konva"; //board is made out of layers and lies

export const Board = ({ unit, size, rows }) => {
	let grid = [];
	let stroke = "grey"; //this will be grey lines
	let strokeWidth = 10;
	//this for loop will calculate the position .. position of lines so i dont have to
	//i is the Index
	//this wil run so first itll make a vertical line and then a horizontal line once itruns twice we'll get our goal of four lines

	for (let i = 1; i < rows; i++) {
		let position = unit * i;
		//this will create the first horizontal line
		grid.push(
			<Line
				points={[position, 0, position, size]} //the x and y starts in th ccorner then moves right
				stroke={stroke}
				strokeWidth={strokeWidth}
				key={i + "v"}
			/>
		);
		grid.push(
			<Line
				points={[0, position, size, position]} //switch the the 0
				stroke={stroke}
				strokeWidth={strokeWidth}
				key={i + "h"}
			/>
		);
	}
	//*all they stuf was pushed to the arrat and now we will print the result
	return (
		<Layer>
			{grid}
		</Layer>
	);
};

export const Squares = ({
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
