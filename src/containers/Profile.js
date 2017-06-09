import React, { Component } from "react";
//import the style stuff we took at stlyed profile
//this is the place we store the record of games
import {
	Container,
	Name,
	GameListHeader,
	GameList,
	GameRecord,
	Column,
	ColumnLabels
} from "../styled/Profile";

class Profile extends Component {
	//fake/dummy info until we start doing database stuff
	static defaultProps = {
		user: {
			email: "USER_EMAIL",
			games: [
				//an array that holds all the recent game infromation
				{
					winner: true,
					createdAt: "12/25/2017",
					id: "0001"
				},
				{
					winner: true,
					createdAt: "12/29/2017", //BOI ITS YAH BURDAY.. YEAH SHAWTY ITS YA BUTHDAY.. Kill me why isnt it working
					id: "0002" //fake id
				},
				{
					winner: true,
					createdAt: "12/27/2016",
					id: "0003"
				}
			]
		}
	};

	//fetch data
	get records() {
		//i need it to return an array of my records
		//if tru = win and if not u dont
		//my four columns = column stuff
		//robot is //dummy info
		return this.props.user.games.map((game, index) => {
			return (
				<GameRecord key={index} index={index}>

					<Column>
						{game.winner ? "Won!" : "Didn't win"}
						{" "}

						{" "}
					</Column>
					<Column>
						"ROBOT"{" "}
					</Column>
					<Column>
						"No"
					</Column>
					<Column>
						{game.createdAt}
					</Column>
				</GameRecord>
			);
		});
	}

	render() {
		//stary using style componenets
		let { email } = this.props.user; //declare where u getting that email.. email is property of user
		return (
			<Container>
				<Name>
					{email}
				</Name>
				<GameList>
					<GameListHeader>
						MyGames
					</GameListHeader>
					<ColumnLabels>
						<Column>
							Outcome
						</Column>
						<Column>
							Guess
						</Column>
						<Column>
							Guessed Correctly
						</Column>
						<Column>
							Date
						</Column>
					</ColumnLabels>
					{this.records}
				</GameList>
			</Container>
		);
	}
}

//the geuss refers to teh geuss about who u were competing against

export default Profile;
