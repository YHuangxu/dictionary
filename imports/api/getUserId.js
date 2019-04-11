import { Meteor } from "meteor/meteor";
export const Users = Meteor.users;

Meteor.methods({
	"getUserId"(game) {
		// Make sure the user is logged in before inserting a task
		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		if (game !== undefined) {
			console.log(game);

			let user1Obj = Users.find({ _id: game.player1 }).fetch(); // user object
			let user2Obj = Users.find({ _id: game.player2 }).fetch();

			console.log(user1Obj, user2Obj);
			return {
				user1: user1Obj,
				user2: user2Obj
			};
		} else {
			return {
				user1: "null",
				user2: "null"
			};
		}
	}
});
