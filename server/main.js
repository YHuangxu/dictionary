import "../imports/startup/simpl-schema-config.js";
import "../imports/api/users.js";
import "../imports/api/lists.js";
import "../imports/api/wordsAPI.js";
import "../imports/api/games.js";
import "../imports/api/reviewLogic.js";

import { Meteor } from "meteor/meteor";
import { DDPRateLimiter } from "meteor/ddp-rate-limiter";
import { WebApp } from "meteor/webapp";

WebApp.addHtmlAttributeHook(() => ({ lang: "en" }));

// Get list of all method names on Lists
const LISTS_METHODS = [
	"defaultList.insert",
	"defaultList.remove",
	"getData"
];

// Only allow 5 list operations per connection per second
if (Meteor.isServer) {
	DDPRateLimiter.addRule({
		name(name) {
			return LISTS_METHODS.includes(name);
		},

		// Rate limit per connection ID
		connectionId() { return true; }
	}, 5, 1000);
}
