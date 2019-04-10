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

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		let definitionToCompare = content.definition;
		console.log(definitionToCompare);

		let hasData = DefaultList.find({ "content.definition": definitionToCompare}).fetch().length;
		console.log("hasData: " + hasData);
		console.log(DefaultList.find({ "content.definition": definitionToCompare}).fetch());

		if (hasData === 0) {
			DefaultList.insert({
				userId: this.userId,
				word: word,
				content: content,
				searchTimes: 0
			});
		}
	},

	"defaultList.updateSearchTimes"(word) {
		check(word, String);

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}

		let needUpdate = DefaultList.find({ word: word }).fetch().length;
		console.log("needUpdate: " + needUpdate);

		if (needUpdate !== 0) {
			console.log(DefaultList.find({ word: word }));

			DefaultList.update({ word: word }, { $inc: { searchTimes: 1 }}, {multi: true});
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
