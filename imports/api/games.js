import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { reviewLogic } from "./reviewLogic.js";


export const Games = new Mongo.Collection("games");

if (Meteor.isServer) {
	Meteor.publish("games", function() {
		return Games.find();
	});
}

Meteor.methods({
	"game.play"() {
		// remove all played game with this user
		let endGame = Games.findOne({
			gameStatus: "gameover",
			$or: [{ player1: Meteor.userId() }, { player2: Meteor.userId() }]
		});
		if (endGame !== undefined) {
			reviewLogic.removeGame(endGame._id);
		}

		// find a waiting game
		// If there is no waiting game, start a new game, otherwise join this game
		const game = Games.findOne({ gameStatus: "waiting" });

		if (game === undefined) {
			console.log("Starting a new Game");

			reviewLogic.newGame();
		} else if (
			game !== undefined &&
			game.player1 !== this.userId &&
			game.player2 === "") 
		{
			console.log("Join the existing game");
			reviewLogic.joinGame(game);
		}
	}
});
