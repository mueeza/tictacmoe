import Relay from "react-relay";

export default class CreateGame extends Relay.Mutation {
	getMutation() {
		return Relay.QL`mutation{createGame}`;
	}

	getFatQuery() {
		return Relay.QL`
      fragment on CreateGamePayload {
        p1player
      }
    `;
	}
	getConfigs() {
		return [
			{
				type: "RANGE_ADD",
				parentName: "p1player",
				parentID: this.props.self.id,
				connectionName: "moves",
				edgeName: "edge",
				rangeBehaviors: {
					"": "append"
				}
			}
		];
	}

	getVariables() {
		return {
			plplayerId: this.props.self.id,
			winnerId: this.props.winner,
			p1Geuss: this.props.guess,
			p1GuessCorrect: this.props.guessCorrect
		};
	}
}
