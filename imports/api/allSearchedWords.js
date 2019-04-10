import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const allSearchedWords = new Mongo.Collection("allSearchedWords");

if (Meteor.isServer) {
	Meteor.publish("allSearchedWords", function() {
		return allSearchedWords.find();
	});
}

Meteor.methods({
	"allSearchedWords.insert"(word, content) {
		check(word, String);
		check(content, Object);

		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		let definition = content.definition;
		let wordDoc = allSearchedWords.findOne({
			$and: [
				{ word: word },
				{ definition: definition }
			]
		});

		if (wordDoc === undefined) {
			allSearchedWords.insert({
				word: word,
				definition: definition,
				content: content,
				searchTimes: 1
			});
		} else {
			allSearchedWords.update(
				{
					_id: wordDoc._id
				},
				{ $inc: { searchTimes: 1 } }
			);
		}
	}
});
