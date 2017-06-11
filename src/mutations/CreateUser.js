import Relay from "react-relay";

//creates a new class that is an extention of the relay mutations
export default class CreateUserMutation extends Relay.Mutation {
	//just setting what mutation we want to access
	getMutation() {
		return Relay.QL`mutation{createUser}`;
	}

	//basic variables
	getVariables() {
		return {
			email: this.props.email,
			authProvider: {
				auth0: {
					idToken: this.props.idToken
				}
			}
		};
	}

	// tells mutation what to get back to us
	getFatQuery() {
		return Relay.QL`
      fragment on CreateUserPayload {
        user {
          id
        }
        viewer {
          id
        }
      }
    `;
	}

	// specifies what we are going to do ater getting the info from fat
	//tells local store how to handle it
	// we wanna use it in 2 diffrent ways: add it to an existing range //we didnt so the second type
	getConfigs() {
		return [
			{
				type: "RANGE_ADD",
				parentName: "viewer",
				connectionName: "allUsers",
				edgeName: "user",
				rangeBehaviors: {
					"": "append"
				}
			}
		];
	}
}
