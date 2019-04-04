import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const DefaultList = new Mongo.Collection("defaultList");

if (Meteor.isServer) {
	Meteor.publish("defaultList", function() {
		return DefaultList.find({userId: this.userId});
	});
}

Meteor.methods({
	"defaultList.insert"(content) {
		check(content, Object);

		if (!this.userId) {
			throw new Meteor.Error("not-authorized");
		}
		
		DefaultList.insert({
			userId: this.userId,
			content: content
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

