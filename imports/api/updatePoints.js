import { Meteor } from "meteor/meteor";

export const Users = Meteor.users;

if (Meteor.isServer) {
	Meteor.publish("userPoints", function() {
		return Users.find(
			{},
			{
				fields: {
					username: 1,
					"profile.points": 1
				}
			}
		);
	});
}

Meteor.methods({
	"user.pointsUpdate"(id, points) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Meteor.users.update(id, { $inc: { "profile.points": points } });
	}
});

