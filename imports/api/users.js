import SimpleSchema from "simpl-schema";
import { Accounts } from "meteor/accounts-base";

Accounts.validateNewUser(user => {
	const username = user.username;
	const email = user.emails[0].address;

	const userSchema = new SimpleSchema({
		username: {
			type: String,
			min: 2,
			max: 30
		},

		email: {
			type: String,
			regEx: SimpleSchema.RegEx.Email
		}
	});

	userSchema.validate({
		username: username,
		email: email
	});

	return true;
});
