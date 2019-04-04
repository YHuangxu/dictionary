import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const DefaultList = new Mongo.Collections("defaultList");

if (Meteor.isServer) {
	Meteor.publish("defaultList", function() {
		return DefaultList.find({userId: this.userId});
	});
}

Meteor.methods({
	"defaultList.insert"(word) {
		check(word, String);

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		
		DefaultList.insert({
			userId: this.userId,
			content: {
				word: word,
				definition: word,
				example: word
			}
		});
	},

	"defaultList.remove"(id) {
		check(id, String);

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		DefaultList.remove({
			_id: id
		});
	}
});

