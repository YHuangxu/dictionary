import { Meteor } from "meteor/meteor";
import { Games } from "./games.js";

class gameLogic {
	// remove a specified game form Games
	removeGame(gameId) {
		Games.remove({ _id: gameId });
	}

	// start a new game 
	newGame() {
		const game = Games.findOne({
			$or: [{ player1: Meteor.userId() }, { player2: Meteor.userId() }]
		});

		if (game === undefined) {
			Games.insert({
				player1: Meteor.userId(),
				player2: "",
				gameStatus: "waiting",
				gameWinner: ""
			});
		}
	}

	// join a existing game
	joinGame(game) {
		if (game.player2 === "" && Meteor.userId() !== undefined) {
			Games.update(
				{ _id: game._id },
				{
					$set: {
						player2: Meteor.userId(),
						gameStatus: "playing"
					}
				}
			);
		}
	}

}

export const reviewLogic = new gameLogic();
