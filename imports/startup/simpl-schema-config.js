import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

// simple schema custimized error
SimpleSchema.defineValidationErrorTransform(err => {
	return new Meteor.Error(400, err.message);
});

