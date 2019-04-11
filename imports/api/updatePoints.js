import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
	Meteor.publish("users", function() {
		return Meteor.users.find();
	});
}

Meteor.methods({
	updateUserPoints(id) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Meteor.users.update( id, { $inc: { "profile.points":  10} } );
	}
});