import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const DefaultList = new Mongo.Collection("defaultList");

if (Meteor.isServer) {
	Meteor.publish("defaultList", function() {
		return DefaultList.find({ userId: this.userId });
	});
}

Meteor.methods({
	"defaultList.insert"(word, content) {
		check(word, String);
		check(content, Object);

		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		let definition = content.definition;

		let wordDoc = DefaultList.findOne({
			$and: [{userId: Meteor.userId()}, {word: word}, {definition: definition}]
		});


		// console.log("Meteor method ---- defaultList.insert" + wordDoc);

		if (wordDoc === undefined) {
			DefaultList.insert({
				userId: Meteor.userId(),
				word: word,
				definition: definition,
				content: content,
				searchTimes: 1
			});
		} else {
			DefaultList.update(
				{
					_id: wordDoc._id
				},
				{ $inc: { searchTimes: 1 } }
			);
		}
	},

	"defaultList.remove"(id) {
		check(id, String);

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		DefaultList.remove({ _id: id });
	}
});
