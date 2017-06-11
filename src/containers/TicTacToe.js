import React, { Component } from "react";
import Relay from "react-relay";
import { Stage } from "react-konva";
import Board from "../styled/Board";
import Squares from "../styled/Squares";
import TuringTest from "../styled/TuringTest";
import CreateGame from "../mutations/CreateGame";

class TicTacToe extends Component {
	//we need to check if someone won so come up with all the combos and check .. u need hard code this lol
	constructor(props) {
		super(props);
		this.combos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
	}
	//how many rows and colums
	state = {
		rows: 3,
		gameState: new Array(9).fill(false),
		ownMark: "X",
		otherMark: "O",
		gameOver: false,
		yourTurn: true,
		winner: false,
		win: false
	};
	//setting the board up for the tictac toe
	componentWillMount() {
		let height = window.innerHeight; //accesing the browser windows capabilities.. size of the perspnn browser vertically
		let width = window.innerWidth;
		let size = height < width ? height * 0.8 : width * 0.8; //make sure the board fits on teh screen teh question sign means set size and the : means or
		let rows = this.state.rows;
		let unit = size / rows; //size of the squares

		let coordinates = [];
		//this loops will leave us with 9 sets of cooridnated
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < rows; x++) {
				coordinates.push([x * unit, y * unit]);
			}
		}
		//when the components mount this aS variables
		this.setState({
			size,
			rows,
			unit,
			coordinates
		});
	}

	move = (moveIndex, mark) => {
		this.setState((prevState, props) => {
			//this.setstate holds all the info on our game
			let { gameState, yourTurn, gameOver, winner } = prevState;
			yourTurn = !yourTurn;
			gameState.splice(moveIndex, 1, mark); //splice method looks at index that we passthrough at top finds a element/array  and look to what need to be replaced
			let foundWin = this.winChecker(gameState); //check if theres been a winner links back to the winChecker thing we made before
			if (foundWin) {
				winner = gameState[foundWin[0]]; //if a win was found is the player whos mark found in that array
			}
			if (foundWin || !gameState.includes(false)) {
				gameOver = true; //if win found or or did not find blank squares game over
			}
			if (!yourTurn && !gameOver) {
				//if not ur turn and game notover
				this.makeAiMove(gameState); //make a move AI.. takes game state as an argument
			}
			return {
				//returns the new state
				gameState,
				yourTurn,
				gameOver,
				win: foundWin || false, //if win found should be set to that but if not its still false
				winner
			};
		});
	};

	//checks if someone has won or not
	winChecker = gameState => {
		let combos = this.combos; // makes it shorter to refer to combos
		return combos.find(combo => {
			//looks at he combos array and if my specification are met  then it will return the array element that met the specification (looks at big combo) return a single element from combo
			let [a, b, c] = combo;
			return (
				gameState[a] === gameState[b] &&
				gameState[a] === gameState[c] &&
				gameState[a]
			); //basically if abc are the same thing and none are false you got a win
		});
	};

	//not a really smart ai that competes cause thats a lot of work lol
	//this will just take an open square and move there at random
	makeAiMove = gameState => {
		//needs access to gamestate so it can make a sensible move
		let otherMark = this.state.otherMark; //rememebr we set other mark as o at the top
		let openSquares = []; //variable
		gameState.forEach((square, index) => {
			//foreach is a method that is available on arrays that calls a given function on each element in the array
			//^for each square in the game state and its index run the funtion below
			if (!square) {
				//for any square that is not chosen / empty .. or if  no ones moved into that square
				openSquares.push(index); //add the index of that opensquare into the empty array we made above
			}
		});
		let aiMove = openSquares[this.random(0, openSquares.length)]; //takes the open squares and picks a random one from that array of possible moves the 0.. means go from o to all the options available
		setTimeout(() => {
			//makes it wait a little bit so seems a la naturel
			this.move(aiMove, otherMark); //choose a square at random and place the Ai othermark indicator
		}, 1000); //wait one sec aka 1000 mili second
	};

	//random function found online that generates a random number better for xoxo game use
	//it ask for min value and a max value
	random = (min, max) => {
		min = Math.ceil(min); //ceil make sure its a round number
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};

	//if game over go index at the turingtest.js in styled
	makeTuringTest = () => {
		if (this.state.gameOver) {
			return <TuringTest recordGame={this.recordGame} />;
		}
	};

	recordGame = p1guess => {
		let { self, relay } = this.props;
		let { winner, ownMark } = this.state;
		if (self) {
			let winnerId = winner === ownMark ? self.id : undefined;
			let p1guessCorrect = "ROBOT" ? true : false;
			relay.commitUpdate(
				new CreateGame({
					self,
					winnerId,
					p1guess,
					p1guessCorrect
				})
			);
		}
		this.setState({
			gameState: new Array(9).fill(false),
			gameOver: false,
			yourTurn: true,
			winner: false,
			win: false
		});
	};

	render() {
		let {
			size,
			unit,
			rows,
			coordinates,
			gameState,
			win,
			gameOver,
			yourTurn,
			ownMark
		} = this.state; //the win lets u know where it toook place ad game over is a boolean
		return (
			<div>
				<Stage height={size} width={size}>
					<Board unit={unit} size={size} rows={rows} />
					<Squares
						unit={unit}
						coordinates={coordinates}
						gameState={gameState}
						win={win}
						gameOver={gameOver}
						yourTurn={yourTurn}
						ownMark={ownMark}
						move={this.move}
					/>
				</Stage>
				{this.makeTuringTest()}
			</div>
		);
	}
}

//if no one is signed in return will be null
//this gets the user thats currentky working

export default Relay.createContainer(TicTacToe, {
	fragments: {
		self: () => Relay.QL`
        fragment on User {
          id
        }
      `
	}
});
