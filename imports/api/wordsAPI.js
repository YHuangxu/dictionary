import { Meteor } from "meteor/meteor";
import axios from "axios";
import { check } from "meteor/check";

// WordsAPI 
if (Meteor.isServer) {
	Meteor.methods({
		"getData"(param) {
			check(param, String);

			const wordsAPI = axios.create({
				baseURL: "https://wordsapiv1.p.rapidapi.com/words/",
				headers: {
					"X-RapidAPI-Key": Meteor.settings.apiKey
				}
			});

			return wordsAPI
				.get(param)
				.then(res => {
					return res.data;
				});
		}
	});
}
