import React, { Component } from "react";
import Relay from "react-relay";
import {
	Container,
	Name,
	GameListHeader,
	GameList,
	GameRecord,
	Column,
	ColumnLabels
} from "../styled/ProfileStyled";

class Profile extends Component {
	//fetch data
	get records() {
		//i need it to return an array of my records
		//if tru = win and if not u dont
		//my four columns = column stuff
		//robot is //dummy info
		return this.props.viewer.user.p1games.edges.map((edge, index) => {
			let { node: game } = edge;
			return (
				<GameRecord key={game.id} index={index}>
					<Column>
						{game.winner ? "Won!" : "Didn't win"}
					</Column>
					<Column>
						{game.player1Guess}
					</Column>
					<Column>
						{game.player1GuessCorrect ? "Yes" : "No"}
					</Column>
					<Column>
						{new Date(game.createdAt).toLocaleDateString()}
					</Column>
				</GameRecord>
			);
		});
	}

	render() {
		//start using style componenets
		let { email } = this.props.viewer.user; //declare where u getting that email.. email is property of user
		return (
			<Container>
				<Name>
					{email}
				</Name>
				<GameList>
					<GameListHeader>
						My Games
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

//if no one is signed in return will be null
//this gets the user thats currentky working
export default Relay.createContainer(Profile, {
	fragments: {
		viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
            email
            p1games (first: 10) {
              edges {
                node {
                  id
                  createdAt
                  winner {
                    id
                  }
                  p1Guess
                  p1GuessCorrect
                }
              }
            }
          }
        }
      `
	}
});
