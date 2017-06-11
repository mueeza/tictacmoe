import React from "react"; //framework
import { Layer, Line } from "react-konva"; //board is made out of layers and lies

const Board = ({ unit, size, rows }) => {
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

export default Board;
