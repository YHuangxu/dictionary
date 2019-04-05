import "../imports/startup/simpl-schema-config.js";
import "../imports/api/users.js";
import "../imports/api/lists.js";
import "../imports/api/wordsAPI.js";
import { DDPRateLimiter } from "meteor/ddp-rate-limiter";

// Define a rule that matches login attempts by non-admin users.
const apiCallRule = {
	type: "method",
	name: "apiCall"
};

// Add the rule, allowing up to 5 messages every 1000 milliseconds.
DDPRateLimiter.addRule(apiCallRule, 5, 1000);
